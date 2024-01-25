const nodemailer = require("nodemailer")
const ejs = require("ejs")
const path = require("path")
// const { urlToHttpOptions } = require("url")
require("dotenv").config()

const sendMail = async (options) => {
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT || "587"),
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false, // Disable SSL verification
        },
    })

    const { email, subject, template, data } = options

    // get the path to the email template file
    const templatePath = path.join(__dirname, "../mail", template)

    // render the email template with ejs
    const html = await ejs.renderFile(templatePath, data)

    // send the email
    const mailOption = {
        from: process.env.SMTP_MAIL,
        to: email,
        subject,
        html,
    }

    await transporter.sendMail(mailOption)
}

module.exports = sendMail
