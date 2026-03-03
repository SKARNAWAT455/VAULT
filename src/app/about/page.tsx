
export default function About() {
    return (
        <>
            {/* Page Header Start */}
            <div style={{ backgroundImage: 'url(/img/ABOUTUSIMAGE.jpg)', width: '100%', minHeight: '350px', backgroundSize: 'cover' }}>
                <div className="container py-5">
                    <h1 className="display-3 text-white mb-3 animated slideInDown" style={{ marginLeft: '-50px' }}>About Us</h1>
                    <nav aria-label="breadcrumb animated slideInDown"></nav>
                </div>
            </div>

            {/* Features Start */}
            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">
                        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.1s">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <div className="d-flex align-items-center justify-content-center bg-light" style={{ width: '60px', height: '60px' }}>
                                    <i className="fa fa-user-check fa-2x text-primary"></i>
                                </div>
                                <h1 className="display-1 text-light mb-0">01</h1>
                            </div>
                            <h5>Creative Team</h5>
                        </div>
                        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.3s">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <div className="d-flex align-items-center justify-content-center bg-light" style={{ width: '60px', height: '60px' }}>
                                    <i className="fa fa-check fa-2x text-primary"></i>
                                </div>
                                <h1 className="display-1 text-light mb-0">02</h1>
                            </div>
                            <h5>Quality Products</h5>
                        </div>
                        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.5s">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <div className="d-flex align-items-center justify-content-center bg-light" style={{ width: '60px', height: '60px' }}>
                                    <i className="fa fa-drafting-compass fa-2x text-primary"></i>
                                </div>
                                <h1 className="display-1 text-light mb-0">03</h1>
                            </div>
                            <h5>Free Consultation</h5>
                        </div>
                        <div className="col-md-6 col-lg-3 wow fadeIn" data-wow-delay="0.7s">
                            <div className="d-flex align-items-center justify-content-between mb-2">
                                <div className="d-flex align-items-center justify-content-center bg-light" style={{ width: '60px', height: '60px' }}>
                                    <i className="fa fa-headphones fa-2x text-primary"></i>
                                </div>
                                <h1 className="display-1 text-light mb-0">04</h1>
                            </div>
                            <h5>Customer Support 24x7</h5>
                        </div>
                    </div>
                </div>
            </div>

            {/* About Info Start */}
            <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
                <div className="container about px-lg-0">
                    <div className="row g-0 mx-lg-0">
                        <div className="col-lg-6 ps-lg-0" style={{ minHeight: '400px' }}>
                            <div className="position-relative h-100">
                                <img className="position-absolute img-fluid w-100 h-100" src="/img/megaphone.jpg" style={{ objectFit: 'cover' }} alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 about-text py-5 wow fadeIn" data-wow-delay="0.5s">
                            <div className="p-lg-5 pe-lg-0">
                                <div className="section-title text-start">
                                    <h1 className="display-5 mb-4">About Us</h1>
                                </div>
                                <p className="mb-4 pb-2">Indulge in opulence at your fingertips. Elevate your bidding experience with our exclusive luxury e-auction platform. Unveil a world where sophistication meets the thrill of acquiring the extraordinary. Bid boldly, live lavishly. Your gateway to refined acquisitions begins here.</p>
                                <div className="row g-4 mb-4 pb-2">
                                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.1s">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '60px', height: '60px' }}>
                                                <i className="fa fa-users fa-2x text-primary"></i>
                                            </div>
                                            <div className="ms-3">
                                                <h2 className="text-primary mb-1" data-toggle="counter-up">0</h2>
                                                <p className="fw-medium mb-0">Auction Conducted</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-sm-6 wow fadeIn" data-wow-delay="0.3s">
                                        <div className="d-flex align-items-center">
                                            <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '60px', height: '60px' }}>
                                                <i className="fa fa-check fa-2x text-primary"></i>
                                            </div>
                                            <div className="ms-3">
                                                <h2 className="text-primary mb-1" data-toggle="counter-up">0</h2>
                                                <p className="fw-medium mb-0">Item's Sold</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <a href="#" className="btn btn-primary py-3 px-5">Explore More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
