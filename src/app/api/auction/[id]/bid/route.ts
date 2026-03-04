import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { rateLimit } from "@/lib/rateLimit";
import { BidSchema, formatZodErrors } from "@/lib/validators";

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Rate limit: 10 bids per minute per IP
        const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
        const { success } = rateLimit(`bid:${ip}`, { limit: 10, windowMs: 60 * 1000 });
        if (!success) {
            return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
        }

        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const parsed = BidSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: formatZodErrors(parsed.error) }, { status: 400 });
        }
        const { amount } = parsed.data;

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const result = await prisma.$transaction(async (tx) => {
            const auction = await tx.auction.findUnique({
                where: { id: params.id },
                include: {
                    bids: {
                        orderBy: { amount: "desc" },
                        take: 1,
                        include: { user: { select: { email: true, name: true } } },
                    },
                },
            });

            if (!auction) throw new Error("Auction not found");
            if (auction.status !== "ACTIVE") throw new Error("Auction is no longer active");
            if (new Date() > auction.endTime) {
                await tx.auction.update({ where: { id: params.id }, data: { status: "CLOSED" } });
                throw new Error("Auction has ended");
            }
            if (amount <= auction.currentPrice) {
                throw new Error(`Bid must be higher than the current price of $${auction.currentPrice.toLocaleString()}`);
            }

            const previousTopBidder = auction.bids[0]?.user ?? null;

            const newBid = await tx.bid.create({
                data: { amount, userId: user.id, auctionId: params.id },
            });

            const updatedAuction = await tx.auction.update({
                where: { id: params.id },
                data: { currentPrice: amount },
            });

            return { newBid, updatedAuction, previousTopBidder, auctionTitle: auction.title };
        });

        // Notify previous top bidder (non-blocking)
        if (
            result.previousTopBidder &&
            result.previousTopBidder.email &&
            result.previousTopBidder.email !== session.user.email
        ) {
            try {
                const { sendEmail } = await import("@/lib/email");
                await sendEmail({
                    to: result.previousTopBidder.email,
                    subject: `You've been outbid on "${result.auctionTitle}"`,
                    html: `<h2>You've been outbid!</h2>
                           <p>Someone placed a higher bid of <strong>$${result.updatedAuction.currentPrice.toLocaleString()}</strong> on <strong>${result.auctionTitle}</strong>.</p>
                           <p><a href="${process.env.NEXTAUTH_URL}/auction/${params.id}">Bid Again →</a></p>`,
                });
            } catch (_) { /* Email failure should not fail the bid */ }
        }

        return NextResponse.json({
            message: "Bid placed successfully",
            newPrice: result.updatedAuction.currentPrice,
        }, { status: 201 });

    } catch (error: any) {
        console.error("Bidding error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
