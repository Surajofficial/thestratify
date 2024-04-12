import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";
export default function nav() {
    const router = useRouter();
    return (
        <>  <section id="topbar" className="d-flex align-items-center">
            <div className="container d-flex justify-content-center justify-content-md-between">
                <div className="contact-info d-flex align-items-center">
                    <i className="bi bi-envelope d-flex align-items-center"><Link
                        href="mailto:contact@example.com">contact@stratify.com</Link></i>
                    <i className="bi bi-phone d-flex align-items-center ms-4"><span>+91 9910787343</span></i>
                </div>
                <div className="social-links d-none d-md-flex align-items-center">
                    <Link href="#" className="twitter"><i className="bi bi-twitter"></i></Link>
                    <Link href="#" className="facebook"><i className="bi bi-facebook"></i></Link>
                    <Link href="#" className="instagram"><i className="bi bi-instagram"></i></Link>
                    <Link href="#" className="linkedin"><i className="bi bi-linkedin"></i></Link>
                </div>
            </div>
        </section>

            <header id="header" className="d-flex align-items-center">
                <div className="container d-flex justify-content-between align-items-center">

                    <div className="logo">
                        <Link href="/"> <h1>Stratify</h1></Link>
                    </div>

                    <nav id="navbar" className="navbar">
                        <ul>
                            <li><Link className={router.pathname == "/" ? "active" : ""} href="/">Home</Link></li>
                            <li><Link className={router.pathname == "/about" ? "active" : ""} href="about">About</Link></li>
                            <li><Link className={router.pathname == "/services" ? "active" : ""} href="services">Services</Link></li>
                            <li><Link className={router.pathname == "/portfolio" ? "active" : ""} href="portfolio">Portfolio</Link></li>
                            <li><Link className={router.pathname == "/team" ? "active" : ""} href="team">Team</Link></li>
                            <li><Link className={router.pathname == "/pricing" ? "active" : ""} href="pricing">Pricing</Link></li>
                            <li><Link className={router.pathname == "/blog" ? "active" : ""} href="blog">Blog</Link></li>
                            <li><Link className={router.pathname == "/contact" ? "active" : ""} href="contact">Contact</Link></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>

                </div>
            </header>
        </>
    )
}
