const { createTransport } = require('nodemailer');

exports.forgotPassword = async (req, res) => {
    try {
        let transporter =  createTransport({
            host: 'smtp-relay.brevo.com',
            port: 587,
            auth: {
                user: process.env.SMTP_MAIL,
                pass: process.env.SMTP_PASSWORD
            }
        });
        const mailOptions = {
            from: process.env.SMTP_MAIL,
            to: req.body.email,
            subject: 'Forgot Password',
            text: 'This is the mail regarding forget password'
        };
        await transporter.sendMail(mailOptions);
        res.status(200).json("Email sent sucessfully");
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
}