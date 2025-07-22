import { useEffect, useRef } from "react";
import ModalService from "@/utils/ModalService";

export default function GlobalModal() {
    const modalRef = useRef(null);
    const modalInstance = useRef(null);
    const autoOpenTimeout = useRef(null);

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
            modalInstance.current = new bootstrap.Modal(modalRef.current, {
                backdrop: true,
                keyboard: true,
            });

            // Register globally
            ModalService.register(modalInstance.current);

            // 👇 Auto open modal after 10 seconds ONLY if not opened manually
            autoOpenTimeout.current = setTimeout(() => {
                if (!ModalService.wasOpened) {
                    ModalService.open();
                    console.log("Auto modal opened");
                }
            }, 10000);

            // Remove backdrop manually if stuck
            modalRef.current.addEventListener("hidden.bs.modal", () => {
                document.body.classList.remove("modal-open");
                const backdrop = document.querySelector(".modal-backdrop");
                if (backdrop) backdrop.remove();
            });
        });

        // Cleanup timeout
        return () => {
            if (autoOpenTimeout.current) {
                clearTimeout(autoOpenTimeout.current);
            }
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const mobile = e.target.mobile.value;
        const email = e.target.email.value;
        const message = e.target.message.value;

        console.log("Form submitted:", { name, mobile, email, message });

        modalInstance.current?.hide();
        e.target.reset();
    };

    return (
        <div
            className="modal fade"
            id="globalModal"
            tabIndex="-1"
            aria-labelledby="globalModalLabel"
            aria-hidden="true"
            ref={modalRef}
        >
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content border-0 shadow-lg rounded-4">
                    <form onSubmit={handleSubmit}>
                        <div className="modal-header bg-primary text-white rounded-top-4 px-4">
                            <h5 className="modal-title fw-semibold" id="globalModalLabel">
                                💬 Let's Talk
                            </h5>
                            <button
                                type="button"
                                className="btn-close btn-close-white"
                                onClick={() => {
                                    ModalService.wasOpened = true; // mark as opened manually
                                    modalInstance.current?.hide();
                                }}
                                aria-label="Close"
                            ></button>
                        </div>

                        <div className="modal-body px-4 py-3 bg-light">
                            <div className="mb-3">
                                <label className="form-label text-primary fw-semibold">
                                    Name <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    className="form-control border-primary"
                                    placeholder="Enter your full name"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-primary fw-semibold">
                                    Mobile <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="mobile"
                                    className="form-control border-primary"
                                    placeholder="Enter your mobile number"
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-primary fw-semibold">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    className="form-control border-primary"
                                    placeholder="Enter your email (optional)"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label text-primary fw-semibold">Message</label>
                                <textarea
                                    name="message"
                                    className="form-control border-primary"
                                    placeholder="Write your message (optional)"
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>

                        <div className="modal-footer px-4 pb-4 justify-content-between">
                            <button
                                type="button"
                                className="btn btn-outline-primary"
                                onClick={() => {
                                    ModalService.wasOpened = true;
                                    modalInstance.current?.hide();
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary px-4 fw-bold shadow-sm"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
