const cohere = require('cohere-ai');
require('dotenv').config();

cohere.init(process.env.COHERE_API_KEY);

const summarizeText = async (req, res) => {
  try {
    const { text } = req.body;

    const summaryOptions = {
      text,
      length: 'short',
      format: 'paragraph',
      model: 'summarize-xlarge',
      additional_command: '',
      temperature: 0.3,
    };

    const response = await cohere.summarize(summaryOptions);

    const summary = response.body.summary;
    res.json({ summary });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Error summarizing text' });
  }
};

module.exports = {
  summarizeText,
};
