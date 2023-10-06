import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { useAuthContext } from '../../hooks/useAuthContext';
import { AudioRecorder, useAudioRecorder } from 'react-audio-voice-recorder';

const NewNote = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('');
    const [audioBlob, setAudioBlob] = useState(null);

    const { user } = useAuthContext();

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


      async function handleNoteSubmit() {
        try {
          if (user) {
            console.log("clicked");
            let audioData = null;
      
            // Check if audioBlob is present and read it as a File
            if (audioBlob) {
              const reader = new FileReader();
              reader.onload = (event) => {
                audioData = event.target.result;
                
                // Continue with note creation
                createNoteWithAudio(audioData);
              };
      
              reader.readAsDataURL(audioBlob);
            } else {
              // If no audioBlob, create the note without audio data
              createNoteWithAudio(audioData);
            }
          }
        } catch (error) {
          console.log(error);
        }
      }
      
      async function createNoteWithAudio(audioData) {
        const data = {
          title,
          content,
          audioBlob : audioData // Pass the audio data here
        };
        console.log(data)
        const config = {
          headers: {
            Authorization: user.accessToken
          }
        };
      
        try {
          const response = await axios.post("http://localhost:4040/api/usernotes/create", data, config);
          console.log(response);
          alert("Note Added Successfully");
      
          // Check if audioBlob is present and remove the audio element
          if (audioBlob) {
            const audioDiv = document.getElementById('audio-div');
            audioDiv.removeChild(audioDiv.childNodes[0]);
            setAudioBlob(null);
          }
      
          setTitle('');
          setContent('');
        } catch (error) {
          console.log(error);
        }
      }
      

  return (
    <div>
        <form className="note-form" >
            <input value={title} onChange={(e) => setTitle(e.target.value)} type='text' name='title' placeholder='Enter a title'></input>
            <textarea className='text-area' value={content} onChange={(e) => setContent(e.target.value)} type='text' name='content' placeholder='Enter your content' rows={10} cols={100}>
            </textarea>   
            <AudioRecorder
            onRecordingComplete={(blob) => addAudioElement(blob)}
            recorderControls={recorderControls}
            showVisualizer={true}
            />
            <br />
            <button className="button-33" type="button" onClick={recorderControls.stopRecording}>
                Stop recording
                </button>
            <br />
            <div style={{padding: "1rem", backgroundColor: "aliceblue", borderRadius : "25px"}} id="audio-div"></div>
            <button className='add-note-btn' onClick={handleNoteSubmit} type='button'>ADD</button>
        </form>
    </div>
  )
}

export default NewNote