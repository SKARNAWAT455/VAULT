import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function POST(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession();

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { amount } = await req.json();

        if (!amount || isNaN(amount)) {
            return NextResponse.json({ error: "Invalid bid amount" }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: session.user.email },
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // Use a transaction to ensure atomic update and prevent race conditions
        const result = await prisma.$transaction(async (tx) => {
            const auction = await tx.auction.findUnique({
                where: { id: params.id },
            });

            if (!auction) {
                throw new Error("Auction not found");
            }

            if (auction.status !== "ACTIVE") {
                throw new Error("Auction is no longer active");
            }

            if (new Date() > auction.endTime) {
                // Auto-close if time expired but status still ACTIVE
                await tx.auction.update({
                    where: { id: params.id },
                    data: { status: "CLOSED" }
                });
                throw new Error("Auction has ended");
            }

            if (amount <= auction.currentPrice) {
                throw new Error("Bid must be higher than the current price");
            }

            // Create the bid and update the auction price
            const newBid = await tx.bid.create({
                data: {
                    amount,
                    userId: user.id,
                    auctionId: params.id,
                },
            });

            const updatedAuction = await tx.auction.update({
                where: { id: params.id },
                data: {
                    currentPrice: amount,
                },
            });

            return { newBid, updatedAuction };
        });

        return NextResponse.json({
            message: "Bid placed successfully",
            newPrice: result.updatedAuction.currentPrice
        }, { status: 201 });

    } catch (error: any) {
        console.error("Bidding error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
