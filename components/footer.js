import React, { useState } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function footer() {
    const [email, setEmail] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/newsletter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (data.success) {
            toast.success('Thank you for subscribing!', {
                position: "top-right",
                autoClose: 3000,
            });
            setEmail('');
        } else {
            toast.error('Failed to subscribe. Please try again.', {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };
    return (
        <>
            <footer id="footer">
                <div className="footer-newsletter">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6">
                                <h4>Our Newsletter</h4>
                                <p>Join 5,000+ subscribers who are growing their businesses with our tech insights.</p>
                            </div>
                            <div className="col-lg-6">
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Enter Your Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
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
                                    <li><i className="bx bx-chevron-right"></i> <Link href="/">Home</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="/about">About us</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="/services">Services</Link></li>
                                    {/* <li><i className="bx bx-chevron-right"></i> <Link href="#">Terms of service</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">Privacy policy</Link></li> */}
                                </ul>
                            </div>

                            {/* <div className="col-lg-3 col-md-6 footer-links">
                                <h4>Our Services</h4>
                                <ul>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">Web Design</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">Web Development</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">Product Management</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">Marketing</Link></li>
                                    <li><i className="bx bx-chevron-right"></i> <Link href="#">Graphic Design</Link></li>
                                </ul>
                            </div> */}

                            <div className="col-lg-3 col-md-6 footer-contact">
                                <h4>Contact Us</h4>
                                <p>
                                    <strong>Phone:</strong> +91-7800990208<br />
                                    <strong>Email:</strong> services@thestratify.com<br />
                                </p>
                            </div>

                            <div className="col-lg-3 col-md-6 footer-info">
                                <h3>About Stratify</h3>
                                <p>website and app development services company.</p>
                                <div className="social-links mt-3">
                                    <Link href="https://x.com/the_stratify/" className="twitter" target='_blank'><i className="bi bi-x"></i></Link>
                                    <Link href="https://www.facebook.com/share/1SdWRK44wu/" className="facebook" target='_blank'><i className="bi bi-facebook"></i></Link>
                                    <Link href="https://www.instagram.com/thestratify_/profilecard/?igsh=MXV6Y3lpZXIwM2dmbA==" className="instagram" target='_blank'><i className="bi bi-instagram"></i></Link>
                                    <Link href="https://www.linkedin.com/in/stratify-technology/" className="linkedin" target='_blank'><i className="bi bi-linkedin"></i></Link>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="container">
                    <div className="copyright">
                        &copy;Copyright <strong><span>Startify</span></strong>. All Rights Reserved
                    </div>
                    <div className="credits">
                        Designed by <Link href="https://thestratify.com/" className='text-success fs-100' style={{ 'fontWeight': 900 }}>Startify Technology</Link>
                    </div>
                </div>
            </footer >
            <ToastContainer />
            <a href="#" className="back-to-top d-flex align-items-center justify-content-center"><i className="bi bi-arrow-up-short"></i></a>
            <Script src="assets/vendor/purecounter/purecounter_vanilla.js"></Script>
            <Script src="assets/vendor/isotope-layout/isotope.pkgd.min.js"></Script>
            <Script src="assets/vendor/waypoints/noframework.waypoints.js"></Script>
            <Script src="assets/vendor/php-email-form/validate.js"></Script>
            <Script src="assets/js/main.js"></Script></>
    )
}
