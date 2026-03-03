import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import AuctionManagementTable from "@/components/AuctionManagementTable";
import { authOptions } from "@/lib/auth";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "ADMIN") {
        redirect("/");
    }

    const stats = {
        totalUsers: await prisma.user.count(),
        totalAuctions: await prisma.auction.count(),
        activeAuctions: await prisma.auction.count({ where: { status: "ACTIVE" } }),
        totalBids: await prisma.bid.count(),
        unreadMessages: await prisma.contactMessage.count({ where: { isRead: false } }),
    };

    const auctions = await prisma.auction.findMany({
        where: { status: { not: "DELETED" } },
        orderBy: { createdAt: "desc" },
    });

    const deletedCount = await prisma.auction.count({ where: { status: "DELETED" } });

    const bids = await prisma.bid.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
            user: { select: { name: true, email: true } },
            auction: { select: { title: true } },
        },
    });

    return (
        <div className="container-xxl py-5 bg-light" style={{ minHeight: "90vh" }}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-end mb-4">
                    <div>
                        <h6 className="text-primary text-uppercase mb-2" style={{ letterSpacing: "2px" }}>Overview</h6>
                        <h1 className="display-5 mb-0">Management Console</h1>
                    </div>
                    <div className="text-end d-flex gap-2">
                        <Link href="/admin/messages" className="btn btn-outline-primary btn-lg shadow-sm px-4 py-3 border position-relative">
                            <i className="fa fa-envelope me-2"></i>Messages
                            {stats.unreadMessages > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                    {stats.unreadMessages}
                                </span>
                            )}
                        </Link>
                        <Link href="/admin/history" className="btn btn-outline-secondary btn-lg shadow-sm px-4 py-3 border position-relative">
                            <i className="fa fa-history me-2"></i>History
                            {deletedCount > 0 && (
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-dark">
                                    {deletedCount}
                                </span>
                            )}
                        </Link>
                        <Link href="/admin/auctions/new" className="btn btn-primary btn-lg shadow-sm px-4 py-3 border-0">
                            <i className="fa fa-plus me-2"></i>Create Auction
                        </Link>
                    </div>
                </div>

                <div className="row g-4 mb-5 text-white">
                    <div className="col-md-3">
                        <div className="p-4 rounded shadow-sm border-0 position-relative overflow-hidden h-100" style={{ background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)" }}>
                            <i className="fa fa-users position-absolute opacity-25" style={{ fontSize: "5rem", right: "-10px", bottom: "-10px" }}></i>
                            <h6 className="opacity-75 mb-2">Total Users</h6>
                            <h2 className="display-6 fw-bold mb-0">{stats.totalUsers}</h2>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="p-4 rounded shadow-sm border-0 position-relative overflow-hidden h-100" style={{ background: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)" }}>
                            <i className="fa fa-gavel position-absolute opacity-25" style={{ fontSize: "5rem", right: "-10px", bottom: "-10px" }}></i>
                            <h6 className="opacity-75 mb-2">Total Auctions</h6>
                            <h2 className="display-6 fw-bold mb-0">{stats.totalAuctions}</h2>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="p-4 rounded shadow-sm border-0 position-relative overflow-hidden h-100" style={{ background: "linear-gradient(135deg, #00b09b 0%, #96c93d 100%)" }}>
                            <i className="fa fa-check-circle position-absolute opacity-25" style={{ fontSize: "5rem", right: "-10px", bottom: "-10px" }}></i>
                            <h6 className="opacity-75 mb-2">Active Sales</h6>
                            <h2 className="display-6 fw-bold mb-0">{stats.activeAuctions}</h2>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <div className="p-4 rounded shadow-sm border-0 position-relative overflow-hidden h-100" style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
                            <i className="fa fa-coins position-absolute opacity-25" style={{ fontSize: "5rem", right: "-10px", bottom: "-10px" }}></i>
                            <h6 className="opacity-75 mb-2">Bids Placed</h6>
                            <h2 className="display-6 fw-bold mb-0">{stats.totalBids}</h2>
                        </div>
                    </div>
                    <div className="col-md-3">
                        <Link href="/admin/messages" className="text-decoration-none">
                            <div className="p-4 rounded shadow-sm border-0 position-relative overflow-hidden h-100" style={{ background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" }}>
                                <i className="fa fa-envelope position-absolute opacity-25" style={{ fontSize: "5rem", right: "-10px", bottom: "-10px" }}></i>
                                <h6 className="opacity-75 mb-2 text-white">New Messages</h6>
                                <h2 className="display-6 fw-bold mb-0 text-white">{stats.unreadMessages}</h2>
                            </div>
                        </Link>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-lg-8">
                        <div className="bg-white p-4 rounded shadow-sm border-0 h-100">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h4 className="mb-0 fw-bold">Active Auctions</h4>
                            </div>
                            <AuctionManagementTable auctions={auctions} />
                        </div>
                    </div>
                    <div className="col-lg-4">
                        <div className="bg-white p-4 rounded shadow-sm border-0 h-100">
                            <h4 className="mb-4 fw-bold">Recent Activity</h4>
                            <div className="activity-feed">
                                {bids.length > 0 ? (
                                    bids.map((bid, index) => (
                                        <div key={bid.id} className={`d-flex mb-4 ${index !== bids.length - 1 ? 'border-bottom pb-4' : ''}`}>
                                            <div className="bg-light rounded-circle p-3 me-3 text-primary d-flex align-items-center justify-content-center" style={{ width: "50px", height: "50px" }}>
                                                <i className="fa fa-hand-holding-usd"></i>
                                            </div>
                                            <div>
                                                <p className="mb-1 fw-bold text-dark">
                                                    {bid.user.name || bid.user.email} <span className="text-muted fw-normal">placed a bid of</span> ${bid.amount}
                                                </p>
                                                <p className="mb-1 small text-primary fw-bold">
                                                    {bid.auction.title}
                                                </p>
                                                <small className="text-muted">
                                                    {new Date(bid.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {new Date(bid.createdAt).toLocaleDateString()}
                                                </small>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-center py-5">
                                        <i className="fa fa-history fa-3x text-light mb-3"></i>
                                        <p className="text-muted">No recent activity found.</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
