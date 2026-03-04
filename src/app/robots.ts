import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: ["/", "/auction", "/about", "/contact", "/service"],
                disallow: ["/admin", "/profile", "/my-bids", "/api/"],
            },
        ],
        sitemap: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/sitemap.xml`,
    };
}
