import Link from "next/link";

export default function NotFound() {
    return (
        <div
            style={{
                minHeight: "80vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
                fontFamily: "'Roboto', sans-serif",
                padding: "2rem",
            }}
        >
            <div
                style={{
                    textAlign: "center",
                    color: "#fff",
                    maxWidth: 520,
                }}
            >
                <div
                    style={{
                        fontSize: "8rem",
                        fontWeight: 900,
                        lineHeight: 1,
                        background: "linear-gradient(135deg, #e2b96f, #c8973e)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        marginBottom: "0.5rem",
                    }}
                >
                    404
                </div>
                <h1 style={{ fontSize: "1.75rem", fontWeight: 700, marginBottom: "1rem" }}>
                    Page Not Found
                </h1>
                <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "2.5rem", lineHeight: 1.7 }}>
                    The page you&apos;re looking for doesn&apos;t exist or may have been moved.
                    Let&apos;s get you back to the auction floor.
                </p>
                <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
                    <Link
                        href="/"
                        style={{
                            background: "linear-gradient(135deg, #e2b96f, #c8973e)",
                            color: "#1a1a2e",
                            border: "none",
                            padding: "0.75rem 1.75rem",
                            borderRadius: "0.5rem",
                            fontWeight: 700,
                            textDecoration: "none",
                            fontSize: "1rem",
                        }}
                    >
                        🏠 Home
                    </Link>
                    <Link
                        href="/auction"
                        style={{
                            background: "transparent",
                            color: "#e2b96f",
                            border: "1px solid #e2b96f",
                            padding: "0.75rem 1.75rem",
                            borderRadius: "0.5rem",
                            fontWeight: 600,
                            textDecoration: "none",
                            fontSize: "1rem",
                        }}
                    >
                        🏺 Browse Auctions
                    </Link>
                </div>
            </div>
        </div>
    );
}
