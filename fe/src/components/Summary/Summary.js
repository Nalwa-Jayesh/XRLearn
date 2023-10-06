import axios from 'axios';
import React, { useState, useRef } from 'react'

const Summary = () => {
  const [text, setText] = useState('');
  const [ summary, setSummary] = useState('')
  const summaryRef = useRef();

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSummary = async() => {
    try {
      const res = await axios.post("http://localhost:4040/api/summary/summarize", {text})
    if (!res) {
      console.log("Error sending request")
    }
    console.log(res?.data?.summary)
    setSummary(res?.data?.summary)
    } catch(error) {
      console.log(error)
    }
  }

  const handleCopyClick = async () => {
    const textToCopy = summaryRef.current.textContent;
    
    try {
      await navigator.clipboard.writeText(textToCopy);
      alert('Text copied to clipboard');
    } catch (error) {
      console.error('Failed to copy text: ', error);
      alert('Failed to copy text to clipboard');
    }
  };
  
  return (
    <div style={{textAlign : "center", display: 'flex', flexDirection: "column", alignItems : "center", overflowY: "auto", width: "100%"}}>
      <h1>Summary</h1>
      <textarea
        placeholder="Enter text to summarize"
        value={text}
        onChange={handleTextChange}
        className='text-area'
        rows={30}
        cols={150}
      />
      <button className="button-33" onClick={handleSummary}>Summarize</button>
      <div style={{width: "100%", textAlign : "center", display: 'flex', flexDirection: "row", alignItems : "center", justifyContent: "space-around"}}>
        <div ref={summaryRef} className='text-box'>
          {summary}
        </div>
        {summary.length > 0 && <button className="button-33" onClick={handleCopyClick}>Copy</button>}
      </div>
    </div>
  )
}

export default Summary