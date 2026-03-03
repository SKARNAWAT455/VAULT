import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Carousel Start */}
      <div className="container-fluid p-0 pb-5">
        <div className="owl-carousel header-carousel position-relative">
          <div className="owl-carousel-item position-relative">
            <img className="img-fluid" src="/img/carousel-1.jpg" alt="" />
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ background: 'rgba(53, 53, 53, .7)' }}>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-8 text-center">
                    <h5 className="text-white text-uppercase mb-3 animated slideInDown"></h5>
                    <h1 className="display-3 text-white animated slideInDown mb-4"></h1>
                    <p className="fs-5 fw-medium text-white mb-4 pb-2"></p>
                    <a href="" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"></a>
                    <a href="" className="btn btn-light py-md-3 px-md-5 animated slideInRight"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="owl-carousel-item position-relative">
            <img className="img-fluid" src="/img/carousel-2.jpg" alt="" />
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ background: 'rgba(53, 53, 53, .7)' }}>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-8 text-center">
                    <h5 className="text-white text-uppercase mb-3 animated slideInDown"></h5>
                    <h1 className="display-3 text-white animated slideInDown mb-4"></h1>
                    <p className="fs-5 fw-medium text-white mb-4 pb-2"></p>
                    <a href="" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"></a>
                    <a href="" className="btn btn-light py-md-3 px-md-5 animated slideInRight"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="owl-carousel-item position-relative">
            <img className="img-fluid" src="/img/carousel-3.jpg" alt="" />
            <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{ background: 'rgba(53, 53, 53, .7)' }}>
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-12 col-lg-8 text-center">
                    <h5 className="text-white text-uppercase mb-3 animated slideInDown"></h5>
                    <h1 className="display-3 text-white animated slideInDown mb-4"></h1>
                    <p className="fs-5 fw-medium text-white mb-4 pb-2"></p>
                    <a href="" className="btn btn-primary py-md-3 px-md-5 me-3 animated slideInLeft"></a>
                    <a href="" className="btn btn-light py-md-3 px-md-5 animated slideInRight"></a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Carousel End */}

      {/* Feature Start */}
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
              <h5>Interactive Auctions</h5>
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
      {/* Feature Start */}

      {/* About Start */}
      <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
        <div className="container about px-lg-0">
          <div className="row g-0 mx-lg-0">
            <div className="col-lg-6 ps-lg-0" style={{ minHeight: '400px' }}>
              <div className="position-relative h-100">
                <img className="position-absolute img-fluid w-100 h-100" src="/img/egypt.jpg" style={{ objectFit: 'cover' }} alt="" />
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
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

      {/* Feature Start */}
      <div className="container-fluid bg-light overflow-hidden my-5 px-lg-0">
        <div className="container feature px-lg-0">
          <div className="row g-0 mx-lg-0">
            <div className="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.5s">
              <div className="p-lg-5 ps-lg-0">
                <div className="section-title text-start">
                  <h1 className="display-5 mb-4">Why Choose Us</h1>
                </div>
                <p className="mb-4 pb-2">By creating a new era of E-auction which provides new exiting features which are mentioned above.By providing Luxury and premiumness to E-Auction to increase the user interraction.</p>
                <div className="row g-4">
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '60px', height: '60px' }}>
                        <i className="fa fa-check fa-2x text-primary"></i>
                      </div>
                      <div className="ms-4">
                        <p className="mb-2">Quality</p>
                        <h5 className="mb-0">Services</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '60px', height: '60px' }}>
                        <i className="fa fa-user-check fa-2x text-primary"></i>
                      </div>
                      <div className="ms-4">
                        <p className="mb-2">Creative</p>
                        <h5 className="mb-0">Designers</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '60px', height: '60px' }}>
                        <i className="fa fa-drafting-compass fa-2x text-primary"></i>
                      </div>
                      <div className="ms-4">
                        <p className="mb-2">Free</p>
                        <h5 className="mb-0">Consultation</h5>
                      </div>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="d-flex align-items-center">
                      <div className="d-flex flex-shrink-0 align-items-center justify-content-center bg-white" style={{ width: '60px', height: '60px' }}>
                        <i className="fa fa-headphones fa-2x text-primary"></i>
                      </div>
                      <div className="ms-4">
                        <p className="mb-2">Customer</p>
                        <h5 className="mb-0">Support 24x7</h5>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 pe-lg-0" style={{ minHeight: '400px' }}>
              <div className="position-relative h-100">
                <img className="position-absolute img-fluid w-100 h-100" src="/img/buddha.jpg" style={{ objectFit: 'cover' }} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Feature End */}

      {/* Projects Start */}
      <div className="container-xxl py-5">
        <div className="container">
          <div className="section-title text-center">
            <h1 className="display-5 mb-5">Our Services</h1>
          </div>
          <div className="row g-4 portfolio-container">
            <div className="col-lg-4 col-md-6 portfolio-item first wow fadeInUp" data-wow-delay="0.1s">
              <div className="rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                  <img className="img-fluid w-100" src="/img/inventory1.jpg" alt="" style={{ height: '250px', objectFit: 'cover' }} />
                  <div className="portfolio-overlay">
                    <Link className="btn btn-square btn-outline-light mx-1" href="/inventorymanagement"><i className="fa fa-link"></i></Link>
                  </div>
                </div>
                <div className="border border-5 border-light border-top-0 p-4" style={{ height: '140px' }}>
                  <p className="text-primary fw-medium mb-2">Inventory Management</p>
                  <h5 className="lh-base mb-0">providing a secure place to store all antiques</h5>
                </div>
              </div>
            </div>
            {/* Missing Cards Added */}
            <div className="col-lg-4 col-md-6 portfolio-item second wow fadeInUp" data-wow-delay="0.3s">
              <div className="rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                  <img className="img-fluid w-100" src="/img/magnifying.jpg" alt="" style={{ height: '250px', objectFit: 'cover' }} />
                  <div className="portfolio-overlay">
                    <Link className="btn btn-square btn-outline-light mx-1" href="/antiqueprising"><i className="fa fa-link"></i></Link>
                  </div>
                </div>
                <div className="border border-5 border-light border-top-0 p-4" style={{ height: '140px' }}>
                  <p className="text-primary fw-medium mb-2">Antique Prising</p>
                  <h5 className="lh-base mb-0">It helps all the user to calculate accurate price for antiques</h5>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item first wow fadeInUp" data-wow-delay="0.5s">
              <div className="rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                  <img className="img-fluid w-100" src="/img/restoration.jpg" alt="" style={{ height: '250px', objectFit: 'cover' }} />
                  <div className="portfolio-overlay">
                    <Link className="btn btn-square btn-outline-light mx-1" href="/restoration"><i className="fa fa-link"></i></Link>
                  </div>
                </div>
                <div className="border border-5 border-light border-top-0 p-4" style={{ height: '140px' }}>
                  <p className="text-primary fw-medium mb-2">Restoration</p>
                  <h5 className="lh-base mb-0">By restoring the product to all the way to its new state</h5>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item second wow fadeInUp" data-wow-delay="0.1s">
              <div className="rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                  <img className="img-fluid w-100" src="/img/garden.jpg" alt="" style={{ height: '250px', objectFit: 'cover' }} />
                  <div className="portfolio-overlay">
                    <Link className="btn btn-square btn-outline-light mx-1" href="/clientadvisory"><i className="fa fa-link"></i></Link>
                  </div>
                </div>
                <div className="border border-5 border-light border-top-0 p-4" style={{ height: '140px' }}>
                  <p className="text-primary fw-medium mb-2">Client Advisory</p>
                  <h5 className="lh-base mb-0">By providing best advisory to client so that it helps to ensure clients products</h5>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item first wow fadeInUp" data-wow-delay="0.3s">
              <div className="rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                  <img className="img-fluid w-100" src="/img/library.jpg" alt="" style={{ height: '250px', objectFit: 'cover' }} />
                  <div className="portfolio-overlay">
                    <Link className="btn btn-square btn-outline-light mx-1" href="/onetoonetrade"><i className="fa fa-link"></i></Link>
                  </div>
                </div>
                <div className="border border-5 border-light border-top-0 p-4" style={{ height: '140px' }}>
                  <p className="text-primary fw-medium mb-2">One to one trade</p>
                  <h5 className="lh-base mb-0">Introducing the all new one to one trade that is barter system</h5>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 portfolio-item second wow fadeInUp" data-wow-delay="0.5s">
              <div className="rounded overflow-hidden">
                <div className="position-relative overflow-hidden">
                  <img className="img-fluid w-100" src="/img/people.jpg" alt="" style={{ height: '250px', objectFit: 'cover' }} />
                  <div className="portfolio-overlay">
                    <Link className="btn btn-square btn-outline-light mx-1" href="/"><i className="fa fa-link"></i></Link>
                  </div>
                </div>
                <div className="border border-5 border-light border-top-0 p-4" style={{ height: '140px' }}>
                  <p className="text-primary fw-medium mb-2">Live E-auction Platform</p>
                  <h5 className="lh-base mb-0">providing all new E-auction</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Projects End */}


    </>
  );
}
