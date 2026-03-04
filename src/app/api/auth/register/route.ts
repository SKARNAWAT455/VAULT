import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";
import { RegisterSchema, formatZodErrors } from "@/lib/validators";

export async function POST(req: Request) {
    try {
        // Rate limit: 5 registration attempts per 15 minutes per IP
        const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
        const { success } = rateLimit(`register:${ip}`, { limit: 5, windowMs: 15 * 60 * 1000 });
        if (!success) {
            return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
        }

        const body = await req.json();

        // Zod validation
        const parsed = RegisterSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: formatZodErrors(parsed.error) }, { status: 400 });
        }
        const { name, email, password } = parsed.data;

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            return NextResponse.json({ error: "An account with this email already exists." }, { status: 400 });
        }

        // Use salt rounds 12 for production-grade security
        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await prisma.user.create({
            data: { name, email, password: hashedPassword },
        });

        // Send welcome email asynchronously (non-blocking)
        try {
            const { sendEmail } = await import("@/lib/email");
            await sendEmail({
                to: email,
                subject: "Welcome to VAULT Auctions! 🏺",
                html: `<h2>Welcome, ${name}!</h2>
                       <p>Your account has been created successfully. You can now browse and bid on exclusive antique auctions.</p>
                       <p><a href="${process.env.NEXTAUTH_URL}/auction">Start Bidding →</a></p>`,
            });
        } catch (_) { /* Email failure should not block registration */ }

        return NextResponse.json({
            user: { id: user.id, name: user.name, email: user.email }
        }, { status: 201 });

    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
