"use client";

import { useEffect, useState } from "react";

interface LiveBidFeedProps {
    auctionId: string;
    initialPrice: number;
}

export default function LiveBidFeed({ auctionId, initialPrice }: LiveBidFeedProps) {
    const [currentPrice, setCurrentPrice] = useState(initialPrice);
    const [flash, setFlash] = useState(false);
    const [lastBidTime, setLastBidTime] = useState<string | null>(null);

    useEffect(() => {
        const eventSource = new EventSource(`/api/auction/${auctionId}/stream`);

        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.newPrice) {
                    setCurrentPrice(data.newPrice);
                    setLastBidTime(new Date().toLocaleTimeString());
                    // Flash animation on update
                    setFlash(true);
                    setTimeout(() => setFlash(false), 800);
                }
            } catch { /* ignore parse errors */ }
        };

        eventSource.onerror = () => {
            // SSE will auto-reconnect on error
        };

        return () => eventSource.close();
    }, [auctionId]);

    return (
        <div
            style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "4px",
            }}
        >
            <div
                style={{
                    fontSize: "1.75rem",
                    fontWeight: 800,
                    color: flash ? "#28a745" : "#e2b96f",
                    transition: "color 0.4s ease",
                    letterSpacing: "-0.5px",
                }}
            >
                ${currentPrice.toLocaleString()}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span
                    style={{
                        display: "inline-block",
                        width: 8,
                        height: 8,
                        borderRadius: "50%",
                        background: "#28a745",
                        boxShadow: "0 0 0 2px rgba(40,167,69,0.3)",
                        animation: "livePulse 1.5s infinite",
                    }}
                />
                <span style={{ fontSize: "0.75rem", color: "#6c757d" }}>
                    Live {lastBidTime && `· Updated ${lastBidTime}`}
                </span>
            </div>
            <style>{`
                @keyframes livePulse {
                    0%, 100% { box-shadow: 0 0 0 2px rgba(40,167,69,0.3); }
                    50%       { box-shadow: 0 0 0 6px rgba(40,167,69,0.0); }
                }
            `}</style>
        </div>
    );
}
