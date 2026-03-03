"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface BidFormProps {
    auctionId: string;
    currentPrice: number;
}

export default function BidForm({ auctionId, currentPrice }: BidFormProps) {
    const { data: session, status } = useSession();
    const [amount, setAmount] = useState(currentPrice + 1);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleBid = async (e: React.FormEvent) => {
        e.preventDefault();

        if (status === "loading") return;

        if (status === "unauthenticated") {
            setError("You must be logged in to bid.");
            router.push("/login?redirect=" + encodeURIComponent(window.location.pathname));
            return;
        }

        if (amount <= currentPrice) {
            setError("Bid must be higher than the current price.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const res = await fetch(`/api/auction/${auctionId}/bid`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to place bid.");
            } else {
                setAmount(data.newPrice + 1);
                router.refresh();
            }
        } catch (err) {
            setError("An error occurred.");
        } finally {
            setLoading(false);
        }
    };

    if (status === "unauthenticated") {
        return (
            <div className="bg-white p-4 rounded shadow-sm border text-center">
                <h4 className="mb-3">Join the Auction</h4>
                <p className="text-muted mb-4">You need to be logged in to place a bid on this luxury item.</p>
                <Link
                    href={`/login?redirect=${encodeURIComponent(typeof window !== 'undefined' ? window.location.pathname : '')}`}
                    className="btn btn-primary w-100 py-3"
                >
                    Login to Bid
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded shadow-sm border">
            <h4 className="mb-3">Place a Bid</h4>
            {error && <div className="alert alert-danger py-2">{error}</div>}
            <form onSubmit={handleBid}>
                <div className="input-group mb-3">
                    <span className="input-group-text">$</span>
                    <input
                        type="number"
                        className="form-control"
                        value={amount}
                        onChange={(e) => setAmount(Number(e.target.value))}
                        min={currentPrice + 1}
                        required
                        disabled={loading || status === "loading"}
                    />
                </div>
                <button
                    className="btn btn-primary w-100 py-3"
                    type="submit"
                    disabled={loading || status === "loading"}
                >
                    {status === "loading" ? "Checking Auth..." : loading ? "Placing Bid..." : "Place Bid"}
                </button>
            </form>
        </div>
    );
}

import Link from "next/link";
