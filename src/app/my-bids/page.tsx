import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function MyBidsPage() {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
        redirect("/login");
    }

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            bids: {
                orderBy: { createdAt: "desc" },
                include: { auction: true },
            },
        },
    });

    if (!user) {
        redirect("/login");
    }

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="section-title text-start">
                    <h1 className="display-5 mb-4">My Bids</h1>
                </div>

                {user.bids.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table table-hover border">
                            <thead className="bg-light">
                                <tr>
                                    <th>Auction Item</th>
                                    <th>My Bid Amount</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.bids.map((bid) => (
                                    <tr key={bid.id}>
                                        <td>
                                            <strong>{bid.auction.title}</strong>
                                        </td>
                                        <td>${bid.amount.toLocaleString()}</td>
                                        <td>{new Date(bid.createdAt).toLocaleString()}</td>
                                        <td>
                                            <span className={`badge ${bid.auction.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>
                                                {bid.auction.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Link href={`/auction/${bid.auction.id}`} className="btn btn-sm btn-outline-primary shadow-sm border">
                                                View Item
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-5">
                        <h4 className="text-muted mb-4">You haven't placed any bids yet.</h4>
                        <Link href="/project" className="btn btn-primary py-3 px-5">Explore Auctions</Link>
                    </div>
                )}
            </div>
        </div>
    );
}
