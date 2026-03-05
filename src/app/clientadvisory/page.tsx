'use client';

import { useState } from 'react';

const EXPERTS = [
    {
        name: 'Dr. Meera Khanna',
        role: 'Senior Antique Specialist',
        specialty: 'South Asian Art & Furniture',
        exp: '22 years',
        icon: 'fa-user-tie',
        desc: 'Former curator at the National Museum, Delhi. Expert in Mughal and colonial period artifacts.',
    },
    {
        name: 'Arjun Malhotra',
        role: 'Numismatics & Coins Advisor',
        specialty: 'Coins, Seals & Manuscripts',
        exp: '15 years',
        icon: 'fa-coins',
        desc: 'Published researcher and certified by the Indian Numismatic Society. Has advised on over 3,000 coin valuations.',
    },
    {
        name: 'Priya Deshpande',
        role: 'Jewelry & Gemstone Consultant',
        specialty: 'Royal Jewelry & Gemstones',
        exp: '18 years',
        icon: 'fa-gem',
        desc: 'GIA-certified gemologist specializing in Rajasthani and Hyderabadi royal jewelry. Former Christie\'s consultant.',
    },
];

const PACKAGES = [
    {
        tier: 'Bronze',
        price: '₹2,500',
        color: '#cd7f32',
        duration: '30-minute consultation',
        features: [
            'Single item assessment',
            'Written summary report',
            'Market value estimate',
            'Email follow-up Q&A (1 week)',
        ],
    },
    {
        tier: 'Silver',
        price: '₹6,000',
        color: '#aaa',
        duration: '90-minute consultation',
        features: [
            'Up to 5 items assessed',
            'Detailed written report per item',
            'Market comparables included',
            'Buying & selling recommendations',
            'Email follow-up Q&A (1 month)',
        ],
        popular: true,
    },
    {
        tier: 'Gold',
        price: '₹15,000',
        color: '#d4af37',
        duration: 'Full-day consultation',
        features: [
            'Unlimited items assessed',
            'Portfolio management strategy',
            'Authentication referrals',
            'Insurance valuation certificates',
            'Priority access (6 months)',
            'Annual portfolio review',
        ],
    },
];

const ITEM_TYPES = ['Furniture', 'Jewelry & Gemstones', 'Paintings & Art', 'Ceramics', 'Coins & Numismatics', 'Manuscripts', 'Sculptures', 'General Collection', 'Other'];

export default function ClientAdvisory() {
    const [form, setForm] = useState({
        name: '', email: '', phone: '', itemType: '', message: '', preferredDate: '',
    });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setError('');
        try {
            const res = await fetch('/api/advisory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (res.ok) {
                setSubmitted(true);
                setForm({ name: '', email: '', phone: '', itemType: '', message: '', preferredDate: '' });
            } else {
                setError('Submission failed. Please try again.');
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
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Client Advisory</h1>
                </div>
            </div>

            <div className="container-xxl py-5">
                <div className="container">

                    {/* Intro */}
                    <div className="text-center mb-5 wow fadeIn">
                        <h1 className="display-5 mb-3">World-Class Antique Advisory</h1>
                        <p className="text-muted mx-auto" style={{ maxWidth: 640 }}>
                            Our advisory team brings together specialists from every major category of antiques. Whether you're building a collection, planning an estate, or considering a sale — VAULT's advisors are your trusted partners.
                        </p>
                    </div>

                    {/* Expert Profiles */}
                    <div className="section-title text-center mb-4">
                        <h2 className="display-6">Meet Our Specialists</h2>
                    </div>
                    <div className="row g-4 mb-5">
                        {EXPERTS.map(e => (
                            <div key={e.name} className="col-md-4 wow fadeInUp">
                                <div className="border border-5 border-light p-4 text-center h-100">
                                    <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary mx-auto mb-3" style={{ width: 80, height: 80 }}>
                                        <i className={`fa ${e.icon} fa-2x text-white`}></i>
                                    </div>
                                    <h5 className="mb-1">{e.name}</h5>
                                    <p className="text-primary fw-medium small mb-1">{e.role}</p>
                                    <p className="text-muted small mb-2"><i className="fa fa-star text-warning me-1"></i>{e.specialty}</p>
                                    <span className="badge bg-light text-dark mb-3">{e.exp} experience</span>
                                    <p className="text-muted small mb-0">{e.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Packages */}
                    <div className="section-title text-center mb-4">
                        <h2 className="display-6">Advisory Packages</h2>
                        <p className="text-muted mt-2">Choose the level of guidance that suits your needs</p>
                    </div>
                    <div className="row g-4 mb-5 justify-content-center">
                        {PACKAGES.map(pkg => (
                            <div key={pkg.tier} className={`col-md-4 wow fadeInUp`}>
                                <div className={`border-5 p-4 text-center h-100 ${pkg.popular ? 'bg-primary text-white' : 'border border-5 border-light'}`}>
                                    {pkg.popular && <div className="badge bg-warning text-dark mb-2">Most Popular</div>}
                                    <div className="d-flex align-items-center justify-content-center mb-2" style={{ fontSize: '2.5rem' }}>
                                        <span style={{ color: pkg.popular ? '#ffd700' : pkg.color }}>◆</span>
                                    </div>
                                    <h4 className={`mb-1 ${pkg.popular ? 'text-white' : ''}`}>{pkg.tier}</h4>
                                    <p className={`small mb-2 ${pkg.popular ? 'text-white-50' : 'text-muted'}`}>{pkg.duration}</p>
                                    <h2 className={`fw-bold mb-3 ${pkg.popular ? 'text-white' : 'text-primary'}`}>{pkg.price}</h2>
                                    <hr className={pkg.popular ? 'border-white-50' : ''} />
                                    <ul className="list-unstyled text-start">
                                        {pkg.features.map(f => (
                                            <li key={f} className="mb-2">
                                                <i className={`fa fa-check-circle me-2 ${pkg.popular ? 'text-warning' : 'text-primary'}`}></i>
                                                <small>{f}</small>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Booking Form */}
                    <div className="row g-5 align-items-start">
                        <div className="col-lg-5 wow fadeIn">
                            <h2 className="display-6 mb-4">Book a Consultation</h2>
                            <p className="text-muted">Complete the form and our team will confirm your appointment within 24 hours. All consultations are strictly confidential.</p>
                            <div className="d-flex flex-column gap-3 mt-4">
                                {[
                                    { icon: 'fa-shield-alt', text: '100% confidential — your collection details are never shared' },
                                    { icon: 'fa-calendar-check', text: 'Appointments available Mon–Sat, 10am–6pm IST' },
                                    { icon: 'fa-video', text: 'In-person (Pune) or video call available' },
                                    { icon: 'fa-receipt', text: 'You will receive a detailed written report after your session' },
                                ].map(f => (
                                    <div key={f.icon} className="d-flex align-items-start">
                                        <div className="d-flex align-items-center justify-content-center bg-light me-3" style={{ width: 45, height: 45, flexShrink: 0 }}>
                                            <i className={`fa ${f.icon} text-primary`}></i>
                                        </div>
                                        <small className="text-muted pt-1">{f.text}</small>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="col-lg-7 wow fadeIn" data-wow-delay="0.3s">
                            <div className="border border-5 border-light p-4">
                                {submitted ? (
                                    <div className="text-center py-5">
                                        <i className="fa fa-check-circle text-success fa-4x mb-3 d-block"></i>
                                        <h4>Booking Confirmed!</h4>
                                        <p className="text-muted">Our advisory team will contact you within 24 hours to confirm your appointment date and preferred specialist.</p>
                                    </div>
                                ) : (
                                    <form onSubmit={handleSubmit}>
                                        <h5 className="mb-4"><i className="fa fa-calendar-plus text-primary me-2"></i>Schedule Your Session</h5>
                                        <div className="row g-3">
                                            <div className="col-12">
                                                <label className="form-label fw-bold">Full Name *</label>
                                                <input className="form-control" placeholder="Your full name" value={form.name}
                                                    onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Email *</label>
                                                <input type="email" className="form-control" placeholder="you@example.com" value={form.email}
                                                    onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Phone *</label>
                                                <input type="tel" className="form-control" placeholder="+91 XXXXXXXXXX" value={form.phone}
                                                    onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Item / Collection Type *</label>
                                                <select className="form-select" value={form.itemType}
                                                    onChange={e => setForm(p => ({ ...p, itemType: e.target.value }))} required>
                                                    <option value="">Select type...</option>
                                                    {ITEM_TYPES.map(t => <option key={t}>{t}</option>)}
                                                </select>
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label fw-bold">Preferred Date</label>
                                                <input type="date" className="form-control" value={form.preferredDate}
                                                    onChange={e => setForm(p => ({ ...p, preferredDate: e.target.value }))} />
                                            </div>
                                            <div className="col-12">
                                                <label className="form-label fw-bold">Your Message *</label>
                                                <textarea className="form-control" rows={4} placeholder="Tell us about your collection, what advice you're seeking, any specific concerns..."
                                                    value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required></textarea>
                                            </div>
                                            {error && <div className="col-12"><div className="alert alert-danger py-2 mb-0">{error}</div></div>}
                                            <div className="col-12">
                                                <button type="submit" className="btn btn-primary w-100 py-3" disabled={submitting}>
                                                    {submitting ? <><span className="spinner-border spinner-border-sm me-2"></span>Booking...</> : <><i className="fa fa-paper-plane me-2"></i>Book My Consultation</>}
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
