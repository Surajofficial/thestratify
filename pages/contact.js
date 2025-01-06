import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from "framer-motion";
export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        mobile: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const data = await response.json();
        if (data.success) {
            toast.success('Message sent successfully!', {
                position: "top-right",
                autoClose: 3000,
            });
            setFormData({ name: '', mobile: '', email: '', message: '' });
        } else {
            toast.error('Message Failed to sent. Please try again.', {
                position: "top-right",
                autoClose: 3000,
            });
        }
    };

    return (
        <motion.div style={{ opacity: 0 }}
            initial={{ opacity: 0, rotateY: 180 }}
            animate={{ opacity: 1, rotateY: 360 }}
            className="container mt-5 my-5"
            transition={{
                duration: 2
            }}>
            <h1 className="text-center mb-4">Contact Us</h1>
            <form onSubmit={handleSubmit} className="col-md-8 offset-md-2">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Mobile</label>
                    <input
                        type="tel"
                        className="form-control"
                        name="mobile"
                        pattern="[0-9]{10}"
                        placeholder="Enter Mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                        className="form-control"
                        rows="4"
                        name="message"
                        placeholder="Enter Message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>

        </motion.div>
    );
}
