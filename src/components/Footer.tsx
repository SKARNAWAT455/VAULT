import Link from "next/link";

export default function Footer() {
    return (
        <div className="container-fluid bg-dark text-light footer mt-5 pt-5 wow fadeIn" data-wow-delay="0.1s">
            <div className="container py-5">
                <div className="row g-5">
                    <div className="col-lg-3 col-md-6">
                        <h4 className="text-light mb-4">Address</h4>
                        <p className="mb-2"><i className="fa fa-map-marker-alt me-3"></i>416118 Sanjay Ghodawat Polytechnic, Atigre</p>
                        <p className="mb-2"><i className="fa fa-phone-alt me-3"></i>+91 9307769415</p>
                        <p className="mb-2"><i className="fa fa-envelope me-3"></i>vault49812@gmail.com</p>
                        <div className="d-flex pt-2">
                            <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-twitter"></i></a>
                            <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-facebook-f"></i></a>
                            <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-youtube"></i></a>
                            <a className="btn btn-outline-light btn-social" href="#"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h4 className="text-light mb-4">Services</h4>
                        <Link className="btn btn-link" href="/inventorymanagement">Inventory Management</Link>
                        <Link className="btn btn-link" href="/antiqueprising">Antique Prising</Link>
                        <Link className="btn btn-link" href="/restoration">Restoration</Link>
                        <Link className="btn btn-link" href="/clientadvisory">Client Advisory</Link>
                        <Link className="btn btn-link" href="/onetoonetrade">One to One Trade</Link>
                        <Link className="btn btn-link" href="/live-auction">Live E-auction</Link>
                    </div>

                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d242118.17005851687!2d73.6981553041223!3d18.52454504095413!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2bf2e67461101%3A0x828d43bf9d9ee343!2sPune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1772123876737!5m2!1sen!2sin"
                        width="100" height="200" style={{ border: 0 }} allowFullScreen={false} loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"></iframe>
                </div>
            </div>
            <div className="container">
                <div className="copyright">
                    <div className="row">
                        <div className="col-md-6 text-center text-md-start mb-3 mb-md-0">
                            &copy; <a className="border-bottom" href="#">VAULT</a>, All Right Reserved.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
