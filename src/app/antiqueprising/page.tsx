'use client';

import { useState } from 'react';

const CATEGORIES = [
    { name: 'Furniture', base: 5000, label: 'Furniture' },
    { name: 'Jewelry', base: 20000, label: 'Jewelry & Accessories' },
    { name: 'Paintings', base: 15000, label: 'Paintings & Art' },
    { name: 'Ceramics', base: 8000, label: 'Ceramics & Pottery' },
    { name: 'Coins', base: 3000, label: 'Coins & Numismatics' },
    { name: 'Manuscripts', base: 25000, label: 'Manuscripts & Books' },
    { name: 'Sculptures', base: 18000, label: 'Sculptures' },
    { name: 'Textiles', base: 6000, label: 'Textiles & Rugs' },
];

const ERA_MULTIPLIERS = [
    { label: 'Less than 50 years', range: '< 50 yrs', mult: 0.8 },
    { label: '50–100 years', range: '50-100 yrs', mult: 1.2 },
    { label: '100–200 years', range: '100-200 yrs', mult: 1.8 },
    { label: '200–500 years', range: '200-500 yrs', mult: 3.0 },
    { label: 'Over 500 years', range: '500+ yrs', mult: 5.5 },
];

const CONDITION_MULTIPLIERS = [
    { label: 'Poor', mult: 0.4 },
    { label: 'Fair', mult: 0.7 },
    { label: 'Good', mult: 1.0 },
    { label: 'Excellent', mult: 1.4 },
    { label: 'Mint', mult: 1.9 },
];

function formatINR(n: number) {
    return '₹' + n.toLocaleString('en-IN');
}

export default function AntiquePricing() {
    const [category, setCategory] = useState(0);
    const [era, setEra] = useState(2);
    const [condition, setCondition] = useState(2);
    const [rarity, setRarity] = useState(5);
    const [provenance, setProvenance] = useState(false);
    const [calculated, setCalculated] = useState(false);

    const calculate = () => {
        setCalculated(true);
    };

    const cat = CATEGORIES[category];
    const eraData = ERA_MULTIPLIERS[era];
    const condData = CONDITION_MULTIPLIERS[condition];

    const baseValue = cat.base;
    const eraMult = eraData.mult;
    const condMult = condData.mult;
    const rarityMult = 1 + (rarity - 1) * 0.12;
    const provMult = provenance ? 1.35 : 1.0;

    const rawEstimate = baseValue * eraMult * condMult * rarityMult * provMult;
    const low = Math.round(rawEstimate * 0.8);
    const high = Math.round(rawEstimate * 1.3);

    const breakdown = [
        { label: 'Category Base Value', value: formatINR(baseValue) },
        { label: `Era Multiplier (${eraData.range})`, value: `×${eraMult}` },
        { label: `Condition (${condData.label})`, value: `×${condMult}` },
        { label: `Rarity Score (${rarity}/10)`, value: `×${rarityMult.toFixed(2)}` },
        { label: 'Provenance Bonus', value: provenance ? '×1.35' : 'None' },
    ];

    return (
        <>
            {/* Page Header */}
            <div className="container-fluid page-header page-header-service py-5 mb-5">
                <div className="container py-5">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Antique Pricing</h1>
                </div>
            </div>

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="section-title text-center mb-5">
                        <h1 className="display-5">Interactive Price Estimator</h1>
                        <p className="text-muted mt-3 mx-auto" style={{ maxWidth: 600 }}>
                            Our intelligent pricing model evaluates your antique across 5 dimensions: category, age, condition, rarity, and documented provenance.
                        </p>
                    </div>

                    <div className="row g-5">
                        {/* Calculator Panel */}
                        <div className="col-lg-7">
                            <div className="border border-5 border-light p-4 p-lg-5">
                                <h4 className="mb-4"><i className="fa fa-sliders-h text-primary me-2"></i>Configure Your Item</h4>

                                {/* Category */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold mb-2">1. Item Category</label>
                                    <div className="row g-2">
                                        {CATEGORIES.map((c, i) => (
                                            <div className="col-6 col-sm-4 col-md-3" key={c.name}>
                                                <button
                                                    className={`btn w-100 btn-sm py-2 ${category === i ? 'btn-primary' : 'btn-outline-secondary'}`}
                                                    style={{ fontSize: '0.78rem' }}
                                                    onClick={() => { setCategory(i); setCalculated(false); }}
                                                >
                                                    {c.name}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Era */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold mb-2">2. Estimated Age</label>
                                    <div className="row g-2">
                                        {ERA_MULTIPLIERS.map((e, i) => (
                                            <div className="col-12 col-sm-6" key={e.label}>
                                                <button
                                                    className={`btn w-100 btn-sm text-start px-3 ${era === i ? 'btn-primary' : 'btn-outline-secondary'}`}
                                                    onClick={() => { setEra(i); setCalculated(false); }}
                                                >
                                                    {e.label}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Condition */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold mb-2">3. Current Condition</label>
                                    <div className="row g-2">
                                        {CONDITION_MULTIPLIERS.map((c, i) => (
                                            <div className="col" key={c.label}>
                                                <button
                                                    className={`btn w-100 btn-sm ${condition === i ? 'btn-primary' : 'btn-outline-secondary'}`}
                                                    onClick={() => { setCondition(i); setCalculated(false); }}
                                                >
                                                    {c.label}
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Rarity */}
                                <div className="mb-4">
                                    <label className="form-label fw-bold mb-1">4. Rarity Score: <span className="text-primary">{rarity}/10</span></label>
                                    <p className="text-muted small mb-2">1 = Very common &nbsp;|&nbsp; 10 = Extremely rare, one-of-a-kind</p>
                                    <input type="range" className="form-range" min={1} max={10} value={rarity}
                                        onChange={e => { setRarity(+e.target.value); setCalculated(false); }} />
                                    <div className="d-flex justify-content-between">
                                        <small className="text-muted">Common</small>
                                        <small className="text-muted">Rare</small>
                                        <small className="text-muted">Extremely Rare</small>
                                    </div>
                                </div>

                                {/* Provenance */}
                                <div className="mb-4">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" id="provCheck" checked={provenance}
                                            onChange={e => { setProvenance(e.target.checked); setCalculated(false); }} style={{ width: '3em', height: '1.5em' }} />
                                        <label className="form-check-label ms-2 fw-bold" htmlFor="provCheck">
                                            5. Has Documented Provenance (certificate, auction record, historical docs) &nbsp;<span className="badge bg-success">+35% bonus</span>
                                        </label>
                                    </div>
                                </div>

                                <button className="btn btn-primary w-100 py-3 mt-2" onClick={calculate} style={{ fontSize: '1.1rem' }}>
                                    <i className="fa fa-calculator me-2"></i>Calculate Estimated Value
                                </button>
                            </div>
                        </div>

                        {/* Results Panel */}
                        <div className="col-lg-5">
                            {calculated ? (
                                <div>
                                    {/* Price Range */}
                                    <div className="bg-primary text-white text-center p-4 p-lg-5 mb-4">
                                        <p className="mb-1 text-white-50 text-uppercase" style={{ letterSpacing: 2, fontSize: '0.8rem' }}>Estimated Market Value</p>
                                        <h2 className="display-5 fw-bold mb-0">{formatINR(low)}</h2>
                                        <p className="my-2 text-white-50">to</p>
                                        <h2 className="display-5 fw-bold mb-0">{formatINR(high)}</h2>
                                        <hr className="border-white-50 my-3" />
                                        <small className="text-white-50">Mid-point estimate: <strong className="text-white">{formatINR(Math.round((low + high) / 2))}</strong></small>
                                    </div>

                                    {/* Breakdown */}
                                    <div className="border border-5 border-light p-4">
                                        <h5 className="mb-3"><i className="fa fa-chart-bar text-primary me-2"></i>Value Breakdown</h5>
                                        {breakdown.map(b => (
                                            <div key={b.label} className="d-flex justify-content-between align-items-center py-2 border-bottom">
                                                <small className="text-muted">{b.label}</small>
                                                <strong style={{ fontSize: '0.9rem' }}>{b.value}</strong>
                                            </div>
                                        ))}
                                        <div className="alert alert-warning mt-3 mb-0 p-3">
                                            <small><i className="fa fa-info-circle me-1"></i>
                                                This is an algorithmic estimate. For official valuations, contact our certified appraisers.
                                            </small>
                                        </div>
                                    </div>

                                    <div className="text-center mt-4">
                                        <a href="/clientadvisory" className="btn btn-outline-primary py-2 px-4">
                                            <i className="fa fa-user-tie me-2"></i>Get Expert Appraisal
                                        </a>
                                    </div>
                                </div>
                            ) : (
                                <div className="border border-5 border-light p-4 p-lg-5 text-center h-100 d-flex flex-column justify-content-center align-items-center">
                                    <i className="fa fa-gem fa-4x text-primary mb-4"></i>
                                    <h4>Configure Your Antique</h4>
                                    <p className="text-muted">Select the category, age, condition, rarity, and provenance on the left, then click Calculate to see the estimated market value.</p>
                                    <div className="row g-3 mt-3 text-start w-100">
                                        {[
                                            { icon: 'fa-tag', text: 'Category pricing based on global auction data' },
                                            { icon: 'fa-history', text: 'Age multipliers aligned with collector demand' },
                                            { icon: 'fa-star', text: 'Condition scoring by certified conservators' },
                                            { icon: 'fa-fingerprint', text: 'Rarity premium based on market scarcity' },
                                        ].map(f => (
                                            <div key={f.icon} className="col-12">
                                                <div className="d-flex align-items-center">
                                                    <div className="d-flex align-items-center justify-content-center bg-light me-3" style={{ width: 40, height: 40, flexShrink: 0 }}>
                                                        <i className={`fa ${f.icon} text-primary`}></i>
                                                    </div>
                                                    <small className="text-muted">{f.text}</small>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="row mt-5">
                        <div className="col-12">
                            <div className="bg-light p-4">
                                <h5><i className="fa fa-balance-scale text-primary me-2"></i>About Our Pricing Methodology</h5>
                                <p className="text-muted mb-0">
                                    VAULT's pricing model is built on data from over 50,000 historical auction results across Christie's, Sotheby's, and leading Indian auction houses. Base values reflect the median hammer price for each category. Age, condition, rarity, and provenance multipliers are calibrated by our panel of certified appraisers. All estimates are indicative and may vary based on current market sentiment, geographic demand, and individual item characteristics. We strongly recommend a formal in-person appraisal for items destined for sale or insurance purposes.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
