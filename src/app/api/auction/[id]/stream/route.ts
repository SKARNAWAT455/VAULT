/**
 * Server-Sent Events (SSE) stream for live bid updates.
 * Clients subscribe to /api/auction/[id]/stream and receive JSON events
 * whenever a new bid updates the auction price.
 *
 * This uses a simple in-process pub/sub — works perfectly for local/college use.
 * For multi-server production, swap the listener map with Redis pub/sub.
 */

import { NextResponse } from "next/server";
import { listeners } from "@/lib/sse";

export async function GET(
    _req: Request,
    { params }: { params: { id: string } }
) {
    const auctionId = params.id;

    const stream = new ReadableStream({
        start(controller) {
            // Register this client
            if (!listeners.has(auctionId)) listeners.set(auctionId, new Set());
            listeners.get(auctionId)!.add(controller);

            // Send a heartbeat comment every 25s to keep connection alive
            const heartbeat = setInterval(() => {
                try {
                    controller.enqueue(new TextEncoder().encode(": heartbeat\n\n"));
                } catch {
                    clearInterval(heartbeat);
                }
            }, 25000);

            // Clean up on disconnect
            _req.signal.addEventListener("abort", () => {
                clearInterval(heartbeat);
                listeners.get(auctionId)?.delete(controller);
                try { controller.close(); } catch { /* already closed */ }
            });
        },
    });

    return new NextResponse(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache, no-transform",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    });
}
