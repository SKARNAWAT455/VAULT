// Global listener registry: auctionId -> Set of response controllers
export const listeners = new Map<string, Set<ReadableStreamDefaultController>>();

/** Called by the bid route after a successful bid to notify all listeners */
export function notifyBidUpdate(auctionId: string, data: { newPrice: number }) {
    const controllers = listeners.get(auctionId);
    if (!controllers || controllers.size === 0) return;
    const payload = `data: ${JSON.stringify(data)}\n\n`;
    controllers.forEach((ctrl) => {
        try {
            ctrl.enqueue(new TextEncoder().encode(payload));
        } catch {
            controllers.delete(ctrl);
        }
    });
}
