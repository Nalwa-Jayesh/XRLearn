import React, { useState, useRef } from "react";
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';
import "./SpeechToText.css"
import axios from 'axios'; 

const SpeechToText = () => {

    const [audioBlob, setAudioBlob] = useState(null);
    const [ transcript, setTranscript ] = useState('');
    const transcriptRef = useRef(null);

    const recorderControls = useAudioRecorder(
        {
          noiseSuppression: true,
          echoCancellation: true,
        },
        (err) => console.table(err) // onNotAllowedOrFound
      );
      const addAudioElement = (blob) => {
        console.log(blob);
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        const audio = document.createElement('audio');
        audio.src = url;
        console.log(url);
        audio.controls = true;
        const audioDiv = document.getElementById('audio-div');
        audioDiv.appendChild(audio);
      };

      const handleCopyClick = async () => {
        const textToCopy = transcriptRef.current.textContent;
        
        try {
          await navigator.clipboard.writeText(textToCopy);
          alert('Text copied to clipboard');
        } catch (error) {
          console.error('Failed to copy text: ', error);
          alert('Failed to copy text to clipboard');
        }
      };

    const handleTranscribe = async () => {
        // Send the audioBlob to your API for transcription using Axios
        if (audioBlob) {
            console.log(audioBlob);
            try {
                // Create a FormData object to send the blob as a file
                const formData = new FormData();
                formData.append('file', audioBlob, 'audio.webm');
    
                // Make an Axios POST request to your backend
                const response = await axios.post('https://xrlearn.onrender.com/api/stt/transcribe', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Important for file uploads
                    },
                });

                // Handle the response from your backend
                console.log('Transcription:', response.data.transcription);
                setTranscript(response?.data?.transcription)
            } catch (error) {
                console.error('Transcription error:', error);
            }
        }
    };

    return (
        <div style={{textAlign : "center", display: 'flex', flexDirection: "column", alignItems : "center", overflowY: "auto", width: "100%"}}>
            <h1>Speech To Text</h1>
            < br/>
            <AudioRecorder
            onRecordingComplete={(blob) => addAudioElement(blob)}
            recorderControls={recorderControls}
            showVisualizer={true}
        />
        <br />
        <button className="button-33" onClick={recorderControls.stopRecording}>Stop recording</button>
        <br />
        <div style={{padding: "1rem", backgroundColor: "aliceblue", borderRadius : "25px"}} id="audio-div"></div>
        {audioBlob && (
                <div style={{marginTop : "2rem"}}>
                    <button className="button-33" onClick={handleTranscribe}>Transcribe</button>
                </div>
            )}
        <div style={{width: "100%", textAlign : "center", display: 'flex', flexDirection: "row", alignItems : "center", justifyContent: "space-around"}}>
            <div className="text-box" ref={transcriptRef}>
               {transcript}
            </div>
            { transcript.length > 0 && <button className="button-33" onClick={handleCopyClick}>Copy</button>}
            </div>
        </div>
    );
}

export default SpeechToText;
