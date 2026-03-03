'use client';
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <nav className="navbar navbar-expand-lg bg-white navbar-light sticky-top p-0 px-4 px-lg-5">
      <Link href="/" className="navbar-brand d-flex align-items-center">
        <div className="m-0 text-primary d-flex align-items-center">
          <span className="h3 mb-0" style={{ color: "rgb(245, 164, 64)" }}>VA</span>
          <span className="h1 mb-0" style={{ color: "rgb(245, 164, 64)" }}>U</span>
          <span className="h3 mb-0" style={{ color: "rgb(245, 164, 64)" }}>LT</span>
        </div>
      </Link>
      <button type="button" className="navbar-toggler me-4" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="navbar-collapse" id="navbarCollapse">
        <div className="navbar-nav ms-auto p-4 p-lg-0 align-items-center">
          <Link href="/" className={`nav-item nav-link ${pathname === '/' ? 'active' : ''}`}>Home</Link>
          <Link href="/about" className={`nav-item nav-link ${pathname === '/about' ? 'active' : ''}`}>About</Link>
          <Link href="/service" className={`nav-item nav-link ${(pathname === '/service' || pathname === '/inventorymanagement' || pathname === '/restoration' || pathname === '/onetoonetrade' || pathname === '/clientadvisory' || pathname === '/antiqueprising') ? 'active' : ''}`}>Service</Link>
          <Link href="/project" className={`nav-item nav-link ${pathname === '/project' ? 'active' : ''}`}>Upcoming Auction</Link>
          <div className="nav-item dropdown">
            <a href="#" className={`nav-link dropdown-toggle ${pathname === '/whyus' ? 'active' : ''}`} data-bs-toggle="dropdown">Pages</a>
            <div className="dropdown-menu fade-up m-0 border-0 shadow-sm">
              <Link href="/whyus" className={`dropdown-item ${pathname === '/whyus' ? 'active' : ''}`}>Why Us</Link>
            </div>
          </div>
          <Link href="/contact" className={`nav-item nav-link ${pathname === '/contact' ? 'active' : ''}`}>Contact</Link>

          {/* Profile Icon / Login */}
          <div className="nav-item dropdown ms-lg-3">
            {session ? (
              <>
                <a
                  href="#"
                  className="nav-link dropdown-toggle p-0 d-flex align-items-center"
                  data-bs-toggle="dropdown"
                >
                  <div
                    className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                    style={{ width: "40px", height: "40px" }}
                  >
                    {session.user?.name?.[0]?.toUpperCase() || session.user?.email?.[0]?.toUpperCase() || "U"}
                  </div>
                </a>
                <div
                  className="dropdown-menu dropdown-menu-end fade-up m-0 border-0 shadow-sm"
                  style={{ right: 0, left: 'auto' }}
                >
                  <div className="dropdown-header text-dark border-bottom mb-2 pb-2">
                    <strong>{session.user?.name || "User"}</strong>
                    <div className="small text-muted">{session.user?.email}</div>
                  </div>
                  <Link href="/profile" className="dropdown-item">Profile</Link>
                  {(session.user as any).role === 'ADMIN' ? (
                    <Link href="/admin" className="dropdown-item">Dashboard</Link>
                  ) : (
                    <Link href="/my-bids" className="dropdown-item">My Bids</Link>
                  )}
                  <div className="dropdown-divider"></div>
                  <button
                    onClick={() => signOut()}
                    className="dropdown-item text-danger border-0 bg-transparent w-100 text-start"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link href="/login" className="nav-item nav-link p-0">
                <div
                  className="rounded-circle bg-light text-primary d-flex align-items-center justify-content-center border"
                  style={{ width: "40px", height: "40px" }}
                >
                  <i className="fa fa-user"></i>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
