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

        const auction = await prisma.auction.findUnique({ where: { id: params.id } });
        if (!auction) {
            return NextResponse.json({ error: "Auction not found" }, { status: 404 });
        }

        if (auction.status === "DELETED") {
            return NextResponse.json({ error: "Cannot toggle status of a deleted auction" }, { status: 400 });
        }

        const newStatus = auction.status === "ACTIVE" ? "CLOSED" : "ACTIVE";

        const updated = await prisma.auction.update({
            where: { id: params.id },
            data: { status: newStatus },
        });

        return NextResponse.json({ message: `Auction ${newStatus.toLowerCase()} successfully`, auction: updated });
    } catch (error: any) {
        console.error("Toggle status error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
