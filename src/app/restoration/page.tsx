'use client';

import { useState } from 'react';

const BEFORE_AFTER = [
    {
        title: 'Victorian Writing Desk',
        category: 'Furniture',
        beforeDesc: 'Cracked veneer, missing handles, faded lacquer',
        afterDesc: 'Fully restored to original Victorian finish',
        duration: '6 weeks',
    },
    {
        title: 'Ming Dynasty Vase',
        category: 'Ceramics',
        beforeDesc: 'Hairline cracks, chipped rim, discoloured glaze',
        afterDesc: 'Kiln-matched repairs, museum-quality result',
        duration: '10 weeks',
    },
    {
        title: '18th Century Oil Painting',
        category: 'Paintings',
        beforeDesc: 'Canvas tears, yellowed varnish, faded pigments',
        afterDesc: 'Canvas relined, pigments conserved, varnish renewed',
        duration: '8 weeks',
    },
    {
        title: 'Edwardian Gold Brooch',
        category: 'Jewelry',
        beforeDesc: 'Broken clasp, missing stones, tarnished gold',
        afterDesc: 'Stones reset, prongs rebuilt, gold polished',
        duration: '3 weeks',
    },
];

const PROCESS = [
    { icon: 'fa-search', step: '01', title: 'Initial Assessment', desc: 'Our conservators examine the item in person, documenting all damage and determining the restoration scope.' },
    { icon: 'fa-file-contract', step: '02', title: 'Restoration Proposal', desc: 'We send you a detailed proposal outlining techniques, materials, timeline, and cost estimate.' },
    { icon: 'fa-tools', step: '03', title: 'Expert Restoration', desc: 'Specialists use period-appropriate materials and archival techniques to restore the item to its former glory.' },
    { icon: 'fa-camera', step: '04', title: 'Documentation', desc: 'Every stage is photographed and documented. You receive a complete restoration report with before/after photos.' },
    { icon: 'fa-shipping-fast', step: '05', title: 'Secure Return', desc: 'Your restored item is packaged in museum-grade archival materials and returned with a certificate of restoration.' },
];

export default function Restoration() {
    const [form, setForm] = useState({
        itemName: '', description: '', damage: '', ownerName: '', ownerEmail: '', ownerPhone: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const res = await fetch('/api/restoration', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setSubmitted(true);
                setForm({ itemName: '', description: '', damage: '', ownerName: '', ownerEmail: '', ownerPhone: '' });
            } else {
                setError('Failed to submit. Please try again.');
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
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Restoration Services</h1>
                </div>
            </div>

            {/* Intro */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5 align-items-center mb-5">
                        <div className="col-lg-6 wow fadeIn">
                            <div className="section-title text-start">
                                <h1 className="display-5 mb-4">Bringing History Back to Life</h1>
                            </div>
                            <p className="mb-4">Our restoration atelier is staffed by certified conservators trained at leading institutions across Europe and India. We treat every piece as a living document of history — our role is to preserve, not recreate.</p>
                            <div className="row g-3">
                                {[
                                    { icon: 'fa-award', text: 'Certified master conservators' },
                                    { icon: 'fa-flask', text: 'Period-appropriate archival materials' },
                                    { icon: 'fa-clock', text: 'Typical turnaround: 3–12 weeks' },
                                    { icon: 'fa-file-certificate', text: 'Certificate of restoration included' },
                                ].map(f => (
                                    <div className="col-6" key={f.icon}>
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
                                <div className="col-12">
                                    <div className="bg-primary text-white p-4 text-center">
                                        <h2 className="display-4 fw-bold mb-0">500+</h2>
                                        <p className="mb-0 text-white-50">Items Restored</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="border border-5 border-light p-3 text-center">
                                        <h3 className="text-primary fw-bold">12+</h3>
                                        <small className="text-muted">Years of Experience</small>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="border border-5 border-light p-3 text-center">
                                        <h3 className="text-primary fw-bold">98%</h3>
                                        <small className="text-muted">Client Satisfaction</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Before/After Showcase */}
                    <div className="section-title text-center mb-5">
                        <h2 className="display-6">Our Restoration Showcase</h2>
                        <p className="text-muted mt-2">Real transformations by our team</p>
                    </div>
                    <div className="row g-4 mb-5">
                        {BEFORE_AFTER.map((item) => (
                            <div key={item.title} className="col-md-6 col-lg-3 wow fadeInUp">
                                <div className="border border-5 border-light h-100">
                                    <div className="row g-0">
                                        <div className="col-6 p-3 bg-light text-center">
                                            <small className="text-danger d-block fw-bold mb-2">BEFORE</small>
                                            <div className="d-flex align-items-center justify-content-center bg-white" style={{ height: 70 }}>
                                                <i className="fa fa-times-circle text-danger fa-2x"></i>
                                            </div>
                                        </div>
                                        <div className="col-6 p-3 bg-primary text-center">
                                            <small className="text-white d-block fw-bold mb-2">AFTER</small>
                                            <div className="d-flex align-items-center justify-content-center" style={{ height: 70 }}>
                                                <i className="fa fa-check-circle text-white fa-2x"></i>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-3">
                                        <span className="badge bg-secondary text-uppercase mb-2" style={{ fontSize: '0.65rem' }}>{item.category}</span>
                                        <h6 className="mb-2">{item.title}</h6>
                                        <p className="text-muted small mb-1"><strong>Issues:</strong> {item.beforeDesc}</p>
                                        <p className="text-muted small mb-2"><strong>Result:</strong> {item.afterDesc}</p>
                                        <div className="d-flex align-items-center">
                                            <i className="fa fa-clock text-primary me-1 small"></i>
                                            <small className="text-muted">Duration: <strong>{item.duration}</strong></small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Restoration Process */}
                    <div className="section-title text-center mb-5">
                        <h2 className="display-6">Our Restoration Process</h2>
                    </div>
                    <div className="row g-4 mb-5">
                        {PROCESS.map(p => (
                            <div key={p.step} className="col-md-6 col-lg wow fadeInUp">
                                <div className="text-center p-3 border border-5 border-light h-100">
                                    <i className={`fa ${p.icon} fa-2x text-primary mb-3 d-block`}></i>
                                    <h1 className="display-4 text-light fw-bold mb-1">{p.step}</h1>
                                    <h6 className="mb-2">{p.title}</h6>
                                    <p className="text-muted small mb-0">{p.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Request Form */}
                    <div className="row g-5">
                        <div className="col-lg-6">
                            <div className="section-title text-start mb-4">
                                <h2 className="display-6">Request Restoration</h2>
                            </div>
                            <p className="text-muted mb-4">Tell us about your piece and we'll come back with a detailed restoration proposal within 5 business days.</p>
                            <div className="d-flex flex-column gap-3">
                                <div className="d-flex align-items-center p-3 bg-light">
                                    <i className="fa fa-envelope text-primary me-3 fa-lg"></i>
                                    <div><strong>Email:</strong><br /><small className="text-muted">restoration@vaultantiques.in</small></div>
                                </div>
                                <div className="d-flex align-items-center p-3 bg-light">
                                    <i className="fa fa-phone text-primary me-3 fa-lg"></i>
                                    <div><strong>Phone:</strong><br /><small className="text-muted">+91 9307769415</small></div>
                                </div>
                                <div className="d-flex align-items-center p-3 bg-light">
                                    <i className="fa fa-map-marker-alt text-primary me-3 fa-lg"></i>
                                    <div><strong>Studio:</strong><br /><small className="text-muted">Pune, Maharashtra — By appointment</small></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="border border-5 border-light p-4">
                                {submitted ? (
                                    <div className="text-center py-5">
                                        <i className="fa fa-check-circle text-success fa-4x mb-3 d-block"></i>
                                        <h4>Request Received!</h4>
                                        <p className="text-muted">Our restoration team will review your submission and contact you within 5 business days with a detailed proposal.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <h5 className="mb-4"><i className="fa fa-tools text-primary me-2"></i>Restoration Enquiry</h5>
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <label className="form-label fw-bold">Item Name *</label>
                                                <input className="form-control" placeholder="e.g. 1890s Teak Armchair" value={form.itemName}
                                                    onChange={e => setForm(p => ({ ...p, itemName: e.target.value }))} required />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-bold">Item Description *</label>
                                                <textarea className="form-control" rows={2} placeholder="Approximate age, origin, material, style..."
                                                    value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} required></textarea>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-bold">Damage / Issues *</label>
                                                <textarea className="form-control" rows={2} placeholder="Describe cracks, missing parts, stains, structural issues..."
                                                    value={form.damage} onChange={e => setForm(p => ({ ...p, damage: e.target.value }))} required></textarea>
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-bold">Your Name *</label>
                                                <input className="form-control" placeholder="Full name" value={form.ownerName}
                                                    onChange={e => setForm(p => ({ ...p, ownerName: e.target.value }))} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Email *</label>
                                                <input type="email" className="form-control" placeholder="you@example.com" value={form.ownerEmail}
                                                    onChange={e => setForm(p => ({ ...p, ownerEmail: e.target.value }))} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Phone *</label>
                                                <input type="tel" className="form-control" placeholder="+91 XXXXXXXXXX" value={form.ownerPhone}
                                                    onChange={e => setForm(p => ({ ...p, ownerPhone: e.target.value }))} required />
                                            </div>
                                            {error && <div className="col-12"><div className="alert alert-danger py-2 mb-0">{error}</div></div>}
                                            <div className="col-12">
                                                <button type="submit" className="btn btn-primary w-100 py-3" disabled={submitting}>
                                                    {submitting ? <><span className="spinner-border spinner-border-sm me-2"></span>Submitting...</> : <><i className="fa fa-paper-plane me-2"></i>Send Restoration Request</>}
                                                </button>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
