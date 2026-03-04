import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";
import { ContactSchema, formatZodErrors } from "@/lib/validators";

export async function POST(req: NextRequest) {
    try {
        // Rate limit: 3 submissions per 10 minutes per IP
        const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
        const { success } = rateLimit(`contact:${ip}`, { limit: 3, windowMs: 10 * 60 * 1000 });
        if (!success) {
            return NextResponse.json({ error: "Too many submissions. Please wait before trying again." }, { status: 429 });
        }

        const body = await req.json();
        const parsed = ContactSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: formatZodErrors(parsed.error) }, { status: 400 });
        }
        const { name, email, subject, message } = parsed.data;

        const contact = await prisma.contactMessage.create({
            data: { name, email, subject, message },
        });

        // Send confirmation email to user + alert to admin (non-blocking)
        try {
            const { sendEmail } = await import("@/lib/email");
            const adminEmail = process.env.ADMIN_EMAIL || "admin@vault.local";

            await Promise.all([
                // Receipt to user
                sendEmail({
                    to: email,
                    subject: `We received your message — VAULT Auctions`,
                    html: `<h2>Thanks for reaching out, ${name}!</h2>
                           <p>We've received your message regarding "<strong>${subject}</strong>" and will get back to you shortly.</p>
                           <hr/>
                           <p><em>${message}</em></p>`,
                }),
                // Admin notification
                sendEmail({
                    to: adminEmail,
                    subject: `New Contact Message: ${subject}`,
                    html: `<h2>New Contact Form Submission</h2>
                           <p><strong>From:</strong> ${name} (${email})</p>
                           <p><strong>Subject:</strong> ${subject}</p>
                           <p><strong>Message:</strong></p>
                           <p>${message}</p>`,
                }),
            ]);
        } catch (_) { /* Email failure should not block save */ }

        return NextResponse.json({ success: true, id: contact.id }, { status: 201 });
    } catch (error) {
        console.error("Contact API error:", error);
        return NextResponse.json({ error: "Failed to save message." }, { status: 500 });
    }
}
