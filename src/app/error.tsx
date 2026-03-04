"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("Unhandled error:", error);
    }, [error]);

    return (
        <div
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
                fontFamily: "'Roboto', sans-serif",
                padding: "2rem",
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    color: "#fff",
                    maxWidth: 500,
                    background: "rgba(255,255,255,0.05)",
                    borderRadius: "1rem",
                    padding: "3rem 2.5rem",
                    border: "1px solid rgba(255,255,255,0.1)",
                    backdropFilter: "blur(12px)",
                }}
            >
                <div style={{ fontSize: "4rem", marginBottom: "1rem" }}>⚠️</div>
                <h1 style={{ fontSize: "2rem", fontWeight: 700, marginBottom: "0.5rem", color: "#e2b96f" }}>
                    Something went wrong
                </h1>
                <p style={{ color: "rgba(255,255,255,0.65)", marginBottom: "2rem", lineHeight: 1.6 }}>
                    An unexpected error occurred. Our team has been notified.
                    {error?.digest && (
                        <span style={{ display: "block", marginTop: "0.5rem", fontSize: "0.8rem", opacity: 0.5 }}>
                            Error ID: {error.digest}
                        </span>
                    )}
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <button
                        onClick={reset}
                        style={{
                            background: "#e2b96f",
                            color: "#1a1a2e",
                            border: "none",
                            padding: "0.75rem 1.75rem",
                            borderRadius: "0.5rem",
                            fontWeight: 700,
                            cursor: "pointer",
                            fontSize: "1rem",
                        }}
                    >
                        Try Again
                    </button>
                    <Link
                        href="/"
                        style={{
                            background: "transparent",
                            color: "#fff",
                            border: "1px solid rgba(255,255,255,0.3)",
                            padding: "0.75rem 1.75rem",
                            borderRadius: "0.5rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            fontSize: "1rem",
                        }}
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
