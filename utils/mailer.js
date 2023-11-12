const transporter = require('./_config_mailer.js');

async function sendEmail(to, subject, text) {
    try {
        // Send mail with defined transport object
        const info = await transporter.sendMail({
            from: 'your_email@gmail.com', // Your email
            to,
            subject,
            text
        });

        console.log('Email sent:', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

module.exports = sendEmail;
