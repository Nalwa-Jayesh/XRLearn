const gTTS = require('gtts');
const path = require('path');


const textToSpeech = async (req, res) => {
  const { text, lang } = req.body;

  try {
    const gtts = new gTTS(text, lang);
    const options = {
        root: path.join(__dirname, "../")
    };
    const fileName = 'audio.mp3';
    const filePath = 
    gtts.save(fileName, function (err, result) {
      if (err) {
        console.error("Error converting text to speech:", err);
        res.status(500).json({ error: 'Error converting text to speech' });
      } else {
        console.log("Text to speech converted!");

        res.sendFile(fileName, options, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Sent:', fileName);
            }
        });
      }
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: 'Error converting text to speech' });
  }
};

module.exports = {
  textToSpeech,
};
