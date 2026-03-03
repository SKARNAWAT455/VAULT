import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ChangePasswordForm from "@/components/ChangePasswordForm";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) redirect("/login");

    const user = await prisma.user.findUnique({
        where: { email: session.user.email },
        include: {
            bids: { orderBy: { createdAt: "desc" }, include: { auction: { select: { title: true } } } },
        },
    });

    const isAdmin = (session.user as any).role === "ADMIN";

    // Admin-specific stats
    let adminStats = null;
    if (isAdmin) {
        adminStats = {
            totalUsers: await prisma.user.count(),
            totalAuctions: await prisma.auction.count({ where: { status: { not: "DELETED" } } }),
            totalBids: await prisma.bid.count(),
            archivedAuctions: await prisma.auction.count({ where: { status: "DELETED" } }),
            totalMessages: await prisma.contactMessage.count(),
        };
    }

    return (
        <div className="container-xxl py-5 bg-light" style={{ minHeight: "90vh" }}>
            <div className="container">
                <div className="mb-5">
                    <h6 className="text-primary text-uppercase mb-2" style={{ letterSpacing: "2px" }}>Account</h6>
                    <h1 className="display-5 mb-0">My Profile</h1>
                </div>

                <div className="row g-4">
                    {/* Left Column - Account Info */}
                    <div className="col-lg-4">
                        {/* Profile Card */}
                        <div className="bg-white rounded shadow-sm p-4 text-center mb-4">
                            <div
                                className="rounded-circle text-white d-flex align-items-center justify-content-center mx-auto mb-3"
                                style={{ width: "100px", height: "100px", fontSize: "2.5rem", background: isAdmin ? "linear-gradient(135deg, #6a11cb, #2575fc)" : "linear-gradient(135deg, #f093fb, #f5576c)" }}
                            >
                                {user?.name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || "U"}
                            </div>
                            <h4 className="fw-bold mb-1">{user?.name || "No Name Set"}</h4>
                            <p className="text-muted mb-2">{user?.email}</p>
                            <span className={`badge px-3 py-2 ${isAdmin ? 'bg-primary' : 'bg-secondary'}`}>
                                <i className={`fa ${isAdmin ? 'fa-shield-alt' : 'fa-user'} me-1`}></i>
                                {isAdmin ? "Administrator" : "Member"}
                            </span>
                        </div>

                        {/* Admin Stats */}
                        {isAdmin && adminStats && (
                            <div className="bg-white rounded shadow-sm p-4 mb-4">
                                <h5 className="fw-bold mb-4">Platform Overview</h5>
                                <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                    <span className="text-muted"><i className="fa fa-users me-2 text-primary"></i>Total Users</span>
                                    <span className="fw-bold">{adminStats.totalUsers}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                    <span className="text-muted"><i className="fa fa-gavel me-2 text-primary"></i>Active Auctions</span>
                                    <span className="fw-bold">{adminStats.totalAuctions}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                    <span className="text-muted"><i className="fa fa-coins me-2 text-primary"></i>Total Bids</span>
                                    <span className="fw-bold">{adminStats.totalBids}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                    <span className="text-muted"><i className="fa fa-archive me-2 text-primary"></i>Archived</span>
                                    <span className="fw-bold">{adminStats.archivedAuctions}</span>
                                </div>
                                <div className="d-flex justify-content-between align-items-center py-2">
                                    <span className="text-muted"><i className="fa fa-envelope me-2 text-primary"></i>Messages</span>
                                    <span className="fw-bold">{adminStats.totalMessages}</span>
                                </div>
                            </div>
                        )}

                        {/* User Bids Summary */}
                        {!isAdmin && user?.bids && user.bids.length > 0 && (
                            <div className="bg-white rounded shadow-sm p-4">
                                <h5 className="fw-bold mb-4">Recent Bids</h5>
                                {user.bids.slice(0, 5).map((bid) => (
                                    <div key={bid.id} className="d-flex justify-content-between align-items-center py-2 border-bottom last-border-0">
                                        <span className="text-muted small text-truncate me-2" style={{ maxWidth: "160px" }}>{bid.auction.title}</span>
                                        <span className="fw-bold text-primary small">${bid.amount.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Change Password */}
                    <div className="col-lg-8">
                        <div className="bg-white rounded shadow-sm p-4 p-lg-5">
                            <h4 className="fw-bold mb-2">Security Settings</h4>
                            <p className="text-muted mb-4">Update your password to keep your account secure.</p>
                            <ChangePasswordForm />
                        </div>

                        {/* Quick Links for Admin */}
                        {isAdmin && (
                            <div className="bg-white rounded shadow-sm p-4 mt-4">
                                <h5 className="fw-bold mb-4">Quick Admin Links</h5>
                                <div className="row g-3">
                                    <div className="col-sm-6">
                                        <a href="/admin" className="d-flex align-items-center p-3 bg-light rounded text-decoration-none text-dark hover-shadow">
                                            <div className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3" style={{ width: "42px", height: "42px" }}>
                                                <i className="fa fa-tachometer-alt"></i>
                                            </div>
                                            <div>
                                                <div className="fw-bold small">Dashboard</div>
                                                <div className="text-muted" style={{ fontSize: "0.75rem" }}>Manage auctions</div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-sm-6">
                                        <a href="/admin/messages" className="d-flex align-items-center p-3 bg-light rounded text-decoration-none text-dark">
                                            <div className="rounded-circle bg-success text-white d-flex align-items-center justify-content-center me-3" style={{ width: "42px", height: "42px" }}>
                                                <i className="fa fa-envelope"></i>
                                            </div>
                                            <div>
                                                <div className="fw-bold small">Messages</div>
                                                <div className="text-muted" style={{ fontSize: "0.75rem" }}>View contact inbox</div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-sm-6">
                                        <a href="/admin/auctions/new" className="d-flex align-items-center p-3 bg-light rounded text-decoration-none text-dark">
                                            <div className="rounded-circle bg-warning text-white d-flex align-items-center justify-content-center me-3" style={{ width: "42px", height: "42px" }}>
                                                <i className="fa fa-plus"></i>
                                            </div>
                                            <div>
                                                <div className="fw-bold small">Create Auction</div>
                                                <div className="text-muted" style={{ fontSize: "0.75rem" }}>Add a new listing</div>
                                            </div>
                                        </a>
                                    </div>
                                    <div className="col-sm-6">
                                        <a href="/admin/history" className="d-flex align-items-center p-3 bg-light rounded text-decoration-none text-dark">
                                            <div className="rounded-circle bg-secondary text-white d-flex align-items-center justify-content-center me-3" style={{ width: "42px", height: "42px" }}>
                                                <i className="fa fa-history"></i>
                                            </div>
                                            <div>
                                                <div className="fw-bold small">History</div>
                                                <div className="text-muted" style={{ fontSize: "0.75rem" }}>View archived auctions</div>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
