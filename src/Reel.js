import React, { useState, useRef } from "react";
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

const Reel = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [recordedVideoUrl, setRecordedVideoUrl] = useState("");
    const [filteredVideoUrl, setFilteredVideoUrl] = useState("");
    const videoRef = useRef(null);
    const chunks = [];


    const startRecording = () => {
        setIsRecording(true);
        setRecordedVideoUrl("");
        setFilteredVideoUrl("");
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                videoRef.current.srcObject = stream;
                videoRef.current.play();
            });
    };

    const stopRecording = async () => {
        setIsRecording(false);
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        videoRef.current.srcObject = null;
        const recordedVideoData = new Blob(chunks, { type: "video/webm" });
        const recordedVideoUrl = URL.createObjectURL(recordedVideoData);
        setRecordedVideoUrl(recordedVideoUrl);
        await applyFilter("negate");
    };

    const applyFilter = async (filterType) => {
        const ffmpeg = createFFmpeg({ log: true });
        await ffmpeg.load();
        ffmpeg.FS("writeFile", "input.webm", await fetchFile(recordedVideoUrl));
        await ffmpeg.run("-i", "input.webm", "-vf", filterType, "output.webm");
        const filteredVideoData = ffmpeg.FS("readFile", "output.webm");
        const filteredVideoUrl = URL.createObjectURL(
            new Blob([filteredVideoData.buffer], { type: "video/webm" })
        );
        setFilteredVideoUrl(filteredVideoUrl);
    };

    return (
        <div>
            <video ref={videoRef} width="640" height="480" muted></video>
            {!isRecording && (
                <button onClick={startRecording}>Start Recording</button>
            )}
            {isRecording && <button onClick={stopRecording}>Stop Recording</button>}
            {recordedVideoUrl && (
                <video src={recordedVideoUrl} width="640" height="480" controls></video>
            )}
            {filteredVideoUrl && (
                <video src={filteredVideoUrl} width="640" height="480" controls></video>
            )}
        </div>
    );
};

export default Reel;
