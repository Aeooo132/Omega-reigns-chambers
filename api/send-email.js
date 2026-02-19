const nodemailer = require('nodemailer');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    try {
        // 1. Acknowledgment to the Client
        await transporter.sendMail({
            from: `"Omega Reigns Chambers" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Acknowledgement: We have received your inquiry",
            text: `Hello ${name},\n\nThank you for reaching out. This is to acknowledge receipt of your message regarding "${subject}". Our team will review your inquiry and get back to you shortly.\n\nBest regards,\nOmega Reigns Chambers`,
        });

        // 2. Notification to your Personal Email
        await transporter.sendMail({
            from: `"Web Lead" <${process.env.EMAIL_USER}>`,
            to: "ayomideabodunrin05@gmail.com", // Your personal email
            subject: `New Client Inquiry: ${subject}`,
            html: `<h3>New Potential Client Details</h3>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Message:</strong> ${message}</p>`,
        });

        return res.status(200).json({ message: 'Success' });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}