export default function PrivacyPolicy() {
    const company = "Stratify Technology";
    const brand = company;
    const updated = "10 Sep 2025";

    return (
        <main className="bg-light text-dark">
            <div className="container py-5">
                <header className="mb-4 text-center">
                    <h1 className="display-5 fw-bold">Privacy Policy</h1>
                    <p className="text-muted">Last updated: {updated}</p>
                </header>

                <div className="accordion" id="privacyAccordion">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                            <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne">
                                A quick promise from us
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#privacyAccordion">
                            <div className="accordion-body">
                                Hi! We’re <strong>{brand}</strong>. We build products that respect your time and your data. This Privacy Policy explains what we collect, why we collect it, and how you can stay in control. No legalese overload—just the essentials in plain language.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo">
                                What we collect
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
                            <div className="accordion-body">
                                <ul>
                                    <li><strong>Account details:</strong> name, email, phone and company.</li>
                                    <li><strong>Usage data:</strong> pages visited, device info, approximate location.</li>
                                    <li><strong>Logs & diagnostics:</strong> to debug and improve reliability.</li>
                                    <li><strong>Payments:</strong> processed securely by third parties. No card storage.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree">
                                Why we collect it
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
                            <div className="accordion-body">
                                <ul>
                                    <li>Provide and secure our services.</li>
                                    <li>Personalize your experience and ship better features.</li>
                                    <li>Send important updates and support messages.</li>
                                    <li>Meet legal and compliance requirements.</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseCookies">
                                Cookies & tracking
                            </button>
                        </h2>
                        <div id="collapseCookies" className="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
                            <div className="accordion-body">
                                We use essential cookies to keep you logged in and optional analytics cookies to improve features. You can control cookies in your browser settings.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseSharing">
                                Data sharing
                            </button>
                        </h2>
                        <div id="collapseSharing" className="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
                            <div className="accordion-body">
                                We don’t sell data. We share only with trusted providers for hosting, analytics, payments, and support—under strict confidentiality.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRetention">
                                Data retention
                            </button>
                        </h2>
                        <div id="collapseRetention" className="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
                            <div className="accordion-body">
                                We keep your data only as long as needed. On account closure, we securely delete or anonymize data unless legal requirements demand otherwise.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseRights">
                                Your choices & rights
                            </button>
                        </h2>
                        <div id="collapseRights" className="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
                            <div className="accordion-body">
                                You can access, update, or delete data; opt out of emails; request copies; and exercise GDPR/CCPA rights.
                            </div>
                        </div>
                    </div>

                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseContact">
                                Contact us
                            </button>
                        </h2>
                        <div id="collapseContact" className="accordion-collapse collapse" data-bs-parent="#privacyAccordion">
                            <div className="accordion-body">
                                <address>
                                    <strong>{brand}</strong><br />
                                    Email: <a href={`mailto:support@thestratify.com`}>support@thestratify.com</a>
                                </address>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="mt-5 text-center text-muted">
                    © {new Date().getFullYear()} {brand}. All rights reserved.
                </footer>
            </div>
        </main>
    );
}