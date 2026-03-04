import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const base = process.env.NEXTAUTH_URL || "http://localhost:3000";

    const staticRoutes: MetadataRoute.Sitemap = [
        { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
        { url: `${base}/auction`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
        { url: `${base}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
        { url: `${base}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
        { url: `${base}/service`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    ];

    try {
        const auctions = await prisma.auction.findMany({
            where: { status: "ACTIVE" },
            select: { id: true, updatedAt: true },
            orderBy: { updatedAt: "desc" },
            take: 200,
        });

        const auctionRoutes: MetadataRoute.Sitemap = auctions.map((a) => ({
            url: `${base}/auction/${a.id}`,
            lastModified: a.updatedAt,
            changeFrequency: "hourly",
            priority: 0.8,
        }));

        return [...staticRoutes, ...auctionRoutes];
    } catch {
        return staticRoutes;
    }
}
