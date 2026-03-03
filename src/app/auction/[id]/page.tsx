import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import BidForm from "@/components/BidForm";
import Link from "next/link";

export default async function AuctionDetailPage({ params }: { params: { id: string } }) {
    const auction = await prisma.auction.findUnique({
        where: { id: params.id },
        include: {
            bids: {
                orderBy: { createdAt: "desc" },
                take: 5,
                include: { user: { select: { name: true } } }
            }
        }
    });

    if (!auction) {
        notFound();
    }

    const timeLeft = Math.max(0, auction.endTime.getTime() - Date.now());
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="row g-5">
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.1s">
                        <div className="position-relative overflow-hidden h-100" style={{ minHeight: "400px" }}>
                            <img
                                className="position-absolute img-fluid w-100 h-100"
                                src={auction.imageUrl || "/img/placeholder.jpg"}
                                style={{ objectFit: "cover" }}
                                alt={auction.title}
                            />
                        </div>
                    </div>
                    <div className="col-lg-6 wow fadeIn" data-wow-delay="0.5s">
                        <div className="section-title text-start">
                            <h1 className="display-5 mb-4">{auction.title}</h1>
                        </div>
                        <p className="mb-4">{auction.description}</p>

                        <div className="bg-light p-4 mb-4 rounded border">
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <p className="text-muted mb-1">Current Bid</p>
                                    <h3 className="text-primary mb-0">${auction.currentPrice.toLocaleString()}</h3>
                                </div>
                                <div className="col-sm-6">
                                    <p className="text-muted mb-1">Time Remaining</p>
                                    <h4 className="mb-0">
                                        {auction.status === "CLOSED" ? "AUCTION CLOSED" : `${days}d ${hours}h left`}
                                    </h4>
                                </div>
                            </div>
                        </div>

                        {auction.status === "ACTIVE" && (
                            <BidForm auctionId={auction.id} currentPrice={auction.currentPrice} />
                        )}

                        <div className="mt-5">
                            <h5 className="mb-3">Recent Bids</h5>
                            {auction.bids.length > 0 ? (
                                <ul className="list-group list-group-flush border-top">
                                    {auction.bids.map((bid) => (
                                        <li key={bid.id} className="list-group-item d-flex justify-content-between align-items-center bg-transparent px-0 py-3">
                                            <div>
                                                <strong>{bid.user.name || "Anonymous"}</strong>
                                                <br />
                                                <small className="text-muted">{new Date(bid.createdAt).toLocaleString()}</small>
                                            </div>
                                            <span className="badge bg-primary rounded-pill fs-6">${bid.amount.toLocaleString()}</span>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-muted">No bids yet.</p>
                            )}
                        </div>

                        <div className="mt-4">
                            <Link href="/" className="btn btn-outline-primary py-2 px-4 shadow-sm border">
                                <i className="fa fa-arrow-left me-2"></i>Back to Auctions
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
