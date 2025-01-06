import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { email } = req.body;

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true, // Use SSL (465) or TLS (587)
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        try {
            await transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: process.env.EMAIL_TO,  // Replace with your recipient email
                subject: 'New Newsletter Subscription',
                text: `New subscriber: ${email}`,
                html: `<p><strong>Email:</strong> ${email}</p>`,
            });

            res.status(200).json({ success: true, message: 'Subscription successful!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Failed to send email.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
