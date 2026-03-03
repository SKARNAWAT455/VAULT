export default function WhyUs() {
    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header page-header-whyus py-5 mb-5">
                <div className="container py-5">
                    <h1 className="display-3 text-white mb-3 animated slideInDown">Why Us</h1>
                    <nav aria-label="breadcrumb animated slideInDown"></nav>
                </div>
            </div>
            {/* Page Header End */}

            {/* Feature Start */}
            <div className="container-fluid bg-light overflow-hidden px-lg-0" style={{ margin: '6rem 0' }}>
                <div className="container feature px-lg-0">
                    <div className="row g-0 mx-lg-0">
                        <div className="col-lg-6 feature-text py-5 wow fadeIn" data-wow-delay="0.5s">
                            <div className="p-lg-5 ps-lg-0">
                                <div className="section-title text-start">
                                    <h1 className="display-5 mb-4">Why Choose Us</h1>
                                </div>
                                <p className="mb-4 pb-2">
                                    In considering our services, several distinctive attributes set us apart and make us the optimal choice. First and foremost, our unwavering commitment to excellence defines our approach. We consistently deliver unparalleled quality, ensuring that our clients receive nothing short of the finest solutions.
                                    <br /><br />
                                    Moreover, our team of seasoned professionals stands as a testament to our dedication to expertise. With a wealth of experience and a deep reservoir of knowledge, we bring a level of proficiency that is unparalleled in the industry. This allows us to navigate complexities with finesse, offering innovative and effective solutions that exceed expectations.
                                    <br /><br />
                                    At the core of our ethos is a steadfast focus on client satisfaction. We understand that each client is unique, and we tailor our services to meet their specific needs and aspirations. This client-centric approach not only fosters enduring relationships but also ensures the success and prosperity of those we serve.
                                    <br /><br />
                                    Furthermore, our unwavering commitment to innovation positions us as pioneers in our field. We are consistently at the forefront of industry trends, leveraging cutting-edge technologies and methodologies to provide solutions that are not only current but also forward-thinking.
                                    <br /><br />
                                    In choosing us, you are selecting a partner dedicated to your success, armed with a proven track record, a wealth of expertise, and an unwavering commitment to excellence. We invite you to experience the unparalleled value that sets us apart in the realm of exceptional service provision.
                                </p>
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
                                                <p className="mb-2">Quality</p>
                                                <h5 className="mb-0">Auctions</h5>
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
                                                <h5 className="mb-0">Support 24X7</h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 pe-lg-0" style={{ minHeight: '400px' }}>
                            <div className="position-relative h-100">
                                <img className="position-absolute img-fluid w-100 h-100" src="/img/scripture1.jpg" style={{ objectFit: 'cover' }} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Feature End */}
        </>
    );
}
