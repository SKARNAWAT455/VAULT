"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function CreateAuctionPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startingPrice, setStartingPrice] = useState("");
    const [endTime, setEndTime] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
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
            // Clear URL if file is chosen
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
            // First upload image if file is selected
            let finalImageUrl = imageUrl;
            if (imageFile) {
                const uploadedUrl = await uploadImage();
                if (!uploadedUrl) {
                    setError("Failed to upload image. Please try again.");
                    setLoading(false);
                    return;
                }
                finalImageUrl = uploadedUrl;
            }

            const res = await fetch("/api/admin/auctions", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    description,
                    startingPrice: Number(startingPrice),
                    endTime,
                    imageUrl: finalImageUrl,
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || "Failed to create auction.");
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
                            <h1 className="display-5 mb-4">Create New Auction</h1>
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
                                            placeholder="e.g. Rare 18th Century Pocket Watch"
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
                                            placeholder="Detailed description of the item, history, and condition..."
                                            rows={5}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            required
                                        ></textarea>
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">Starting Price ($)</label>
                                        <input
                                            type="number"
                                            className="form-control border-0"
                                            placeholder="100.00"
                                            style={{ height: "55px" }}
                                            value={startingPrice}
                                            onChange={(e) => setStartingPrice(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="form-label fw-bold">End Date & Time</label>
                                        <input
                                            type="datetime-local"
                                            className="form-control border-0"
                                            style={{ height: "55px" }}
                                            value={endTime}
                                            onChange={(e) => setEndTime(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label fw-bold">Item Image</label>
                                        <div className="card border-0 bg-white p-3 mb-3">
                                            <div className="row align-items-center">
                                                <div className="col-md-6">
                                                    <div className="mb-3">
                                                        <label className="form-label small text-muted">Upload Local File</label>
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
                                                        <label className="form-label small text-muted">Image URL Address</label>
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
                                                    {imagePreview || imageUrl ? (
                                                        <div className="position-relative d-inline-block">
                                                            <img
                                                                src={imagePreview || imageUrl}
                                                                alt="Preview"
                                                                className="rounded shadow-sm"
                                                                style={{ maxWidth: "100%", maxHeight: "150px", objectFit: "contain" }}
                                                            />
                                                            <div className="position-absolute top-0 start-0 badge bg-primary m-2 shadow">Preview</div>
                                                        </div>
                                                    ) : (
                                                        <div className="text-muted small py-4">
                                                            <i className="fa fa-image fa-3x mb-2 d-block opacity-25"></i>
                                                            No image selected
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
                                                    <><span className="spinner-border spinner-border-sm me-2"></span>Creating...</>
                                                ) : "Create Auction"}
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
