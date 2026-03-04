"use client";

import { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (!res.ok) {
                setErrorMsg(data.error || "Something went wrong.");
                setStatus("error");
            } else {
                setStatus("sent");
            }
        } catch {
            setErrorMsg("Network error. Please try again.");
            setStatus("error");
        }
    };

    return (
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa" }}>
            <div className="card shadow-lg border-0 p-5" style={{ maxWidth: 440, width: "100%", borderRadius: 16 }}>
                <div className="text-center mb-4">
                    <div style={{ fontSize: "2.5rem" }}>🔑</div>
                    <h1 className="h4 fw-bold mt-2">Forgot Password</h1>
                    <p className="text-muted small">Enter your email and we&apos;ll send you a reset link</p>
                </div>

                {status === "sent" ? (
                    <div className="text-center">
                        <div style={{ fontSize: "3rem" }}>📬</div>
                        <h2 className="h5 fw-bold mt-2 mb-2">Check your email</h2>
                        <p className="text-muted small mb-1">
                            If an account exists for <strong>{email}</strong>, a reset link has been sent.
                        </p>
                        <p className="text-muted small">
                            <em>(In local mode, check your console for the Ethereal preview link.)</em>
                        </p>
                        <Link href="/login" className="btn btn-primary mt-3 w-100">Back to Login</Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label fw-semibold">Email Address</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder="you@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoFocus
                            />
                        </div>

                        {status === "error" && (
                            <div className="alert alert-danger py-2 small">{errorMsg}</div>
                        )}

                        <button
                            type="submit"
                            className="btn btn-primary w-100 fw-bold"
                            disabled={status === "loading"}
                        >
                            {status === "loading" ? (
                                <><span className="spinner-border spinner-border-sm me-2" />Sending...</>
                            ) : "Send Reset Link"}
                        </button>

                        <div className="text-center mt-3">
                            <Link href="/login" className="text-muted small">← Back to Login</Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
