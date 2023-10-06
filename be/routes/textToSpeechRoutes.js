const express = require('express');
const router = express.Router();
const { textToSpeech } = require("../controllers/textToSpeechController");

router.post("/speech", textToSpeech);

module.exports = router;
