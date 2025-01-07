import React from 'react'
import Link from 'next/link'
import { useRouter } from "next/router";
import { motion, useSpring, useScroll } from "framer-motion";
export default function nav() {
    const router = useRouter();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    })

    return (
        <>
            <section id="topbar" className="d-flex align-items-center" >
                <div className="container d-flex justify-content-center justify-content-md-between">
                    <div className="contact-info d-flex align-items-center">
                        <div className="d-flex contact">
                            <i className="bi bi-envelope d-flex align-items-center text-white me-1"></i>
                            <Link href="mailto:contact@example.com">contact@stratify.com</Link>
                        </div>
                        <div className="d-flex ms-4 contact">
                            <i className="bi bi-phone d-flex align-items-center text-white me-1"></i>
                            <Link href="tel:+917800990208" >+91-7800990208</Link>
                        </div>
                    </div>
                    <div className="social-links d-none d-md-flex align-items-center">
                        <Link href="https://x.com/the_stratify/" className="twitter" target='_blank'><i className="bi bi-x"></i></Link>
                        <Link href="https://www.facebook.com/share/1SdWRK44wu/" className="facebook" target='_blank'><i className="bi bi-facebook"></i></Link>
                        <Link href="https://www.instagram.com/thestratify_/profilecard/?igsh=MXV6Y3lpZXIwM2dmbA==" target='_blank' className="instagram"><i className="bi bi-instagram"></i></Link>
                        <Link href="https://www.linkedin.com/in/stratify-stratify-95a213344/" target='_blank' className="linkedin"><i className="bi bi-linkedin"></i></Link>
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
                            {/* <li><Link className={router.pathname == "/portfolio" ? "active" : ""} href="portfolio">Portfolio</Link></li> */}
                            {/* <li><Link className={router.pathname == "/team" ? "active" : ""} href="team">Team</Link></li> */}
                            {/* <li><Link className={router.pathname == "/pricing" ? "active" : ""} href="pricing">Pricing</Link></li> */}
                            {/* <li><Link className={router.pathname == "/blog" ? "active" : ""} href="blog">Blog</Link></li> */}
                            <li><Link className={router.pathname == "/contact" ? "active" : ""} href="contact">Contact</Link></li>
                        </ul>
                        <i className="bi bi-list mobile-nav-toggle"></i>
                    </nav>

                </div>
                <motion.div className="progress_bar" style={{ scaleX }} />
            </header>
        </>
    )
}
