import React, { useState } from 'react';
import VideoRecorder from 'react-video-recorder';

const Reel = () => {
  const [selectedFilter, setSelectedFilter] = useState(null);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const handleVideoPreview = (videoBlob) => {
    // do something with the videoBlob, like uploading it to a server or displaying it in a preview window huyu
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
