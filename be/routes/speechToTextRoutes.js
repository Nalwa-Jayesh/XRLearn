const express = require('express');
const router = express.Router();
const multer = require('multer');
const { speechToText } = require('../controllers/speechToTextController');

const upload = multer();

router.post('/transcribe', upload.single('file'), speechToText);

module.exports = router;
