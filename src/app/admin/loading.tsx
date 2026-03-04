export default function AdminLoading() {
    return (
        <div className="container-fluid py-4 px-4">
            {/* Header skeleton */}
            <div style={{ height: 36, background: "#e8e8e8", borderRadius: 6, width: 260, marginBottom: 24 }} />

            {/* Stats cards skeleton */}
            <div className="row g-4 mb-4">
                {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="col-md-3">
                        <div className="card border-0 shadow-sm p-3" style={{ borderRadius: 12, minHeight: 100 }}>
                            <div style={{ height: 14, background: "#e8e8e8", borderRadius: 4, width: "60%", marginBottom: 12 }} />
                            <div style={{ height: 32, background: "#e8e8e8", borderRadius: 4, width: "40%" }} />
                        </div>
                    </div>
                ))}
            </div>

            {/* Table skeleton */}
            <div className="card border-0 shadow-sm p-4" style={{ borderRadius: 12 }}>
                <div style={{ height: 20, background: "#e8e8e8", borderRadius: 4, width: 180, marginBottom: 20 }} />
                {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="d-flex gap-3 mb-3 align-items-center">
                        <div style={{ flex: 3, height: 16, background: "#e8e8e8", borderRadius: 4 }} />
                        <div style={{ flex: 1, height: 16, background: "#e8e8e8", borderRadius: 4 }} />
                        <div style={{ flex: 1, height: 16, background: "#e8e8e8", borderRadius: 4 }} />
                        <div style={{ flex: 1, height: 16, background: "#e8e8e8", borderRadius: 4 }} />
                    </div>
                ))}
            </div>

            <style>{`
                .card { animation: pulse 1.5s ease-in-out infinite; }
                @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.6; } }
            `}</style>
        </div>
    );
}
