"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // Live password strength checks
    const checks = {
        length: password.length >= 8,
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
    };
    const allValid = checks.length && checks.uppercase && checks.number;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!allValid) {
            setError("Please meet all password requirements below.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password }),
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Something went wrong");
            } else {
                router.push("/login?registered=true");
            }
        } catch {
            setError("Failed to register. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
            <div className="container quote px-lg-0">
                <div className="row g-0 mx-lg-0">
                    <div className="col-lg-6 ps-lg-0" style={{ minHeight: "400px" }}>
                        <div className="position-relative h-100">
                            <img
                                className="position-absolute img-fluid w-100 h-100"
                                src="/img/timmer.jpg"
                                style={{ objectFit: "cover" }}
                                alt="VAULT Register"
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 quote-text py-5 wow fadeIn" data-wow-delay="0.5s">
                        <div className="p-lg-5 pe-lg-0">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">VAULT REGISTER</h1>
                            </div>
                            <p className="mb-4 pb-2">
                                Create an account to start bidding on exclusive luxury items.
                            </p>

                            {error && <div className="alert alert-danger py-2">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="form-control border-0"
                                            placeholder="Your Name (min. 2 characters)"
                                            style={{ height: "55px" }}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <input
                                            type="email"
                                            className="form-control border-0"
                                            placeholder="Your Email"
                                            style={{ height: "55px" }}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <input
                                            type="password"
                                            className={`form-control border-0 ${password && (allValid ? "is-valid" : "is-invalid")}`}
                                            placeholder="Your Password"
                                            style={{ height: "55px" }}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                        {/* Password strength hints — always visible once user starts typing */}
                                        {password.length > 0 && (
                                            <div className="mt-2 ps-1">
                                                <small className={`d-block ${checks.length ? "text-success" : "text-danger"}`}>
                                                    {checks.length ? "✓" : "✗"} At least 8 characters
                                                </small>
                                                <small className={`d-block ${checks.uppercase ? "text-success" : "text-danger"}`}>
                                                    {checks.uppercase ? "✓" : "✗"} At least 1 uppercase letter (A-Z)
                                                </small>
                                                <small className={`d-block ${checks.number ? "text-success" : "text-danger"}`}>
                                                    {checks.number ? "✓" : "✗"} At least 1 number (0-9)
                                                </small>
                                            </div>
                                        )}
                                    </div>
                                    <div className="col-12">
                                        <button
                                            className="btn btn-primary w-100 py-3"
                                            type="submit"
                                            disabled={loading || (password.length > 0 && !allValid)}
                                        >
                                            {loading ? (
                                                <><span className="spinner-border spinner-border-sm me-2" />Registering...</>
                                            ) : "Sign Up"}
                                        </button>
                                    </div>
                                    <div className="col-12 text-center mt-3">
                                        <p>Already have an account? <Link href="/login" className="text-primary">Login here</Link></p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
