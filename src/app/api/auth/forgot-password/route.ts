import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rateLimit";
import { ForgotPasswordSchema, formatZodErrors } from "@/lib/validators";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const ip = req.headers.get("x-forwarded-for") ?? "127.0.0.1";
        const { success } = rateLimit(`forgot-password:${ip}`, { limit: 3, windowMs: 15 * 60 * 1000 });
        if (!success) {
            return NextResponse.json({ error: "Too many requests." }, { status: 429 });
        }

        const body = await req.json();
        const parsed = ForgotPasswordSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: formatZodErrors(parsed.error) }, { status: 400 });
        }
        const { email } = parsed.data;

        // Always return success to prevent email enumeration
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return NextResponse.json({ success: true });
        }

        // Invalidate any existing tokens for this user
        await prisma.passwordResetToken.updateMany({
            where: { userId: user.id, used: false },
            data: { used: true },
        });

        const token = crypto.randomBytes(32).toString("hex");
        const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

        await prisma.passwordResetToken.create({
            data: { token, userId: user.id, expires },
        });

        const resetUrl = `${process.env.NEXTAUTH_URL}/reset-password?token=${token}`;

        try {
            const { sendEmail } = await import("@/lib/email");
            await sendEmail({
                to: email,
                subject: "Reset your VAULT password",
                html: `<h2>Password Reset Request</h2>
                       <p>Click the link below to reset your password. This link expires in <strong>1 hour</strong>.</p>
                       <a class="cta" href="${resetUrl}">Reset Password</a>
                       <p style="color:#999;font-size:12px;margin-top:20px;">If you didn't request this, please ignore this email. Your password will not change.</p>`,
            });
        } catch (_) {
            console.error("Failed to send password reset email");
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
