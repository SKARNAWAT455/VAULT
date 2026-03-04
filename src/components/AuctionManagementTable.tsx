"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Auction {
    id: string;
    title: string;
    currentPrice: number;
    endTime: string | Date;
    status: string;
}

interface Props {
    auctions: Auction[];
}

export default function AuctionManagementTable({ auctions }: Props) {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
    const [bulkLoading, setBulkLoading] = useState(false);
    const router = useRouter();

    const filteredAuctions = auctions.filter((a) => {
        const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "ALL" || a.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    // ─── Selection ───────────────────────────────────────────────────────────
    const toggleSelect = (id: string) => {
        setSelectedIds((prev) => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            return next;
        });
    };

    const toggleSelectAll = () => {
        if (selectedIds.size === filteredAuctions.length) {
            setSelectedIds(new Set());
        } else {
            setSelectedIds(new Set(filteredAuctions.map((a) => a.id)));
        }
    };

    // ─── Individual Actions ───────────────────────────────────────────────────
    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Archive "${title}"? It will appear in Auction History.`)) return;
        setLoadingId(id);
        try {
            const res = await fetch(`/api/admin/auctions/${id}`, { method: "DELETE" });
            if (res.ok) router.refresh();
            else alert("Failed to delete auction.");
        } catch { alert("An error occurred."); }
        finally { setLoadingId(null); }
    };

    const handleToggleStatus = async (id: string, currentStatus: string) => {
        const action = currentStatus === "ACTIVE" ? "close" : "reopen";
        if (!confirm(`Are you sure you want to ${action} this auction?`)) return;
        setLoadingId(`toggle-${id}`);
        try {
            const res = await fetch(`/api/admin/auctions/${id}/toggle-status`, { method: "PATCH" });
            if (res.ok) router.refresh();
            else alert("Failed to toggle auction status.");
        } catch { alert("An error occurred."); }
        finally { setLoadingId(null); }
    };

    // ─── Bulk Delete ─────────────────────────────────────────────────────────
    const handleBulkDelete = async () => {
        if (selectedIds.size === 0) return;
        if (!confirm(`Archive ${selectedIds.size} selected auction(s)?`)) return;
        setBulkLoading(true);
        try {
            await Promise.all(
                Array.from(selectedIds).map((id) =>
                    fetch(`/api/admin/auctions/${id}`, { method: "DELETE" })
                )
            );
            setSelectedIds(new Set());
            router.refresh();
        } catch { alert("Some deletions failed."); }
        finally { setBulkLoading(false); }
    };

    // ─── CSV Export ───────────────────────────────────────────────────────────
    const handleExport = (type: "bids" | "contacts") => {
        window.open(`/api/admin/export?type=${type}`, "_blank");
    };

    return (
        <div className="auction-management">
            {/* Toolbar */}
            <div className="row g-3 mb-4 align-items-center">
                <div className="col-md-5">
                    <div className="input-group shadow-sm">
                        <span className="input-group-text bg-white border-end-0">
                            <i className="fa fa-search text-muted" />
                        </span>
                        <input
                            type="text"
                            className="form-control border-start-0 ps-0"
                            placeholder="Filter by auction title..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <div className="col-md-3">
                    <select
                        className="form-select shadow-sm"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value="ALL">All Statuses</option>
                        <option value="ACTIVE">Active Only</option>
                        <option value="CLOSED">Closed Only</option>
                    </select>
                </div>
                <div className="col-md-4 d-flex gap-2 justify-content-end flex-wrap">
                    {selectedIds.size > 0 && (
                        <button
                            className="btn btn-danger btn-sm shadow-sm"
                            onClick={handleBulkDelete}
                            disabled={bulkLoading}
                        >
                            {bulkLoading ? <span className="spinner-border spinner-border-sm" /> : <i className="fa fa-trash me-1" />}
                            Archive {selectedIds.size}
                        </button>
                    )}
                    <div className="dropdown">
                        <button
                            className="btn btn-outline-success btn-sm shadow-sm dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            <i className="fa fa-download me-1" />Export CSV
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                                <button className="dropdown-item" onClick={() => handleExport("bids")}>
                                    <i className="fa fa-gavel me-2 text-primary" />Bid History
                                </button>
                            </li>
                            <li>
                                <button className="dropdown-item" onClick={() => handleExport("contacts")}>
                                    <i className="fa fa-envelope me-2 text-primary" />Contact Messages
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="table-responsive">
                <table className="table table-hover align-middle shadow-sm rounded overflow-hidden">
                    <thead className="table-dark">
                        <tr>
                            <th className="px-3 py-3" style={{ width: 40 }}>
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    checked={filteredAuctions.length > 0 && selectedIds.size === filteredAuctions.length}
                                    onChange={toggleSelectAll}
                                    title="Select all"
                                />
                            </th>
                            <th className="px-3 py-3">Auction Item</th>
                            <th className="py-3 text-center">Price</th>
                            <th className="py-3 text-center">Status</th>
                            <th className="py-3">Ends</th>
                            <th className="text-end px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filteredAuctions.length > 0 ? (
                            filteredAuctions.map((auction) => (
                                <tr
                                    key={auction.id}
                                    className={selectedIds.has(auction.id) ? "table-active" : ""}
                                >
                                    <td className="px-3">
                                        <input
                                            type="checkbox"
                                            className="form-check-input"
                                            checked={selectedIds.has(auction.id)}
                                            onChange={() => toggleSelect(auction.id)}
                                        />
                                    </td>
                                    <td className="px-3">
                                        <Link href={`/admin/auctions/${auction.id}`} className="text-decoration-none fw-bold text-dark d-block">
                                            {auction.title}
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <span className="fw-bold text-primary">${auction.currentPrice.toLocaleString()}</span>
                                    </td>
                                    <td className="text-center">
                                        <span className={`badge rounded-pill px-3 ${auction.status === "ACTIVE" ? "bg-success" : "bg-secondary"}`}>
                                            {auction.status}
                                        </span>
                                    </td>
                                    <td className="small text-muted">
                                        {new Date(auction.endTime).toLocaleDateString()}
                                    </td>
                                    <td className="text-end px-4">
                                        <div className="btn-group shadow-sm">
                                            <Link href={`/admin/auctions/${auction.id}`} className="btn btn-outline-info btn-sm" title="View">
                                                <i className="fa fa-eye" />
                                            </Link>
                                            <Link href={`/admin/auctions/${auction.id}/edit`} className="btn btn-outline-primary btn-sm" title="Edit">
                                                <i className="fa fa-edit" />
                                            </Link>
                                            <button
                                                onClick={() => handleToggleStatus(auction.id, auction.status)}
                                                className={`btn btn-sm ${auction.status === "ACTIVE" ? "btn-outline-warning" : "btn-outline-success"}`}
                                                disabled={loadingId === `toggle-${auction.id}`}
                                                title={auction.status === "ACTIVE" ? "Close Auction" : "Reopen Auction"}
                                            >
                                                {loadingId === `toggle-${auction.id}` ? (
                                                    <span className="spinner-border spinner-border-sm" />
                                                ) : (
                                                    <i className={`fa fa-${auction.status === "ACTIVE" ? "lock" : "unlock"}`} />
                                                )}
                                            </button>
                                            <button
                                                onClick={() => handleDelete(auction.id, auction.title)}
                                                className="btn btn-outline-danger btn-sm"
                                                disabled={loadingId === auction.id}
                                                title="Archive"
                                            >
                                                {loadingId === auction.id ? (
                                                    <span className="spinner-border spinner-border-sm" />
                                                ) : (
                                                    <i className="fa fa-trash" />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-5 text-muted">
                                    <i className="fa fa-search fa-3x mb-3 d-block opacity-25" />
                                    {auctions.length === 0 ? "No auctions created yet." : "No results matching your filter."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {filteredAuctions.length > 0 && (
                <p className="text-muted small mt-2">
                    Showing {filteredAuctions.length} of {auctions.length} auction(s)
                    {selectedIds.size > 0 && <> · <strong>{selectedIds.size} selected</strong></>}
                </p>
            )}
        </div>
    );
}
