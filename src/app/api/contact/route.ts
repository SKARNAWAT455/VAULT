import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    try {
        const { name, email, subject, message } = await req.json();

        if (!name || !email || !subject || !message) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        const contact = await prisma.contactMessage.create({
            data: { name, email, subject, message },
        });

        return NextResponse.json({ success: true, id: contact.id }, { status: 201 });
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json({ error: "Failed to save message." }, { status: 500 });
    }
}
