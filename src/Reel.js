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

    const videoData = localStorage.getItem('video');
    if (videoData) {
        const videoBlob = base64toBlob(videoData, 'video/mp4');
        const videoUrl = URL.createObjectURL(videoBlob);
        console.log('Video URL:', videoUrl);
    }

    function base64toBlob(base64Data, contentType) {
        contentType = contentType || '';
        const sliceSize = 1024;
        const byteCharacters = atob(base64Data.split(',')[1]);
        const byteArrays = [];
        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        return new Blob(byteArrays, { type: contentType });
    }


    const stopRecording = () => {
        if (!mediaRecorderRef.current) return;
        if (!recording) return;
        mediaRecorderRef.current.stop();
        setRecording(false);
        const videoBlob = new Blob(chunks, { type: 'video/mp4' });
        const reader = new FileReader();
        reader.readAsDataURL(videoBlob);
        reader.onloadend = () => {
            const base64data = reader.result;
            localStorage.setItem('video', base64data);
            console.log('Video stored in local storage:', base64data);
        };
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
