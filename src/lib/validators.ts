import { z } from "zod";

// ─── Auth ───────────────────────────────────────────────────────────────────

export const RegisterSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(60),
    email: z.string().email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(72, "Password too long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[0-9]/, "Password must contain at least one number"),
});

export const LoginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(1, "Password is required"),
});

export const ChangePasswordSchema = z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
        .string()
        .min(8, "New password must be at least 8 characters")
        .max(72)
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[0-9]/, "Must contain a number"),
});

export const ForgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
});

export const ResetPasswordSchema = z.object({
    token: z.string().min(1),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(72)
        .regex(/[A-Z]/, "Must contain an uppercase letter")
        .regex(/[0-9]/, "Must contain a number"),
});

// ─── Auction ─────────────────────────────────────────────────────────────────

export const AuctionCreateSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(120),
    description: z.string().min(10, "Description is too short").max(2000),
    startingPrice: z.number().positive("Starting price must be positive"),
    endTime: z.string().refine((v) => !isNaN(Date.parse(v)), "Invalid date"),
    imageUrl: z.string().optional().nullable(),
});

export const AuctionUpdateSchema = AuctionCreateSchema.partial().extend({
    status: z.enum(["ACTIVE", "CLOSED"]).optional(),
});

export const BidSchema = z.object({
    amount: z
        .number({ invalid_type_error: "Bid amount must be a number" })
        .positive("Bid must be positive")
        .max(100_000_000, "Bid amount too large"),
});

// ─── Contact ─────────────────────────────────────────────────────────────────

export const ContactSchema = z.object({
    name: z.string().min(2, "Name is required").max(80),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(3, "Subject is required").max(160),
    message: z.string().min(10, "Message is too short").max(3000),
});

// ─── Helper ──────────────────────────────────────────────────────────────────

/** Returns a formatted string of all Zod validation errors. */
export function formatZodErrors(error: z.ZodError): string {
    return error.errors.map((e) => e.message).join(", ");
}
