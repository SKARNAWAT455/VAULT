import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import EditAuctionForm from "@/components/EditAuctionForm";
import { authOptions } from "@/lib/auth";

export default async function AdminEditAuctionPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
        redirect("/");
    }

    const auction = await prisma.auction.findUnique({
        where: { id: params.id },
    });

    if (!auction) {
        notFound();
    }

    // Convert Date to string for client component if necessary, 
    // though Next.js serializes it. To be safe, we cast or convert.
    const serializedAuction = {
        ...auction,
        endTime: auction.endTime.toISOString(),
    };

    return <EditAuctionForm auction={serializedAuction as any} />;
}
