'use client';

import { useState, useEffect } from 'react';

type Offer = {
    id: string;
    offererName: string;
    offeredItem: string;
    offeredDesc: string;
    wantedItem: string;
    wantedDesc: string;
    status: string;
    createdAt: string;
};

export default function OneToOneTrade() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loadingOffers, setLoadingOffers] = useState(true);
    const [activeTab, setActiveTab] = useState<'browse' | 'post'>('browse');
    const [form, setForm] = useState({
        offererName: '', offererEmail: '',
        offeredItem: '', offeredDesc: '',
        wantedItem: '', wantedDesc: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('/api/trade')
            .then(r => r.json())
            .then(data => { setOffers(Array.isArray(data) ? data : []); setLoadingOffers(false); })
            .catch(() => setLoadingOffers(false));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const res = await fetch('/api/trade', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                const newOffer = await res.json();
                setOffers(prev => [newOffer, ...prev]);
                setSubmitted(true);
                setForm({ offererName: '', offererEmail: '', offeredItem: '', offeredDesc: '', wantedItem: '', wantedDesc: '' });
            } else {
                setError('Failed to post offer. Please try again.');
            }
        } catch {
            setError('Network error. Please try again.');
        }
        setSubmitting(false);
    };

    return (
        <>
            {/* Page Header */}
            <div className="container-fluid page-header page-header-service py-5 mb-5">
                <div className="container py-5">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">One to One Trade</h1>
                </div>
            </div>

            <div className="container-xxl py-5">
                <div className="container">

                    {/* Hero Banner */}
                    <div className="row g-5 align-items-center mb-5">
                        <div className="col-lg-6 wow fadeIn">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">The Art of the Barter</h1>
                            </div>
                            <p className="mb-4 text-muted">
                                VAULT's One-to-One Trade platform revives the ancient tradition of barter — reimagined for the modern collector. No currency changes hands. Instead, you offer a piece from your collection in exchange for one you desire.
                            </p>
                            <p className="text-muted mb-4">
                                Submit your trade offer publicly. If another collector is interested, our advisors facilitate the exchange and provide independent valuations to ensure both parties trade fairly.
                            </p>
                            <div className="row g-3">
                                {[
                                    { icon: 'fa-handshake', text: 'Direct collector-to-collector exchange' },
                                    { icon: 'fa-shield-alt', text: 'VAULT-facilitated for safe and fair trades' },
                                    { icon: 'fa-balance-scale', text: 'Free independent valuation for both items' },
                                    { icon: 'fa-user-secret', text: 'Contact details kept private until match confirmed' },
                                ].map(f => (
                                    <div key={f.icon} className="col-6">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex align-items-center justify-content-center bg-light me-3" style={{ width: 50, height: 50, flexShrink: 0 }}>
                                                <i className={`fa ${f.icon} text-primary`}></i>
                                            </div>
                                            <small>{f.text}</small>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-6 wow fadeIn" data-wow-delay="0.3s">
                            <div className="row g-3">
                                <div className="col-6">
                                    <div className="bg-primary text-white p-4 text-center">
                                        <i className="fa fa-exchange-alt fa-3x mb-3 d-block text-white-50"></i>
                                        <h3 className="fw-bold">O2O</h3>
                                        <p className="mb-0 text-white-50 small">One to One</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="border border-5 border-light p-4 text-center">
                                        <i className="fa fa-users fa-3x mb-3 d-block text-primary"></i>
                                        <h3 className="text-primary fw-bold">{offers.length}</h3>
                                        <p className="mb-0 text-muted small">Active Listings</p>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="border border-5 border-light p-4">
                                        <h6 className="mb-3"><i className="fa fa-info-circle text-primary me-2"></i>How It Works</h6>
                                        <div className="d-flex align-items-start mb-2">
                                            <span className="badge bg-primary me-2 mt-1">1</span>
                                            <small className="text-muted">Post what you're offering and what you want in return</small>
                                        </div>
                                        <div className="d-flex align-items-start mb-2">
                                            <span className="badge bg-primary me-2 mt-1">2</span>
                                            <small className="text-muted">VAULT advisors review and list your offer publicly</small>
                                        </div>
                                        <div className="d-flex align-items-start mb-2">
                                            <span className="badge bg-primary me-2 mt-1">3</span>
                                            <small className="text-muted">Interested collectors contact VAULT to express interest</small>
                                        </div>
                                        <div className="d-flex align-items-start">
                                            <span className="badge bg-primary me-2 mt-1">4</span>
                                            <small className="text-muted">We facilitate valuations, verification, and the exchange</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <ul className="nav nav-tabs mb-4" style={{ borderBottom: '3px solid #e9ecef' }}>
                        <li className="nav-item">
                            <button
                                className={`nav-link fw-bold px-4 py-3 ${activeTab === 'browse' ? 'active text-primary' : 'text-muted'}`}
                                onClick={() => setActiveTab('browse')}
                            >
                                <i className="fa fa-list me-2"></i>Browse Listings ({offers.length})
                            </button>
                        </li>
                        <li className="nav-item">
                            <button
                                className={`nav-link fw-bold px-4 py-3 ${activeTab === 'post' ? 'active text-primary' : 'text-muted'}`}
                                onClick={() => setActiveTab('post')}
                            >
                                <i className="fa fa-plus me-2"></i>Post a Trade Offer
                            </button>
                        </li>
                    </ul>

                    {/* Browse Tab */}
                    {activeTab === 'browse' && (
                        <div>
                            {loadingOffers ? (
                                <div className="text-center py-5"><div className="spinner-border text-primary"></div></div>
                            ) : offers.length === 0 ? (
                                <div className="text-center py-5 border border-5 border-light">
                                    <i className="fa fa-exchange-alt fa-4x text-muted mb-4 d-block"></i>
                                    <h4 className="text-muted">No Active Trade Listings Yet</h4>
                                    <p className="text-muted mb-4">Be the first to post a trade offer!</p>
                                    <button className="btn btn-primary px-4" onClick={() => setActiveTab('post')}>
                                        <i className="fa fa-plus me-2"></i>Post Your First Offer
                                    </button>
                                </div>
                            ) : (
                                <div className="row g-4">
                                    {offers.map(offer => (
                                        <div key={offer.id} className="col-md-6 col-lg-4 wow fadeInUp">
                                            <div className="border border-5 border-light h-100">
                                                {/* Offering */}
                                                <div className="p-3 bg-primary text-white">
                                                    <p className="text-white-50 text-uppercase mb-1" style={{ fontSize: '0.7rem', letterSpacing: 1 }}>Offering</p>
                                                    <h6 className="mb-1 text-white">{offer.offeredItem}</h6>
                                                    <p className="mb-0 text-white-50 small">{offer.offeredDesc.slice(0, 80)}{offer.offeredDesc.length > 80 ? '...' : ''}</p>
                                                </div>
                                                {/* Wants */}
                                                <div className="p-3 bg-light">
                                                    <p className="text-muted text-uppercase mb-1" style={{ fontSize: '0.7rem', letterSpacing: 1 }}>Wants in Return</p>
                                                    <h6 className="mb-1">{offer.wantedItem}</h6>
                                                    <p className="mb-0 text-muted small">{offer.wantedDesc.slice(0, 80)}{offer.wantedDesc.length > 80 ? '...' : ''}</p>
                                                </div>
                                                {/* Footer */}
                                                <div className="p-3 d-flex justify-content-between align-items-center">
                                                    <small className="text-muted"><i className="fa fa-user me-1"></i>{offer.offererName}</small>
                                                    <small className="text-muted">{new Date(offer.createdAt).toLocaleDateString('en-GB')}</small>
                                                </div>
                                                <div className="px-3 pb-3">
                                                    <a href="mailto:trade@vaultantiques.in" className="btn btn-outline-primary w-100 btn-sm py-2">
                                                        <i className="fa fa-envelope me-2"></i>Express Interest via VAULT
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Post Tab */}
                    {activeTab === 'post' && (
                        <div className="row justify-content-center">
                            <div className="col-lg-8">
                                <div className="border border-5 border-light p-4 p-lg-5">
                                    {submitted ? (
                                        <div className="text-center py-5">
                                            <i className="fa fa-check-circle text-success fa-4x mb-3 d-block"></i>
                                            <h4>Trade Offer Posted!</h4>
                                            <p className="text-muted mb-4">Your trade offer is now visible to all collectors on VAULT. When someone is interested, our advisors will reach out to you to facilitate the exchange.</p>
                                            <div className="d-flex justify-content-center gap-3">
                                                <button className="btn btn-primary px-4" onClick={() => { setSubmitted(false); setActiveTab('browse'); }}>
                                                    <i className="fa fa-list me-2"></i>View All Listings
                                                </button>
                                                <button className="btn btn-outline-primary px-4" onClick={() => setSubmitted(false)}>
                                                    <i className="fa fa-plus me-2"></i>Post Another
                                                </button>
                                            </div>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit}>
                                            <h4 className="mb-1"><i className="fa fa-exchange-alt text-primary me-2"></i>Post a Trade Offer</h4>
                                            <p className="text-muted mb-4">Describe what you have and what you're looking for. Be as specific as possible to attract the right match.</p>

                                            <div className="row g-3">
                                                <div className="col-12">
                                                    <div className="alert alert-light border-start border-4 border-primary py-3 mb-0">
                                                        <strong className="text-primary"><i className="fa fa-hand-holding me-2"></i>What You're Offering</strong>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label fw-bold">Item Name *</label>
                                                    <input className="form-control" placeholder="e.g. 1920s Art Deco Diamond Necklace" value={form.offeredItem}
                                                        onChange={e => setForm(p => ({ ...p, offeredItem: e.target.value }))} required />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label fw-bold">Description *</label>
                                                    <textarea className="form-control" rows={3} placeholder="Describe the item: age, material, condition, history, any certifications..."
                                                        value={form.offeredDesc} onChange={e => setForm(p => ({ ...p, offeredDesc: e.target.value }))} required></textarea>
                                                </div>

                                                <div className="col-12 mt-2">
                                                    <div className="alert alert-light border-start border-4 border-success py-3 mb-0">
                                                        <strong className="text-success"><i className="fa fa-search me-2"></i>What You Want in Return</strong>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label fw-bold">Desired Item *</label>
                                                    <input className="form-control" placeholder="e.g. 19th Century Oil Painting, Indian School" value={form.wantedItem}
                                                        onChange={e => setForm(p => ({ ...p, wantedItem: e.target.value }))} required />
                                                </div>
                                                <div className="col-12">
                                                    <label className="form-label fw-bold">Details of What You're Looking For *</label>
                                                    <textarea className="form-control" rows={3} placeholder="Describe the type, style, period, region, or specific requirements..."
                                                        value={form.wantedDesc} onChange={e => setForm(p => ({ ...p, wantedDesc: e.target.value }))} required></textarea>
                                                </div>

                                                <div className="col-12 mt-2">
                                                    <div className="alert alert-light border-start border-4 border-secondary py-3 mb-0">
                                                        <strong><i className="fa fa-user me-2"></i>Your Contact Details</strong>
                                                        <small className="d-block text-muted mt-1">Your email will remain private until VAULT confirms a match.</small>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold">Your Name *</label>
                                                    <input className="form-control" placeholder="Full name" value={form.offererName}
                                                        onChange={e => setForm(p => ({ ...p, offererName: e.target.value }))} required />
                                                </div>
                                                <div className="col-md-6">
                                                    <label className="form-label fw-bold">Your Email *</label>
                                                    <input type="email" className="form-control" placeholder="you@example.com" value={form.offererEmail}
                                                        onChange={e => setForm(p => ({ ...p, offererEmail: e.target.value }))} required />
                                                </div>

                                                {error && <div className="col-12"><div className="alert alert-danger py-2 mb-0">{error}</div></div>}

                                                <div className="col-12 mt-2">
                                                    <button type="submit" className="btn btn-primary w-100 py-3" disabled={submitting}>
                                                        {submitting ? <><span className="spinner-border spinner-border-sm me-2"></span>Posting...</> : <><i className="fa fa-paper-plane me-2"></i>Post Trade Offer</>}
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
