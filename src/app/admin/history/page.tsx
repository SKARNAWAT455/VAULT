import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AuctionHistoryPage() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") redirect("/");

    const deleted = await prisma.auction.findMany({
        where: { status: "DELETED" },
        orderBy: { updatedAt: "desc" },
        include: {
            bids: {
                orderBy: { amount: "desc" },
                take: 1,
                include: { user: { select: { name: true, email: true } } },
            },
            _count: { select: { bids: true } },
        },
    });

    return (
        <div className="container-xxl py-5 bg-light" style={{ minHeight: "90vh" }}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-end mb-4">
                    <div>
                        <h6 className="text-primary text-uppercase mb-2" style={{ letterSpacing: "2px" }}>Archive</h6>
                        <h1 className="display-5 mb-0">Auction History</h1>
                    </div>
                    <Link href="/admin" className="btn btn-outline-secondary px-4 py-2">
                        <i className="fa fa-arrow-left me-2"></i>Back to Dashboard
                    </Link>
                </div>

                {deleted.length === 0 ? (
                    <div className="bg-white rounded shadow-sm p-5 text-center">
                        <i className="fa fa-history fa-4x text-muted mb-3 d-block opacity-25"></i>
                        <p className="text-muted">No archived auctions yet. Deleted auctions will appear here.</p>
                    </div>
                ) : (
                    <div className="table-responsive bg-white rounded shadow-sm">
                        <table className="table table-hover align-middle mb-0">
                            <thead className="table-dark">
                                <tr>
                                    <th className="px-4 py-3">Auction Title</th>
                                    <th className="py-3 text-center">Starting Price</th>
                                    <th className="py-3 text-center">Final Price</th>
                                    <th className="py-3 text-center">Total Bids</th>
                                    <th className="py-3">Highest Bidder</th>
                                    <th className="py-3">Archived On</th>
                                </tr>
                            </thead>
                            <tbody>
                                {deleted.map((auction) => {
                                    const topBid = auction.bids[0];
                                    return (
                                        <tr key={auction.id}>
                                            <td className="px-4">
                                                <span className="fw-bold text-dark">{auction.title}</span>
                                            </td>
                                            <td className="text-center text-muted">${auction.startingPrice.toLocaleString()}</td>
                                            <td className="text-center">
                                                <span className="fw-bold text-primary">${auction.currentPrice.toLocaleString()}</span>
                                            </td>
                                            <td className="text-center">
                                                <span className="badge bg-secondary rounded-pill px-3">{auction._count.bids}</span>
                                            </td>
                                            <td>
                                                {topBid ? (
                                                    <div>
                                                        <div className="fw-bold small">{topBid.user.name || topBid.user.email}</div>
                                                        <div className="text-muted small">${topBid.amount.toLocaleString()}</div>
                                                    </div>
                                                ) : (
                                                    <span className="text-muted small">No bids</span>
                                                )}
                                            </td>
                                            <td className="text-muted small">
                                                {new Date(auction.updatedAt).toLocaleDateString()} {new Date(auction.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
