import React, { useState, useEffect } from 'react';
import { ImCancelCircle } from "react-icons/im";

const NotesPreview = ({ isOpen, closeModal, title, content, audioData}) => {

  console.log(audioData)

  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    if (audioData) {
      // Convert Base64-encoded audio data to a blob
      const blob = new Blob([audioData], { type: 'audio/webm;codecs=opus' });

      // Create a URL for the blob
      const url = URL.createObjectURL(blob);

      // Set the URL as the audio source
      setAudioUrl(url);
    }
  }, [audioData]);


  return (
    <>
    <div
      style={{ display: isOpen ? "block" : "none" }}
      className="overlay"
      onClick={closeModal}
    ></div>
    <div style={{ display: isOpen ? "block" : "none" }} className="modal">
      <div className="modal__button">
        <div style={{ cursor : "pointer", fontSize : "28px"}}
          onClick={closeModal}
        ><ImCancelCircle/></div>
      </div>
      <div><b>Title : </b></div>
      <div>{title}</div>
      <div><b>Content : </b></div>
      <div>{content}</div>
      <div>
      {audioUrl ? (
        <audio controls>
          <source src={audioUrl} type="audio/webm;codecs=opus" />
          Your browser does not support the audio element.
        </audio>
      ) : (
        <p>No audio available.</p>
      )}
    </div>
    </div>
  </>
  )
}

export default NotesPreview