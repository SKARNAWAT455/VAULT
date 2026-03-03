import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/lib/auth";

export default async function AdminAuctionDetailsPage({ params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") {
        redirect("/");
    }

    const auction = await prisma.auction.findUnique({
        where: { id: params.id },
        include: {
            bids: {
                orderBy: { createdAt: "desc" },
                include: {
                    user: {
                        select: { name: true, email: true }
                    }
                }
            }
        }
    });

    if (!auction) {
        notFound();
    }

    const highestBid = auction.bids.length > 0 ? auction.bids[0] : null;

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="section-title text-start mb-0">
                        <h1 className="display-5 mb-0">Auction Details</h1>
                    </div>
                    <Link href="/admin" className="btn btn-outline-secondary">
                        <i className="fa fa-arrow-left me-2"></i>Back to Dashboard
                    </Link>
                </div>

                <div className="row g-4 mb-5">
                    <div className="col-lg-4">
                        <div className="bg-light p-4 rounded border h-100">
                            <h5 className="mb-3">Item Overview</h5>
                            <img
                                src={auction.imageUrl || "/img/placeholder.jpg"}
                                alt={auction.title}
                                className="img-fluid rounded mb-3 border"
                                style={{ maxHeight: "200px", width: "100%", objectFit: "cover" }}
                            />
                            <h4 className="text-primary">{auction.title}</h4>
                            <p className="text-muted small">{auction.description}</p>
                            <hr />
                            <div className="d-flex justify-content-between mb-2">
                                <span>Status:</span>
                                <span className={`badge ${auction.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>
                                    {auction.status}
                                </span>
                            </div>
                            <div className="d-flex justify-content-between">
                                <span>End Date:</span>
                                <b>{new Date(auction.endTime).toLocaleString()}</b>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="bg-primary text-white p-4 rounded border h-100 shadow">
                            <h5 className="mb-4 text-white">Current Performance</h5>
                            <div className="mb-4">
                                <p className="mb-1 small opacity-75">Starting Price</p>
                                <h3 className="text-white">${auction.startingPrice.toLocaleString()}</h3>
                            </div>
                            <div className="mb-4">
                                <p className="mb-1 small opacity-75">Current Highest Bid</p>
                                <h2 className="text-white">${auction.currentPrice.toLocaleString()}</h2>
                            </div>
                            <div>
                                <p className="mb-1 small opacity-75">Total Bids Placed</p>
                                <h3 className="text-white">{auction.bids.length}</h3>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="bg-light p-4 rounded border h-100">
                            <h5 className="mb-3">Highest Bidder</h5>
                            {highestBid ? (
                                <div>
                                    <div className="d-flex align-items-center mb-3">
                                        <div
                                            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
                                            style={{ width: "50px", height: "50px", fontSize: "1.2rem" }}
                                        >
                                            {highestBid.user.name?.[0] || highestBid.user.email?.[0]?.toUpperCase()}
                                        </div>
                                        <div>
                                            <h6 className="mb-0">{highestBid.user.name || "Anonymous"}</h6>
                                            <small className="text-muted">{highestBid.user.email}</small>
                                        </div>
                                    </div>
                                    <div className="p-3 bg-white rounded border">
                                        <div className="d-flex justify-content-between small mb-1">
                                            <span>Amount:</span>
                                            <b className="text-primary">${highestBid.amount.toLocaleString()}</b>
                                        </div>
                                        <div className="d-flex justify-content-between small">
                                            <span>Placed On:</span>
                                            <b>{new Date(highestBid.createdAt).toLocaleString()}</b>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center py-4">
                                    <i className="fa fa-info-circle text-muted mb-2 d-block fs-3"></i>
                                    <p className="text-muted mb-0">No bids yet</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <div className="bg-white p-4 rounded shadow-sm border">
                            <h5 className="mb-4">Bidding History & Logs</h5>
                            <div className="table-responsive">
                                <table className="table table-hover border-top">
                                    <thead className="bg-light">
                                        <tr>
                                            <th>Timestamp</th>
                                            <th>Bidder Name</th>
                                            <th>Bidder Email</th>
                                            <th className="text-end">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {auction.bids.map((bid) => (
                                            <tr key={bid.id}>
                                                <td>{new Date(bid.createdAt).toLocaleString()}</td>
                                                <td>{bid.user.name || "Anonymous"}</td>
                                                <td>{bid.user.email}</td>
                                                <td className="text-end fw-bold text-primary">${bid.amount.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                        {auction.bids.length === 0 && (
                                            <tr>
                                                <td colSpan={4} className="text-center py-4 text-muted">
                                                    No logs found for this auction.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
