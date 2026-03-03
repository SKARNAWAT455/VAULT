"use client";

import { useState } from "react";

export default function ChangePasswordForm() {
    const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");

        if (form.newPassword !== form.confirmPassword) {
            setStatus("error");
            setMessage("New passwords do not match.");
            return;
        }

        setStatus("loading");

        try {
            const res = await fetch("/api/profile/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    currentPassword: form.currentPassword,
                    newPassword: form.newPassword,
                }),
            });

            const data = await res.json();

            if (res.ok) {
                setStatus("success");
                setMessage("Password changed successfully!");
                setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {
                setStatus("error");
                setMessage(data.error || "Something went wrong.");
            }
        } catch {
            setStatus("error");
            setMessage("Network error. Please try again.");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {status === "success" && (
                <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                    <i className="fa fa-check-circle me-2"></i>
                    <span>{message}</span>
                </div>
            )}
            {status === "error" && (
                <div className="alert alert-danger d-flex align-items-center mb-4" role="alert">
                    <i className="fa fa-exclamation-circle me-2"></i>
                    <span>{message}</span>
                </div>
            )}

            <div className="mb-4">
                <label htmlFor="currentPassword" className="form-label fw-bold">Current Password</label>
                <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                        <i className="fa fa-lock text-muted"></i>
                    </span>
                    <input
                        type="password"
                        className="form-control border-start-0"
                        id="currentPassword"
                        placeholder="Enter current password"
                        value={form.currentPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <div className="mb-4">
                <label htmlFor="newPassword" className="form-label fw-bold">New Password</label>
                <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                        <i className="fa fa-key text-muted"></i>
                    </span>
                    <input
                        type="password"
                        className="form-control border-start-0"
                        id="newPassword"
                        placeholder="Enter new password (min. 6 characters)"
                        value={form.newPassword}
                        onChange={handleChange}
                        required
                        minLength={6}
                    />
                </div>
            </div>

            <div className="mb-5">
                <label htmlFor="confirmPassword" className="form-label fw-bold">Confirm New Password</label>
                <div className="input-group">
                    <span className="input-group-text bg-light border-end-0">
                        <i className="fa fa-check-double text-muted"></i>
                    </span>
                    <input
                        type="password"
                        className="form-control border-start-0"
                        id="confirmPassword"
                        placeholder="Confirm your new password"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
            </div>

            <button
                type="submit"
                className="btn btn-primary px-5 py-3 w-100"
                disabled={status === "loading"}
            >
                {status === "loading" ? (
                    <>
                        <span className="spinner-border spinner-border-sm me-2"></span>
                        Updating Password...
                    </>
                ) : (
                    <>
                        <i className="fa fa-shield-alt me-2"></i>
                        Update Password
                    </>
                )}
            </button>
        </form>
    );
}
