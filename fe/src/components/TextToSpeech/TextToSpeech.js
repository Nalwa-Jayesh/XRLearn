import React, { useState } from 'react';
import axios from 'axios';

const TextToSpeech = () => {
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleConvertTextToSpeech = () => {
    // Make the API call to your backend
    console.log(text);
    axios
  .post('http://localhost:4040/api/tts/speech', { text }, { responseType: 'blob' })
  .then((response) => {
    // Create a URL for the blob data
    const audioUrl = URL.createObjectURL(response.data);

    // Set the audioUrl in your state or perform further actions
    setAudioUrl(audioUrl);
  })
  .catch((error) => {
    console.error('Error making API call:', error);
  });
  };

  return (
    <div style={{textAlign: "center"}}>
      <h1>Text to Speech</h1>
      <textarea
        placeholder="Enter text to convert to speech"
        value={text}
        onChange={handleTextChange}
        className='text-area'
        rows={30}
        cols={100}
      />
      <button className="button-33" onClick={handleConvertTextToSpeech}>Convert to Speech</button>

      {audioUrl && (
        <audio controls>
          <source src={audioUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </div>
  );
};

export default TextToSpeech;
