import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { ResetPasswordSchema, formatZodErrors } from "@/lib/validators";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = ResetPasswordSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json({ error: formatZodErrors(parsed.error) }, { status: 400 });
        }
        const { token, password } = parsed.data;

        const resetToken = await prisma.passwordResetToken.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!resetToken || resetToken.used || resetToken.expires < new Date()) {
            return NextResponse.json({ error: "Invalid or expired reset link. Please request a new one." }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await prisma.$transaction([
            prisma.user.update({
                where: { id: resetToken.userId },
                data: { password: hashedPassword, loginAttempts: 0, lockedUntil: null },
            }),
            prisma.passwordResetToken.update({
                where: { id: resetToken.id },
                data: { used: true },
            }),
        ]);

        return NextResponse.json({ success: true, message: "Password reset successfully. You can now log in." });
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
