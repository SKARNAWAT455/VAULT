export default function AuctionLoading() {
    return (
        <div className="container py-5">
            <div className="row g-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="col-md-4">
                        <div className="card border-0 shadow-sm rounded-3 overflow-hidden" aria-hidden>
                            <div
                                style={{
                                    height: 220,
                                    background: "linear-gradient(90deg, #e8e8e8 25%, #f5f5f5 50%, #e8e8e8 75%)",
                                    backgroundSize: "200% 100%",
                                    animation: "shimmer 1.4s infinite",
                                }}
                            />
                            <div className="card-body p-3">
                                <div style={{ height: 18, background: "#e8e8e8", borderRadius: 4, marginBottom: 10, width: "80%" }} />
                                <div style={{ height: 14, background: "#e8e8e8", borderRadius: 4, marginBottom: 8, width: "60%" }} />
                                <div style={{ height: 14, background: "#e8e8e8", borderRadius: 4, width: "40%" }} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <style>{`
                @keyframes shimmer {
                    0%   { background-position: 200% 0; }
                    100% { background-position: -200% 0; }
                }
            `}</style>
        </div>
    );
}
