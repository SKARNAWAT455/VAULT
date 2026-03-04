"use client";

import { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get("token") || "";
    const router = useRouter();

    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [errorMsg, setErrorMsg] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirm) {
            setErrorMsg("Passwords do not match.");
            setStatus("error");
            return;
        }

        setStatus("loading");
        setErrorMsg("");

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setErrorMsg(data.error || "Reset failed.");
                setStatus("error");
            } else {
                setStatus("success");
                setTimeout(() => router.push("/login"), 2500);
            }
        } catch {
            setErrorMsg("Network error. Please try again.");
            setStatus("error");
        }
    };

    if (!token) {
        return (
            <div className="card shadow-lg border-0 p-5" style={{ maxWidth: 440, width: "100%", borderRadius: 16 }}>
                <div className="text-center">
                    <div style={{ fontSize: "2.5rem" }}>❌</div>
                    <h2 className="h5 fw-bold mt-2">Invalid Link</h2>
                    <p className="text-muted small">This reset link is invalid or missing a token.</p>
                    <Link href="/forgot-password" className="btn btn-primary mt-3">Request New Link</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="card shadow-lg border-0 p-5" style={{ maxWidth: 440, width: "100%", borderRadius: 16 }}>
            <div className="text-center mb-4">
                <div style={{ fontSize: "2.5rem" }}>🔒</div>
                <h1 className="h4 fw-bold mt-2">Set New Password</h1>
                <p className="text-muted small">Choose a strong password for your account</p>
            </div>

            {status === "success" ? (
                <div className="text-center">
                    <div style={{ fontSize: "3rem" }}>✅</div>
                    <h2 className="h5 fw-bold mt-2">Password Reset!</h2>
                    <p className="text-muted small">Redirecting you to login...</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">New Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Min. 8 chars, 1 uppercase, 1 number"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label fw-semibold">Confirm Password</label>
                        <input
                            type="password"
                            className="form-control"
                            placeholder="Repeat your password"
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            required
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
                            <><span className="spinner-border spinner-border-sm me-2" />Resetting...</>
                        ) : "Reset Password"}
                    </button>
                </form>
            )}
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa" }}>
            <Suspense fallback={<div className="spinner-border text-primary" />}>
                <ResetPasswordForm />
            </Suspense>
        </div>
    );
}
