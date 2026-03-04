import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";

function escapeCSV(value: string | number | null | undefined): string {
    if (value === null || value === undefined) return "";
    const str = String(value);
    if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
}

function toCSV(headers: string[], rows: (string | number | null)[][]): string {
    const headerLine = headers.map(escapeCSV).join(",");
    const dataLines = rows.map((row) => row.map(escapeCSV).join(","));
    return [headerLine, ...dataLines].join("\n");
}

export async function GET(req: NextRequest) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || (session.user as any).role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const type = req.nextUrl.searchParams.get("type") || "bids";
        let csv = "";
        let filename = "";

        if (type === "bids") {
            const bids = await prisma.bid.findMany({
                include: {
                    user: { select: { name: true, email: true } },
                    auction: { select: { title: true } },
                },
                orderBy: { createdAt: "desc" },
            });

            const headers = ["Bid ID", "Auction Title", "Bidder Name", "Bidder Email", "Amount ($)", "Date"];
            const rows = bids.map((b) => [
                b.id,
                b.auction.title,
                b.user.name ?? "",
                b.user.email ?? "",
                b.amount,
                new Date(b.createdAt).toLocaleString(),
            ]);
            csv = toCSV(headers, rows);
            filename = `vault-bids-${Date.now()}.csv`;

        } else if (type === "contacts") {
            const contacts = await prisma.contactMessage.findMany({
                orderBy: { createdAt: "desc" },
            });

            const headers = ["ID", "Name", "Email", "Subject", "Message", "Read", "Date"];
            const rows = contacts.map((c) => [
                c.id,
                c.name,
                c.email,
                c.subject,
                c.message,
                c.isRead ? "Yes" : "No",
                new Date(c.createdAt).toLocaleString(),
            ]);
            csv = toCSV(headers, rows);
            filename = `vault-contacts-${Date.now()}.csv`;

        } else {
            return NextResponse.json({ error: "Invalid export type. Use ?type=bids or ?type=contacts" }, { status: 400 });
        }

        return new NextResponse(csv, {
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": `attachment; filename="${filename}"`,
            },
        });

    } catch (error: any) {
        console.error("Export error:", error);
        return NextResponse.json({ error: error.message || "Export failed" }, { status: 500 });
    }
}
