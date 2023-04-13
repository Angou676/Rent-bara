// import React, { useState, useEffect, useRef } from 'react';

// function Reel() {
//     const [stream, setStream] = useState(null);
//     const [recording, setRecording] = useState(false);
//     const [chunks, setChunks] = useState([]);
//     const videoRef = useRef(null);
//     const mediaRecorderRef = useRef(null);

//     useEffect(() => {
//         async function getMedia() {
//             try {
//                 const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//                 setStream(mediaStream);
//                 videoRef.current.srcObject = mediaStream;
//             } catch (error) {
//                 console.error('Error accessing media devices:', error);
//             }
//         }
//         getMedia();
//     }, []);

//     const startRecording = () => {
//         if (!stream) return;
//         const mediaRecorder = new MediaRecorder(stream);
//         setChunks([]);
//         mediaRecorder.addEventListener('dataavailable', (event) => {
//             if (event.data.size > 0) {
//                 setChunks((prevChunks) => [...prevChunks, event.data]);
//             }
//         });
//         setRecording(true);
//         mediaRecorderRef.current = mediaRecorder;
//         mediaRecorder.start();
//     };

//     const videoData = localStorage.getItem('video');
//     if (videoData) {
//         const videoBlob = base64toBlob(videoData, 'video/mp4');
//         const videoUrl = URL.createObjectURL(videoBlob);
//         console.log('Video URL:', videoUrl);
//     }

//     function base64toBlob(base64Data, contentType) {
//         contentType = contentType || '';
//         const sliceSize = 1024;
//         const byteCharacters = atob(base64Data.split(',')[1]);
//         const byteArrays = [];
//         for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
//             const slice = byteCharacters.slice(offset, offset + sliceSize);
//             const byteNumbers = new Array(slice.length);
//             for (let i = 0; i < slice.length; i++) {
//                 byteNumbers[i] = slice.charCodeAt(i);
//             }
//             const byteArray = new Uint8Array(byteNumbers);
//             byteArrays.push(byteArray);
//         }
//         return new Blob(byteArrays, { type: contentType });
//     }


//     const stopRecording = () => {
//         if (!mediaRecorderRef.current) return;
//         if (!recording) return;
//         mediaRecorderRef.current.stop();
//         setRecording(false);
//         const videoBlob = new Blob(chunks, { type: 'video/mp4' });
//         const reader = new FileReader();
//         reader.readAsDataURL(videoBlob);
//         reader.onloadend = () => {
//             const base64data = reader.result;
//             localStorage.setItem('video', base64data);
//             console.log('Video stored in local storage:', base64data);
//         };
//     };


//     return (
//         <div>
//             <video ref={videoRef} autoPlay muted />
//             <button onClick={startRecording}>Start Recording</button>
//             <button onClick={stopRecording}>Stop Recording</button>
//         </div>
//     );
// }

// export default Reel;


// import React, { useState, useRef } from 'react';

// function Reel() {
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);

//     const [isRecording, setIsRecording] = useState(false);
//     const [mediaRecorder, setMediaRecorder] = useState(null);
//     const [chunks, setChunks] = useState([]);

//     const startRecording = () => {
//         navigator.mediaDevices.getUserMedia({ video: true })
//             .then(stream => {
//                 setIsRecording(true);
//                 setChunks([]);

//                 const mediaRecorder = new MediaRecorder(stream);
//                 setMediaRecorder(mediaRecorder);

//                 mediaRecorder.addEventListener('dataavailable', event => {
//                     setChunks(chunks => [...chunks, event.data]);
//                 });

//                 mediaRecorder.start();
//             })
//             .catch(error => console.error(error));
//     };

//     const stopRecording = () => {
//         mediaRecorder.stop();
//         setIsRecording(false);

//         const blob = new Blob(chunks, { type: 'video/mp4' });
//         const videoUrl = URL.createObjectURL(blob);

//         const videoElement = videoRef.current;
//         videoElement.src = videoUrl;
//         videoElement.controls = true;
//     };

//     const applyFilter = () => {
//         const videoElement = videoRef.current;
//         const canvasElement = canvasRef.current;

//         canvasElement.width = videoElement.videoWidth;
//         canvasElement.height = videoElement.videoHeight;

//         const context = canvasElement.getContext('2d');
//         context.filter = 'sepia';
//         context.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);
//         videoElement.src = canvasElement.toDataURL();
//     };

//     return (
//         <div>
//             <video ref={videoRef} autoPlay muted />
//             {isRecording ? (
//                 <button onClick={stopRecording}>Stop Recording</button>
//             ) : (
//                 <button onClick={startRecording}>Start Recording</button>
//             )}
//             <button onClick={applyFilter}>Apply Sepia Filter</button>
//             <canvas ref={canvasRef} style={{ display: 'none' }} />
//         </div>
//     );
// }
// export default Reel


import React, { useState } from 'react';
import VideoRecorder from 'react-video-recorder';

const Reel = () => {
    const [selectedFilter, setSelectedFilter] = useState(null);

    const handleFilterChange = (filter) => {
        setSelectedFilter(filter);
    };

    const handleVideoPreview = (videoBlob) => {
        // do something with the videoBlob, like uploading it to a server or displaying it in a preview window
    };

    return (
        <div>
            <VideoRecorder
                onRecordingComplete={handleVideoPreview}
                renderVideoInput={({ videoInputRef }) => (
                    <video
                        ref={videoInputRef}
                        autoPlay
                        muted={false}
                        onPlaying={() => {
                            const videoElement = videoInputRef.current;
                            const canvasElement = document.createElement('canvas');
                            canvasElement.width = videoElement.videoWidth;
                            canvasElement.height = videoElement.videoHeight;
                            const canvasContext = canvasElement.getContext('2d');
                            const filter = selectedFilter;
                            if (filter) {
                                canvasContext.filter = filter;
                            }

                            const renderFrame = () => {
                                canvasContext.drawImage(videoElement, 0, 0);
                                const imageData = canvasContext.getImageData(
                                    0,
                                    0,
                                    videoElement.videoWidth,
                                    videoElement.videoHeight
                                );
                                canvasContext.putImageData(imageData, 0, 0);
                                requestAnimationFrame(renderFrame);
                            };

                            requestAnimationFrame(renderFrame);
                        }}
                    />
                )}
            />
            <div>
                <button onClick={() => handleFilterChange('blur(5px)')}>Blur</button>
                <button onClick={() => handleFilterChange('grayscale(100%)')}>
                    Grayscale
                </button>
                <button onClick={() => handleFilterChange(null)}>Clear Filter</button>
            </div>
        </div>
    );
};

export default Reel;
