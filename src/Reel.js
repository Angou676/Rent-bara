import React, { useState, useEffect, useRef } from 'react';

function Reel() {
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [chunks, setChunks] = useState([]);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  useEffect(() => {
    async function getMedia() {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(mediaStream);
        videoRef.current.srcObject = mediaStream;
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    }
    getMedia();
  }, []);

  const startRecording = () => {
    if (!stream) return;
    const mediaRecorder = new MediaRecorder(stream);
    setChunks([]);
    mediaRecorder.addEventListener('dataavailable', (event) => {
      if (event.data.size > 0) {
        setChunks((prevChunks) => [...prevChunks, event.data]);
      }
    });
    setRecording(true);
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.start();
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;
    if (!recording) return;
    mediaRecorderRef.current.stop();
    setRecording(false);
    const videoBlob = new Blob(chunks, { type: 'video/mp4' });
    const videoUrl = URL.createObjectURL(videoBlob);
    console.log('Video URL:', videoUrl);
  };

  return (
    <div>
      <video ref={videoRef} autoPlay muted />
      <button onClick={startRecording}>Start Recording</button>
      <button onClick={stopRecording}>Stop Recording</button>
    </div>
  );
}

export default Reel;
