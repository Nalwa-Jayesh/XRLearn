const multer = require('multer');
const FormData = require('form-data');
const { Readable } = require('stream');
const axios = require('axios');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegPath = require('ffmpeg-static');

const bufferToStream = (buffer) => {
    return Readable.from(buffer);
  };

  ffmpeg.setFfmpegPath(ffmpegPath);

const speechToText = async(req,res) => {
    const audioFile = req.file;

  if (!audioFile) {
    res.status(400).json({ message: 'Audio file is required.' });
    return;
  }

  try {
    const audioStream = bufferToStream(audioFile.buffer);

    const formData = new FormData();
    formData.append('file', audioStream, { filename: 'audio.webm', contentType: 'audio/mpeg' });
    formData.append('model', 'whisper-1');
    formData.append('response_format', 'json');
    const config = {
      headers: {
        "Content-Type": `multipart/form-data; boundary=${formData._boundary}`,
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
    };

    const response = await axios.post('https://api.openai.com/v1/audio/transcriptions', formData, config);
    const transcription = response.data.text;

    console.log('Transcription:', transcription);
    res.json({ transcription });
  } catch (error) {
    console.error('API Error Response:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Error transcribing audio' });
  }
}

module.exports = {
    speechToText
}
