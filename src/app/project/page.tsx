import Link from 'next/link';
import { prisma } from "@/lib/prisma";

export default async function Project() {
    const auctions = await prisma.auction.findMany({
        where: { status: "ACTIVE" },
        orderBy: { endTime: "asc" }
    });

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header page-header-auction py-5 mb-5">
                <div className="container py-5">
                    <h2 className="display-3 text-white mb-3 animated slideInDown">Upcoming Auctions</h2>
                    <nav aria-label="breadcrumb animated slideInDown"></nav>
                </div>
            </div>
            {/* Page Header End */}

            {/* Projects Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="section-title text-center">
                        <h1 className="display-5 mb-5" style={{ color: 'rgb(215, 152, 75)' }}>Indulge Yourself Into The Thrill Of Auction</h1>
                    </div>
                    <div className="row g-4 portfolio-container">
                        {auctions.map((auction) => (
                            <div key={auction.id} className="col-lg-4 col-md-6 portfolio-item wow fadeInUp" data-wow-delay="0.1s">
                                <div className="rounded overflow-hidden">
                                    <div className="position-relative overflow-hidden">
                                        <img
                                            className="img-fluid w-100"
                                            src={auction.imageUrl || "/img/placeholder.jpg"}
                                            alt={auction.title}
                                            style={{ height: '250px', objectFit: 'cover' }}
                                        />
                                        <div className="portfolio-overlay">
                                            <Link className="btn btn-square btn-outline-light mx-1" href={`/auction/${auction.id}`}><i className="fa fa-eye"></i></Link>
                                            <Link className="btn btn-square btn-outline-light mx-1" href={`/auction/${auction.id}`}><i className="fa fa-link"></i></Link>
                                        </div>
                                    </div>
                                    <div className="border border-5 border-light border-top-0 p-4">
                                        <p className="text-primary fw-medium mb-2">{auction.title}</p>
                                        <h5 className="lh-base mb-2">Current Bid: ${auction.currentPrice.toLocaleString()}</h5>
                                        <small className="text-muted">Ends: {new Date(auction.endTime).toLocaleDateString()}</small>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {auctions.length === 0 && (
                            <div className="col-12 text-center py-5">
                                <h4 className="text-muted">No active auctions at the moment.</h4>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Projects End */}
        </>
    );
}
