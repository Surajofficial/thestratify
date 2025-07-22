// pages/api/send-modal-form.js
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, mobile, email, message } = req.body;

        if (!name || !mobile) {
            return res.status(400).json({ success: false, message: 'Name and Mobile are required.' });
        }

        try {
            const transporter = nodemailer.createTransport({
                host: process.env.EMAIL_HOST,
                port: process.env.EMAIL_PORT,
                secure: true, // true for 465, false for other ports
                auth: {
                    user: process.env.EMAIL_USER,
                    pass: process.env.EMAIL_PASS,
                },
            });

            await transporter.sendMail({
                from: `"${name}" <developer@awishclinic.com>`,
                to: process.env.EMAIL_TO,
                subject: `New Inquiry via Modal - ${name}`,
                text: message || 'No message provided.',
                html: `
                    <h3>📩 New Inquiry from Modal</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Mobile:</strong> ${mobile}</p>
                    <p><strong>Email:</strong> ${email || 'N/A'}</p>
                    <p><strong>Message:</strong> ${message || 'No message provided.'}</p>
                `,
            });

            res.status(200).json({ success: true, message: 'Modal form email sent successfully!' });
        } catch (error) {
            console.error('Email sending error:', error);
            res.status(500).json({ success: false, message: 'Failed to send email.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
