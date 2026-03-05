'use client';

import { useState, useEffect } from 'react';

type Item = {
    id: string;
    title: string;
    description: string;
    category: string;
    condition: string;
    ownerName: string;
    status: string;
    createdAt: string;
};

const CATEGORIES = ['Furniture', 'Jewelry', 'Paintings', 'Ceramics', 'Coins', 'Manuscripts', 'Sculptures', 'Textiles', 'Other'];
const CONDITIONS = ['Poor', 'Fair', 'Good', 'Excellent', 'Mint'];

const STATUS_BADGE: Record<string, string> = {
    PENDING: 'warning',
    STORED: 'success',
    RETURNED: 'secondary',
};

export default function InventoryManagement() {
    const [items, setItems] = useState<Item[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [form, setForm] = useState({
        title: '', description: '', category: '', condition: '',
        ownerName: '', ownerEmail: '',
    });

    useEffect(() => {
        fetch('/api/inventory')
            .then(r => r.json())
            .then(data => { setItems(Array.isArray(data) ? data : []); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const res = await fetch('/api/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                const newItem = await res.json();
                setItems(prev => [newItem, ...prev]);
                setSubmitted(true);
                setForm({ title: '', description: '', category: '', condition: '', ownerName: '', ownerEmail: '' });
                setTimeout(() => { setSubmitted(false); setShowModal(false); }, 3000);
            }
        } catch { }
        setSubmitting(false);
    };

    return (
        <>
            {/* Page Header */}
            <div className="container-fluid page-header page-header-service py-5 mb-5">
                <div className="container py-5">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Inventory Management</h1>
                    <nav aria-label="breadcrumb animated slideInDown"></nav>
                </div>
            </div>

            {/* How It Works */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="section-title text-center mb-5">
                        <h1 className="display-5">How VAULT Secures Your Collection</h1>
                        <p className="text-muted mt-3">Submit your antique, we store it safely, you track it in real time.</p>
                    </div>
                    <div className="row g-4 mb-5">
                        {[
                            { icon: 'fa-clipboard-list', step: '01', title: 'Submit Your Item', desc: 'Fill in the details of your antique. Our team reviews the submission within 48 hours.' },
                            { icon: 'fa-warehouse', step: '02', title: 'Climate-Controlled Storage', desc: 'Your item is stored in our secure, humidity-controlled vault facility in Pune.' },
                            { icon: 'fa-search-location', step: '03', title: 'Live Status Tracking', desc: 'Monitor your item\'s storage status — Pending, Stored, or Returned — at any time.' },
                        ].map(({ icon, step, title, desc }) => (
                            <div key={step} className="col-md-4 wow fadeInUp">
                                <div className="text-center p-4 border border-5 border-light h-100">
                                    <div className="d-flex align-items-center justify-content-between mb-3">
                                        <div className="d-flex align-items-center justify-content-center bg-light" style={{ width: 70, height: 70 }}>
                                            <i className={`fa ${icon} fa-2x text-primary`}></i>
                                        </div>
                                        <h1 className="display-1 text-light mb-0">{step}</h1>
                                    </div>
                                    <h4 className="mb-2">{title}</h4>
                                    <p className="text-muted mb-0">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Submit CTA */}
                    <div className="text-center mb-5">
                        <button className="btn btn-primary py-3 px-5 me-3" onClick={() => setShowModal(true)}>
                            <i className="fa fa-plus me-2"></i>Submit Your Antique
                        </button>
                    </div>

                    {/* Items Grid */}
                    <div className="section-title text-center mb-4">
                        <h2 className="display-6">Items Currently in the Vault</h2>
                    </div>

                    {loading ? (
                        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
                    ) : items.length === 0 ? (
                        <div className="text-center py-5">
                            <i className="fa fa-box-open fa-3x text-muted mb-3 d-block"></i>
                            <p className="text-muted">No items currently in the vault. Be the first to submit!</p>
                        </div>
                    ) : (
                        <div className="row g-4">
                            {items.map(item => (
                                <div key={item.id} className="col-md-6 col-lg-4 wow fadeInUp">
                                    <div className="border border-5 border-light p-4 h-100">
                                        <div className="d-flex justify-content-between align-items-start mb-3">
                                            <span className="badge bg-secondary text-uppercase" style={{ fontSize: '0.7rem' }}>{item.category}</span>
                                            <span className={`badge bg-${STATUS_BADGE[item.status] || 'secondary'}`}>{item.status}</span>
                                        </div>
                                        <h5 className="mb-2">{item.title}</h5>
                                        <p className="text-muted small mb-3" style={{ lineHeight: '1.6' }}>{item.description.slice(0, 120)}{item.description.length > 120 ? '...' : ''}</p>
                                        <div className="d-flex justify-content-between align-items-center">
                                            <small className="text-muted"><i className="fa fa-tag me-1"></i>Condition: <strong>{item.condition}</strong></small>
                                            <small className="text-muted">{new Date(item.createdAt).toLocaleDateString('en-GB')}</small>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
                    <div className="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
                        <div className="modal-content">
                            <div className="modal-header bg-primary text-white">
                                <h5 className="modal-title"><i className="fa fa-box me-2"></i>Submit Item to VAULT Storage</h5>
                                <button className="btn-close btn-close-white" onClick={() => { setShowModal(false); setSubmitted(false); }}></button>
                            </div>
                            <div className="modal-body p-4">
                                {submitted ? (
                                    <div className="text-center py-4">
                                        <i className="fa fa-check-circle text-success fa-4x mb-3 d-block"></i>
                                        <h4>Submission Received!</h4>
                                        <p className="text-muted">Our team will review your item within 48 hours and update the status.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <label className="form-label fw-bold">Item Title *</label>
                                                <input className="form-control" placeholder="e.g. Victorian Mahogany Writing Desk" value={form.title}
                                                    onChange={e => setForm(p => ({ ...p, title: e.target.value }))} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Category *</label>
                                                <select className="form-select" value={form.category}
                                                    onChange={e => setForm(p => ({ ...p, category: e.target.value }))} required>
                                                    <option value="">Select category...</option>
                                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Condition *</label>
                                                <select className="form-select" value={form.condition}
                                                    onChange={e => setForm(p => ({ ...p, condition: e.target.value }))} required>
                                                    <option value="">Select condition...</option>
                                                    {CONDITIONS.map(c => <option key={c}>{c}</option>)}
                                                </select>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-bold">Description *</label>
                                                <textarea className="form-control" rows={3} placeholder="Describe the item, its history, provenance, approximate age..." value={form.description}
                                                    onChange={e => setForm(p => ({ ...p, description: e.target.value }))} required></textarea>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Your Name *</label>
                                                <input className="form-control" placeholder="Full name" value={form.ownerName}
                                                    onChange={e => setForm(p => ({ ...p, ownerName: e.target.value }))} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Your Email *</label>
                                                <input type="email" className="form-control" placeholder="email@example.com" value={form.ownerEmail}
                                                    onChange={e => setForm(p => ({ ...p, ownerEmail: e.target.value }))} required />
                                            </div>
                                            <div className="col-12 mt-2">
                                                <button type="submit" className="btn btn-primary w-100 py-3" disabled={submitting}>
                                                    {submitting ? <><span className="spinner-border spinner-border-sm me-2"></span>Submitting...</> : <><i className="fa fa-paper-plane me-2"></i>Submit to VAULT</>}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
