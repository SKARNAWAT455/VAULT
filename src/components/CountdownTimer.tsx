"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
    endTime: string | Date;
    onExpired?: () => void;
}

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    expired: boolean;
}

function calculateTimeLeft(endTime: string | Date): TimeLeft {
    const diff = new Date(endTime).getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };

    return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / 1000 / 60) % 60),
        seconds: Math.floor((diff / 1000) % 60),
        expired: false,
    };
}

function pad(n: number) { return String(n).padStart(2, "0"); }

export default function CountdownTimer({ endTime, onExpired }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft(endTime));

    useEffect(() => {
        if (timeLeft.expired) { onExpired?.(); return; }

        const timer = setInterval(() => {
            const next = calculateTimeLeft(endTime);
            setTimeLeft(next);
            if (next.expired) {
                clearInterval(timer);
                onExpired?.();
            }
        }, 1000);

        return () => clearInterval(timer);
    }, [endTime, timeLeft.expired, onExpired]);

    if (timeLeft.expired) {
        return (
            <span
                style={{
                    background: "#dc3545",
                    color: "#fff",
                    padding: "4px 12px",
                    borderRadius: 20,
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    letterSpacing: "0.5px",
                }}
            >
                ⏱ Auction Ended
            </span>
        );
    }

    const isUrgent = timeLeft.days === 0 && timeLeft.hours < 1;

    return (
        <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
            {timeLeft.days > 0 && (
                <Segment value={pad(timeLeft.days)} label="Days" urgent={false} />
            )}
            <Segment value={pad(timeLeft.hours)} label="Hrs" urgent={isUrgent} />
            <Separator />
            <Segment value={pad(timeLeft.minutes)} label="Min" urgent={isUrgent} />
            <Separator />
            <Segment value={pad(timeLeft.seconds)} label="Sec" urgent={isUrgent} />
        </div>
    );
}

function Segment({ value, label, urgent }: { value: string; label: string; urgent: boolean }) {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: urgent ? "#dc3545" : "#1a1a2e",
                color: "#fff",
                borderRadius: 6,
                padding: "4px 10px",
                minWidth: 44,
                transition: "background 0.3s",
            }}
        >
            <span style={{ fontSize: "1.1rem", fontWeight: 800, letterSpacing: "-0.5px" }}>{value}</span>
            <span style={{ fontSize: "0.6rem", opacity: 0.7, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</span>
        </div>
    );
}

function Separator() {
    return <span style={{ color: "#6c757d", fontWeight: 700, fontSize: "1.1rem", marginTop: -4 }}>:</span>;
}
