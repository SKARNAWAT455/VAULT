import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

export default async function AdminMessagesPage() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") redirect("/");

    const messages = await prisma.contactMessage.findMany({
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="container-xxl py-5 bg-light" style={{ minHeight: "90vh" }}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-end mb-4">
                    <div>
                        <h6 className="text-primary text-uppercase mb-2" style={{ letterSpacing: "2px" }}>Inbox</h6>
                        <h1 className="display-5 mb-0">Contact Messages</h1>
                    </div>
                    <span className="badge bg-primary fs-6 px-3 py-2">{messages.length} Total</span>
                </div>

                {messages.length === 0 ? (
                    <div className="bg-white rounded shadow-sm p-5 text-center">
                        <i className="fa fa-inbox fa-4x text-muted mb-3 d-block opacity-25"></i>
                        <p className="text-muted">No messages yet. Contact submissions will appear here.</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {messages.map((msg) => (
                            <div key={msg.id} className="col-lg-6">
                                <div className={`bg-white rounded shadow-sm p-4 h-100 border-start border-4 ${msg.isRead ? 'border-secondary' : 'border-primary'}`}>
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <div>
                                            <h5 className="fw-bold mb-1">{msg.name}</h5>
                                            <a href={`mailto:${msg.email}`} className="text-primary small text-decoration-none">
                                                <i className="fa fa-envelope me-1"></i>{msg.email}
                                            </a>
                                        </div>
                                        <div className="text-end">
                                            {!msg.isRead && (
                                                <span className="badge bg-primary rounded-pill mb-1 d-block">New</span>
                                            )}
                                            <small className="text-muted">
                                                {new Date(msg.createdAt).toLocaleDateString()} {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </small>
                                        </div>
                                    </div>
                                    <div className="mb-2">
                                        <span className="badge bg-light text-dark border fw-normal">
                                            <i className="fa fa-tag me-1 text-primary"></i>{msg.subject}
                                        </span>
                                    </div>
                                    <p className="text-muted mb-0 mt-3" style={{ lineHeight: 1.7 }}>{msg.message}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
