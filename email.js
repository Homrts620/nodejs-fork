const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
    host: "smtp.mailgun.org",
    port: 587,
    secure: false,
    auth: {
    user: process.env.M_USER,
    pass: process.env.M_PASS,
},
tls: {
    rejectUnauthorized: false,
},
});

const sendVerificationEmail = async (email, verificationToken) => {
const infoInEmail = {
    from: '"Your Service Test 👻" <your-email@example.com>',
    to: email,
    subject: "Verify your email",
    html: `<a href="http://localhost:${
    process.env.MAIN_PORT || 5000
    }/users/verify/${verificationToken}">Verify your email</a>`,
};

try {
    const info = await transporter.sendMail(infoInEmail);
    console.log(`Verification email sent to ${email}`);
    console.log(`Message ID: ${info.messageId}`);
    console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
} catch (error) {
    console.error(`Error sending email: ${error.message}`);

    throw error;
}
};

module.exports = sendVerificationEmail;