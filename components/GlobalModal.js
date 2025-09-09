import { useEffect, useRef, useState } from "react";
import ModalService from "@/utils/ModalService";

// Minimal inline Bootstrap Toast (no external deps)
function GlobalToast({ message, type = "success", onClose }) {
    const toastRef = useRef(null);

    useEffect(() => {
        let toast;
        import("bootstrap/dist/js/bootstrap.bundle.min.js").then(({ Toast }) => {
            if (!toastRef.current) return;
            toast = new Toast(toastRef.current, { delay: 4000 });
            toast.show();
            toastRef.current.addEventListener("hidden.bs.toast", () => onClose?.());
        });
        return () => {
            if (toastRef.current) {
                toastRef.current.removeEventListener("hidden.bs.toast", onClose);
            }
        };
    }, [onClose]);

    return (
        <div
            ref={toastRef}
            className={`toast align-items-center text-bg-${type} border-0 position-fixed bottom-0 end-0 m-3`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
        >
            <div className="d-flex">
                <div className="toast-body">{message}</div>
                <button
                    type="button"
                    className="btn-close btn-close-white me-2 m-auto"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                ></button>
            </div>
        </div>
    );
}

export default function GlobalModal() {
    const modalRef = useRef(null);
    const modalInstance = useRef(null);
    const autoOpenTimeout = useRef(null);

    // ✅ toast state (new)
    const [toast, setToast] = useState(null); // { message, type }
    const showToast = (message, type = "success") => setToast({ message, type });

    useEffect(() => {
        import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
            modalInstance.current = new bootstrap.Modal(modalRef.current, {
                backdrop: true,
                keyboard: true,
            });

            // Register globally
            ModalService.register(modalInstance.current);

            // Auto open modal after 10 seconds ONLY if not opened manually
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name: e.target.name.value,
            mobile: e.target.mobile.value,
            email: e.target.email.value,
            message: e.target.message.value,
        };

        try {
            const res = await fetch("/api/send-modal-form", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (data.success) {
                // ⬇️ alert removed -> toast instead
                showToast("Form submitted successfully!", "success");
                ModalService.close();
                e.target.reset();
            } else {
                showToast("Something went wrong!", "danger");
            }
        } catch (err) {
            console.error(err);
            showToast("Error while sending form.", "danger");
        }
    };

    return (
        <>
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
                                <h5 className="modal-title fw-semibold d-flex align-items-center gap-2" id="globalModalLabel">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                                        <path d="M8 0a8 8 0 0 0-6.61 12.84c-.2.44-.72 1.48-1.36 2.6a.25.25 0 0 0 .33.34c1.13-.64 2.17-1.16 2.61-1.36A8 8 0 1 0 8 0zm-3.5 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3.5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm3.5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z" />
                                    </svg>
                                    Get Free Consultation
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

            {/* ✅ Toast mount point */}
            {toast && (
                <GlobalToast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                />
            )}
        </>
    );
}
