"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Auction {
    id: string;
    title: string;
    description: string;
    startingPrice: number;
    endTime: string;
    imageUrl: string;
    status: string;
}

export default function EditAuctionForm({ auction }: { auction: Auction }) {
    const [title, setTitle] = useState(auction.title);
    const [description, setDescription] = useState(auction.description);
    const [startingPrice, setStartingPrice] = useState(auction.startingPrice.toString());
    const [endTime, setEndTime] = useState(new Date(auction.endTime).toISOString().slice(0, 16));
    const [imageUrl, setImageUrl] = useState(auction.imageUrl || "");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [status, setStatus] = useState(auction.status);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);
            setImageUrl("");
        }
    };

    const uploadImage = async (): Promise<string | null> => {
        if (!imageFile) return imageUrl;

        const formData = new FormData();
        formData.append("file", imageFile);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");
            const data = await res.json();
            return data.url;
        } catch (err) {
            console.error("Image upload error:", err);
            return null;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            let finalImageUrl = imageUrl;
            if (imageFile) {
                const uploadedUrl = await uploadImage();
                if (!uploadedUrl) {
                    setError("Failed to upload image.");
                    setLoading(false);
                    return;
                }
                finalImageUrl = uploadedUrl;
            }

            const res = await fetch(`/api/admin/auctions/${auction.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description,
                    startingPrice: Number(startingPrice),
                    endTime,
                    imageUrl: finalImageUrl,
                    status,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Failed to update auction.");
            } else {
                router.push("/admin");
                router.refresh();
            }
        } catch (err) {
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container-xxl py-5">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="section-title text-start">
                            <h1 className="display-5 mb-4">Edit Auction</h1>
                        </div>
                        <div className="bg-light p-4 p-lg-5 rounded shadow-sm border">
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">
                                    <div className="col-12">
                                        <label className="form-label fw-bold">Item Title</label>
                                        <input
                                            type="text"
                                            className="form-control border-0"
                                            style={{ height: "55px" }}
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-bold">Description</label>
                                        <textarea
                                            className="form-control border-0"
                                            rows={5}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold">Price ($)</label>
                                        <input
                                            type="number"
                                            className="form-control border-0"
                                            style={{ height: "55px" }}
                                            value={startingPrice}
                                            onChange={(e) => setStartingPrice(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold">End Time</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control border-0"
                                            style={{ height: "55px" }}
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-4">
                                        <label className="form-label fw-bold">Status</label>
                                        <select
                                            className="form-select border-0 px-3"
                                            style={{ height: "55px" }}
                                            value={status}
                                            onChange={(e) => setStatus(e.target.value)}
                                        >
                                            <option value="ACTIVE">ACTIVE</option>
                                            <option value="CLOSED">CLOSED</option>
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-bold">Update Image</label>
                                        <div className="card border-0 bg-white p-3 mb-3">
                                            <div className="row align-items-center">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label small text-muted">Upload New Local File</label>
                                                        <input
                                                            type="file"
                                                            className="form-control form-control-sm"
                                                            accept="image/*"
                                                            onChange={handleFileChange}
                                                        />
                                                    </div>
                                                    <div className="text-center py-2">
                                                        <span className="text-muted small">--- OR ---</span>
                                                    </div>
                                                    <div>
                                                        <label className="form-label small text-muted">New Image URL</label>
                                                        <input
                                                            type="url"
                                                            className="form-control form-control-sm"
                                                            placeholder="https://example.com/item.jpg"
                                                            value={imageUrl}
                                                            onChange={(e) => {
                                                                setImageUrl(e.target.value);
                                                                setImageFile(null);
                                                                setImagePreview(null);
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6 text-center border-start">
                                                    {(imagePreview || imageUrl || auction.imageUrl) ? (
                                                        <div className="position-relative d-inline-block">
                                                            <img
                                                                src={imagePreview || imageUrl || auction.imageUrl}
                                                                alt="Preview"
                                                                className="rounded shadow-sm"
                                                                style={{ maxWidth: "100%", maxHeight: "150px", objectFit: "contain" }}
                                                            />
                                                            <div className="position-absolute top-0 start-0 badge bg-primary m-2 shadow">
                                                                {imagePreview ? 'Newly Uploaded' : 'Current Image'}
                                                            </div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-muted small py-4">
                                                            <i className="fa fa-image fa-3x mb-2 d-block opacity-25"></i>
                                                            No image set
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 mt-4">
                                        <div className="d-flex gap-2">
                                            <button className="btn btn-primary py-3 px-5 flex-grow-1 fw-bold" type="submit" disabled={loading}>
                                                {loading ? (
                                                    <><span className="spinner-border spinner-border-sm me-2"></span>Saving...</>
                                                ) : "Save Changes"}
                                            </button>
                                            <Link href="/admin" className="btn btn-outline-secondary py-3 px-4">
                                                Cancel
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
