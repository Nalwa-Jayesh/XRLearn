import axios from 'axios';
import FormData from 'form-data';
import { Readable } from 'stream';

const bufferToStream = (buffer) => {
    return Readable.from(buffer);
};

const speechToText = async (req, res) => {
    const audioFile = req.file;

    if (!audioFile) {
        res.status(400).json({ message: 'Audio file is required.' });
        return;
    }

    try {
        const audioStream = bufferToStream(audioFile.buffer);

        // Create FormData and append the necessary data
        const data = new FormData();
        data.append('file', audioStream, { filename: 'audio.webm', contentType: 'audio/webm' });
        data.append('model', 'whisper-1');
        data.append('response_format', 'json');

        // Set the configuration for the axios request
        const options = {
            method: 'POST',
            url: 'https://whisper-speech-to-text1.p.rapidapi.com/speech-to-text',
            headers: {
                ...data.getHeaders(),
                'x-rapidapi-key': '379c0edc45msh10f38b1d954267dp1137cfjsn7e7aad92235e',
                'x-rapidapi-host': 'whisper-speech-to-text1.p.rapidapi.com',
            },
            data: data,
        };

        // Make the request to the API
        const response = await axios.request(options);
        const transcription = response.data.text;

        console.log('Transcription:', transcription);
        res.json({ transcription });
    } catch (error) {
        console.error('API Error Response:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: 'Error transcribing audio' });
    }
};

export default speechToText;
