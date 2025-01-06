import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, mobile, email, message } = req.body;

        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true, // Use SSL (465) or TLS (587)
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        res.status(500).json({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: true, // Use SSL (465) or TLS (587)
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        })
        try {
            await transporter.sendMail({
                from: `"${name}" <${email}>`,
                to: 'suraj12gonda@gmail.com',  // Replace with your recipient email
                subject: `New Contact Form Submission from ${name}`,
                text: message,
                html: `<p><strong>Name:</strong> ${name}</p>
                       <p><strong>Mobile:</strong> ${mobile}</p>
                       <p><strong>Email:</strong> ${email}</p>
                       <p><strong>Message:</strong> ${message}</p>`,
            });

            res.status(200).json({ success: true, message: 'Email sent successfully!' });
        } catch (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Failed to send email.' });
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
