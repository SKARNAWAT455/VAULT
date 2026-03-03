import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Providers } from '@/components/Providers'
import Script from 'next/script'

export const metadata: Metadata = {
  title: 'VAULT - Luxury Antique E-Auction',
  description: 'Exclusive luxury e-auction platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="/img/favicon.ico" rel="icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500&family=Roboto:wght@500;700;900&display=swap" rel="stylesheet" />
        <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.10.0/css/all.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet" />

        <link href="/lib/animate/animate.min.css" rel="stylesheet" />
        <link href="/lib/owlcarousel/assets/owl.carousel.min.css" rel="stylesheet" />
        <link href="/lib/lightbox/css/lightbox.min.css" rel="stylesheet" />
        <link href="/css/bootstrap.min.css" rel="stylesheet" />
        <link href="/css/style.css" rel="stylesheet" />
        <script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/js/bootstrap.bundle.min.js"></script>
      </head>
      <body>
        {/* Topbar Start */}
        <div className="container-fluid bg-light p-0">
          <div className="row gx-0 d-none d-lg-flex">
            <div className="col-lg-7 px-5 text-start">
              <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                <small className="fa fa-map-marker-alt text-primary me-2"></small>
                <small>Pune ,Maharashra</small>
              </div>
            </div>
            <div className="col-lg-5 px-5 text-end">
              <div className="h-100 d-inline-flex align-items-center py-3 me-4">
                <small className="fa fa-phone-alt text-primary me-2"></small>
                <small>+91 9307769415</small>
              </div>
              <div className="h-100 d-inline-flex align-items-center">
                <a className="btn btn-sm-square bg-white text-primary me-1" href=""><i className="fab fa-facebook-f"></i></a>
                <a className="btn btn-sm-square bg-white text-primary me-1" href=""><i className="fab fa-twitter"></i></a>
                <a className="btn btn-sm-square bg-white text-primary me-1" href=""><i className="fab fa-linkedin-in"></i></a>
                <a className="btn btn-sm-square bg-white text-primary me-0" href=""><i className="fab fa-instagram"></i></a>
              </div>
            </div>
          </div>
        </div>
        {/* Topbar End */}

        <Providers>
          <Navbar />
          {children}
        </Providers>
        <Footer />

        {/* Back to Top */}
        <a href="#" className="btn btn-lg btn-primary btn-lg-square rounded-0 back-to-top" style={{ display: 'none' }}><i className="bi bi-arrow-up"></i></a>

        <Script src="/lib/wow/wow.min.js" strategy="afterInteractive" />
        <Script src="/lib/easing/easing.min.js" strategy="afterInteractive" />
        <Script src="/lib/waypoints/waypoints.min.js" strategy="afterInteractive" />
        <Script src="/lib/counterup/counterup.min.js" strategy="afterInteractive" />
        <Script src="/lib/owlcarousel/owl.carousel.min.js" strategy="afterInteractive" />
        <Script src="/lib/isotope/isotope.pkgd.min.js" strategy="afterInteractive" />
        <Script src="/lib/lightbox/js/lightbox.min.js" strategy="afterInteractive" />
        <Script src="/js/main.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
