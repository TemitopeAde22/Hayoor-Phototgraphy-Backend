const nodemailer = require("nodemailer")
const asyncHandler = require("express-async-handler")
const ejs = require("ejs")
const path = require("path")

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false,
    },
})

const correctionMail = asyncHandler(async (req, res) => {
    // Extract variables from req.body
    const {
        firstname,
        lastname,
        phoneNumber,
        email,
        address,
        Date,
        TypeofSession,
        SessionOthers,
        PreferredLocation,
        AdditionalLocationInformation,
        SpecialRequest,
        PackageSelection,
        AdditionalServices,
        PhotoBooth,
    } = req.body

    // Create a user object
    const user = {
        firstname,
        lastname,
        phoneNumber,
        email,
        address,
        Date,
        TypeofSession,
        SessionOthers,
        PreferredLocation,
        AdditionalLocationInformation,
        SpecialRequest,
        PackageSelection,
        AdditionalServices,
        PhotoBooth,
    }

    const url = "../public/css/output.css"
    // Get the path to the email template file
    const templatePath = path.join(__dirname, "../mail", "activationMail.ejs")

    try {
        // Render the email template with ejs
        const html = await ejs.renderFile(templatePath, { user, url })

        const mailOptions = {
            from: process.env.EMAIL, // Use your configured email here
            to: process.env.EMAIL, // Use your configured email here
            subject:
                " Exciting News! New Booking Confirmed for Your Photography Session",
            html,
        }

        const info = await transporter.sendMail(mailOptions)

        console.log("Email sent: " + info.response)
        res.status(200).json({ message: "Your Response has Been Recorded!" })
    } catch (error) {
        console.error("Error sending email:", error)
        res.status(500).json({ message: "Email could not be sent." })
    }
})

module.exports = {
    correctionMail,
}
