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
        // FIX: Pass authOptions so session is correctly parsed
        const session = await getServerSession(authOptions);

        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Soft-delete: mark as DELETED so it appears in history, not erased from DB
        const auction = await prisma.auction.update({
            where: { id: params.id },
            data: { status: "DELETED" },
        });

        return NextResponse.json({ message: "Auction archived successfully", auction });
    } catch (error: any) {
        console.error("Auction deletion error:", error);
        return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
    }
}
