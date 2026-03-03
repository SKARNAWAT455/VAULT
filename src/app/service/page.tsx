import Link from 'next/link';

export default function Service() {
    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5">
                <div className="container py-5">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Service</h1>
                    <nav aria-label="breadcrumb animated slideInDown"></nav>
                </div>
            </div>
            {/* Page Header End */}

            {/* Service Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="section-title text-center">
                        <h1 className="display-5 mb-5">Our Services</h1>
                    </div>
                    <div className="row g-4">
                        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item">
                                <div className="overflow-hidden">
                                    <img className="img-fluid w-100" src="/img/inventory1.jpg" alt="" style={{ height: '300px', objectFit: 'cover' }} />
                                </div>
                                <div className="p-4 text-center border border-5 border-light border-top-0" style={{ height: '220px' }}>
                                    <h4 className="mb-3">Inventory Management</h4>
                                    <p>providing a secure place to store all antiques hence VAULT</p>
                                    <Link className="fw-medium" href="/inventorymanagement">Read More<i className="fa fa-arrow-right ms-2"></i></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item">
                                <div className="overflow-hidden">
                                    <img className="img-fluid w-100" src="/img/magnifying.jpg" alt="" style={{ height: '300px', objectFit: 'cover' }} />
                                </div>
                                <div className="p-4 text-center border border-5 border-light border-top-0" style={{ height: '220px' }}>
                                    <h4 className="mb-3">Antique Prising</h4>
                                    <p>It helps all the user to calculate accurate price for antiques</p>
                                    <Link className="fw-medium" href="/antiqueprising">Read More<i className="fa fa-arrow-right ms-2"></i></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item">
                                <div className="overflow-hidden">
                                    <img className="img-fluid w-100" src="/img/restoration.jpg" alt="" style={{ height: '300px', objectFit: 'cover' }} />
                                </div>
                                <div className="p-4 text-center border border-5 border-light border-top-0" style={{ height: '220px' }}>
                                    <h4 className="mb-3">Restoration</h4>
                                    <p>By restoring the product to all the way to it;s new state</p>
                                    <Link className="fw-medium" href="/restoration">Read More<i className="fa fa-arrow-right ms-2"></i></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.1s">
                            <div className="service-item">
                                <div className="overflow-hidden">
                                    <img className="img-fluid w-100" src="/img/garden.jpg" alt="" style={{ height: '300px', objectFit: 'cover' }} />
                                </div>
                                <div className="p-4 text-center border border-5 border-light border-top-0" style={{ height: '220px' }}>
                                    <h4 className="mb-3">Client Advisory</h4>
                                    <p>By providing best advisory to client so that it helps to ensure clients products</p>
                                    <Link className="fw-medium" href="/clientadvisory">Read More<i className="fa fa-arrow-right ms-2"></i></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.3s">
                            <div className="service-item">
                                <div className="overflow-hidden">
                                    <img className="img-fluid w-100" src="/img/library.jpg" alt="" style={{ height: '300px', objectFit: 'cover' }} />
                                </div>
                                <div className="p-4 text-center border border-5 border-light border-top-0" style={{ height: '220px' }}>
                                    <h4 className="mb-3">One to One Trade</h4>
                                    <p>Introducing the all new one to one trade that is barter system</p>
                                    <Link className="fw-medium" href="/onetoonetrade">Read More<i className="fa fa-arrow-right ms-2"></i></Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-4 wow fadeInUp" data-wow-delay="0.5s">
                            <div className="service-item">
                                <div className="overflow-hidden">
                                    <img className="img-fluid w-100" src="/img/people.jpg" alt="" style={{ height: '300px', objectFit: 'cover' }} />
                                </div>
                                <div className="p-4 text-center border border-5 border-light border-top-0" style={{ height: '220px' }}>
                                    <h4 className="mb-3">Live E-Auction </h4>
                                    <p>providing all new E-auction</p>
                                    <Link className="fw-medium" href="/">Read More<i className="fa fa-arrow-right ms-2"></i></Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Service End */}

            {/* Testimonial Start */}
            <div className="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div className="container">
                    <div className="owl-carousel testimonial-carousel">
                        <div className="testimonial-item text-center">
                            <img className="img-fluid bg-light p-2 mx-auto mb-3" src="/img/testimonial-1.jpg" style={{ width: '90px', height: '90px' }} alt="" />
                            <div className="testimonial-text text-center p-4">
                                <p>Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</p>
                                <h5 className="mb-1">Client Name</h5>
                                <span className="fst-italic">Profession</span>
                            </div>
                        </div>
                        <div className="testimonial-item text-center">
                            <img className="img-fluid bg-light p-2 mx-auto mb-3" src="/img/testimonial-2.jpg" style={{ width: '90px', height: '90px' }} alt="" />
                            <div className="testimonial-text text-center p-4">
                                <p>Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</p>
                                <h5 className="mb-1">Client Name</h5>
                                <span className="fst-italic">Profession</span>
                            </div>
                        </div>
                        <div className="testimonial-item text-center">
                            <img className="img-fluid bg-light p-2 mx-auto mb-3" src="/img/testimonial-3.jpg" style={{ width: '90px', height: '90px' }} alt="" />
                            <div className="testimonial-text text-center p-4">
                                <p>Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</p>
                                <h5 className="mb-1">Client Name</h5>
                                <span className="fst-italic">Profession</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Testimonial End */}
        </>
    );
}
