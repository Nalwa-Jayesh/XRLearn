import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import * as ml5 from 'ml5';
import axios from 'axios';
import './ObjectDetector.css';
import { useAuthContext } from '../../hooks/useAuthContext';

const ObjectDetector = () => {
    const dimensions = {
        width: 500,
        height: 200,
      };
      const webcamRef = useRef();
      const canvasRef = useRef();
      const [detection, setDetection] = useState('');
      const [isDetecting, setIsDetecting] = useState(false);
      const detectionIntervalRef = useRef(null); // Ref for detectionInterval
      const { width, height } = dimensions;
      const { user } = useAuthContext();
      const objectDetector = ml5.objectDetector('yolo', () => {}); // Declare objectDetector here
    
      const stopDetection = () => {
        setIsDetecting(false);
        if (detectionIntervalRef.current) {
          clearInterval(detectionIntervalRef.current);
        }
      };

  const createCard = async () => {
    try {
      const query = detection.replace(' ', '');
      const res = await axios.get(
        `https://pixabay.com/api/?key=23899455-6b133efefc922b993ef5eae4c&q=${query}`
      );
      const ImageUrl = res.data.hits[2].previewURL;
      const data = {
        name: detection,
        imageUrl: ImageUrl,
      };
      const config = {
        headers: {
          Authorization: user.accessToken,
        },
      };
      const response = await axios.post(
        'http://localhost:4040/api/cards/create',
        data,
        config
      );
      console.log(response);
      setDetection('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const objectDetector = ml5.objectDetector('yolo', () => {});

    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    };
  }, [width, height]);

  const startDetection = () => {
    setIsDetecting(true);
  
    detectionIntervalRef.current = setInterval(() => {
      if (webcamRef.current.video.readyState !== 4) {
        console.warn('Video not ready yet');
        return;
      }
  
      objectDetector.detect(webcamRef.current.video, (err, results) => {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, width, height);
        if (results && results.length) {
          console.log(results);
          results.forEach((detection) => {
            console.log(detection);
            setDetection(detection.label);
            const { label, x, y, width, height } = detection;
            ctx.beginPath();
            ctx.rect(x, y, width, height);
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#ffffff';
            ctx.fillStyle = '#ffffff';
            ctx.stroke();
            ctx.font = '20px Arial';
            ctx.fillText(label, x, y + height + 20);
          });
        }
      });
    }, 200);
  };  

  return (
    <div className="webcam-container">
      <Webcam
        ref={webcamRef}
        className="webcam"
        mirrored={true}
      />
      <canvas ref={canvasRef} className="canvas" />
      {isDetecting ? (
        <button onClick={stopDetection} className="button-33">
          STOP DETECTION
        </button>
      ) : (
        <button onClick={startDetection} className="button-33">
          START DETECTION
        </button>
      )}
      {detection && (
        <div>
          <h2>OBJECT DETECTED : {detection}</h2>
          {!isDetecting && (
            <button onClick={createCard} className="button-33">
              CREATE CARD
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default ObjectDetector;
