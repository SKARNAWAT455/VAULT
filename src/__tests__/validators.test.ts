import { z } from "zod";
import { BidSchema, RegisterSchema, ContactSchema, AuctionCreateSchema } from "@/lib/validators";

// ─── BidSchema ────────────────────────────────────────────────────────────────

describe("BidSchema", () => {
    test("accepts valid bid amount", () => {
        const result = BidSchema.safeParse({ amount: 1500 });
        expect(result.success).toBe(true);
    });

    test("rejects zero bid", () => {
        const result = BidSchema.safeParse({ amount: 0 });
        expect(result.success).toBe(false);
    });

    test("rejects negative bid", () => {
        const result = BidSchema.safeParse({ amount: -100 });
        expect(result.success).toBe(false);
    });

    test("rejects string as amount", () => {
        const result = BidSchema.safeParse({ amount: "high" });
        expect(result.success).toBe(false);
    });

    test("rejects missing amount", () => {
        const result = BidSchema.safeParse({});
        expect(result.success).toBe(false);
    });
});

// ─── RegisterSchema ───────────────────────────────────────────────────────────

describe("RegisterSchema", () => {
    const valid = { name: "John Doe", email: "john@example.com", password: "Secret123" };

    test("accepts valid registration", () => {
        expect(RegisterSchema.safeParse(valid).success).toBe(true);
    });

    test("rejects invalid email", () => {
        expect(RegisterSchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
    });

    test("rejects short name", () => {
        expect(RegisterSchema.safeParse({ ...valid, name: "J" }).success).toBe(false);
    });

    test("rejects password without uppercase", () => {
        expect(RegisterSchema.safeParse({ ...valid, password: "secret123" }).success).toBe(false);
    });

    test("rejects password without number", () => {
        expect(RegisterSchema.safeParse({ ...valid, password: "SecretPass" }).success).toBe(false);
    });

    test("rejects short password", () => {
        expect(RegisterSchema.safeParse({ ...valid, password: "S1x" }).success).toBe(false);
    });
});

// ─── ContactSchema ────────────────────────────────────────────────────────────

describe("ContactSchema", () => {
    const valid = {
        name: "Jane",
        email: "jane@example.com",
        subject: "Enquiry",
        message: "I am interested in your collection.",
    };

    test("accepts valid contact form", () => {
        expect(ContactSchema.safeParse(valid).success).toBe(true);
    });

    test("rejects short message", () => {
        expect(ContactSchema.safeParse({ ...valid, message: "Hi" }).success).toBe(false);
    });

    test("rejects missing subject", () => {
        expect(ContactSchema.safeParse({ ...valid, subject: "" }).success).toBe(false);
    });
});

// ─── AuctionCreateSchema ──────────────────────────────────────────────────────

describe("AuctionCreateSchema", () => {
    const valid = {
        title: "Victorian Chair",
        description: "A beautifully restored Victorian-era armchair in excellent condition.",
        startingPrice: 500,
        endTime: new Date(Date.now() + 86400000).toISOString(),
    };

    test("accepts a valid auction", () => {
        expect(AuctionCreateSchema.safeParse(valid).success).toBe(true);
    });

    test("rejects negative starting price", () => {
        expect(AuctionCreateSchema.safeParse({ ...valid, startingPrice: -1 }).success).toBe(false);
    });

    test("rejects short title", () => {
        expect(AuctionCreateSchema.safeParse({ ...valid, title: "Ax" }).success).toBe(false);
    });

    test("rejects invalid date", () => {
        expect(AuctionCreateSchema.safeParse({ ...valid, endTime: "not-a-date" }).success).toBe(false);
    });
});
