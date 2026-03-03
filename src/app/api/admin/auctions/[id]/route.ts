import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, description, startingPrice, endTime, imageUrl, status } = await req.json();

        const auction = await prisma.auction.update({
            where: { id: params.id },
            data: {
                title,
                description,
                startingPrice,
                endTime: endTime ? new Date(endTime) : undefined,
                imageUrl,
                status,
            },
        });

        return NextResponse.json(auction);
    } catch (error: any) {
        console.error("Auction update error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const session = await getServerSession();

        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Delete associated bids first (or ensure cascade delete in prisma)
        // For safety, we delete them here if not handled by DB
        await prisma.bid.deleteMany({
            where: { auctionId: params.id }
        });

        await prisma.auction.delete({
            where: { id: params.id },
        });

        return NextResponse.json({ message: "Auction deleted successfully" });
    } catch (error: any) {
        console.error("Auction deletion error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
