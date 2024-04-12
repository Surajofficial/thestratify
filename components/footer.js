import React from 'react'
import Link from 'next/link'
import Script from 'next/script'
export default function footer() {
    return (
        <>
            <footer id="footer">
                <div className="footer-newsletter">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h4>Our Newsletter</h4>
                                <p>Tamen quem nulla quae legam multos aute sint culpa legam noster magna</p>
                            </div>
                            <div className="col-lg-6">
                                <form action="" method="post">
                                    <input type="email" name="email" />
                                    <input type="submit" value="Subscribe" />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-top">
                    <div className="container">
                        <div className="row">

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Useful Links</h4>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">Home</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">About us</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">Services</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">Terms of service</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">Privacy policy</Link></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Our Services</h4>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">Web Design</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">Web Development</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">Product Management</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">Marketing</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">Graphic Design</Link></li>
                                </ul>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-contact">
                                <h4>Contact Us</h4>
                                <p>
                                    <strong>Phone:</strong> +917800990208<br />
                                    <strong>Email:</strong> info@the.com<br />
                                </p>

                            </div>

                            <div className="col-lg-3 col-md-6 footer-info">
                                <h3>About Stratify</h3>
                                <p>website and app development services company.</p>
                                <div className="social-links mt-3">
                                    <Link href="#" className="twitter"><i className="bx bxl-twitter"></i></Link>
                                    <Link href="#" className="facebook"><i className="bx bxl-facebook"></i></Link>
                                    <Link href="#" className="instagram"><i className="bx bxl-instagram"></i></Link>
                                    <Link href="#" className="google-plus"><i className="bx bxl-skype"></i></Link>
                                    <Link href="#" className="linkedin"><i className="bx bxl-linkedin"></i></Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="copyright">
                        &copy; Copyright <strong><span>Startify</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">

                        Designed by <Link href="https://thestratify.com/">Suraj Tiwari</Link>
                    </div>
                </div>
            </footer>
            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
            <Script src="assets/vendor/purecounter/purecounter_vanilla.js"></Script>
            <Script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></Script>
            <Script src="assets/vendor/waypoints/noframework.waypoints.js"></Script>
            <Script src="assets/vendor/php-email-form/validate.js"></Script>
            <Script src="assets/js/main.js"></Script></>
    )
}
