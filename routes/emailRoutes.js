const express = require("express")
const { correctionMail } = require("../controller/emailController")
const router = express.Router()

router.post("/send-mail", correctionMail)

module.exports = router
