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
    const router = useRouter();

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"? This will also remove all bidding history for this item.`)) {
            return;
        }

        setLoadingId(id);

        try {
            const res = await fetch(`/api/admin/auctions/${id}`, {
                method: "DELETE",
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert("Failed to delete auction.");
            }
        } catch (err) {
            alert("An error occurred while deleting.");
        } finally {
            setLoadingId(null);
        }
    };

    const filteredAuctions = auctions.filter(auction => {
        const matchesSearch = auction.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "ALL" || auction.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="auction-management">
            <div className="row g-3 mb-4">
                <div className="col-md-8">
                    <div className="input-group shadow-sm">
                        <span className="input-group-text bg-white border-end-0">
                            <i className="fa fa-search text-muted"></i>
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
                <div className="col-md-4">
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
            </div>

            <div className="table-responsive">
                <table className="table table-hover align-middle shadow-sm rounded overflow-hidden">
                    <thead className="table-dark">
                        <tr>
                            <th className="px-4 py-3">Auction Item</th>
                            <th className="py-3 text-center">Price</th>
                            <th className="py-3 text-center">Status</th>
                            <th className="py-3">Ends</th>
                            <th className="text-end px-4 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white">
                        {filteredAuctions.length > 0 ? (
                            filteredAuctions.map((auction) => (
                                <tr key={auction.id} className="transition-all">
                                    <td className="px-4">
                                        <Link href={`/admin/auctions/${auction.id}`} className="text-decoration-none fw-bold text-dark hover-primary d-block">
                                            {auction.title}
                                        </Link>
                                    </td>
                                    <td className="text-center">
                                        <span className="fw-bold text-primary">${auction.currentPrice.toLocaleString()}</span>
                                    </td>
                                    <td className="text-center">
                                        <span className={`badge rounded-pill px-3 ${auction.status === 'ACTIVE' ? 'bg-success' : 'bg-secondary'}`}>
                                            {auction.status}
                                        </span>
                                    </td>
                                    <td className="small text-muted">
                                        {new Date(auction.endTime).toLocaleDateString()}
                                    </td>
                                    <td className="text-end px-4">
                                        <div className="btn-group shadow-sm">
                                            <Link href={`/admin/auctions/${auction.id}`} className="btn btn-outline-info btn-sm" title="View Details">
                                                <i className="fa fa-eye"></i>
                                            </Link>
                                            <Link href={`/admin/auctions/${auction.id}/edit`} className="btn btn-outline-primary btn-sm" title="Edit">
                                                <i className="fa fa-edit"></i>
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(auction.id, auction.title)}
                                                className="btn btn-outline-danger btn-sm"
                                                disabled={loadingId === auction.id}
                                                title="Delete"
                                            >
                                                {loadingId === auction.id ? (
                                                    <span className="spinner-border spinner-border-sm"></span>
                                                ) : (
                                                    <i className="fa fa-trash"></i>
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="text-center py-5 text-muted">
                                    <i className="fa fa-search fa-3x mb-3 d-block opacity-25"></i>
                                    {auctions.length === 0 ? "No auctions created yet." : "No results matching your filter."}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
