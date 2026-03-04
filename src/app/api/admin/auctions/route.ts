import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { AuctionCreateSchema, formatZodErrors } from "@/lib/validators";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const parsed = AuctionCreateSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: formatZodErrors(parsed.error) }, { status: 400 });
        }
        const { title, description, startingPrice, endTime, imageUrl } = parsed.data;

        const auction = await prisma.auction.create({
            data: {
                title,
                description,
                startingPrice,
                currentPrice: startingPrice,
                endTime: new Date(endTime),
                imageUrl,
                status: "ACTIVE",
            },
        });

        return NextResponse.json(auction, { status: 201 });
    } catch (error: any) {
        console.error("Auction creation error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
