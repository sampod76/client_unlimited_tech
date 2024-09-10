import React, { useState, useRef, useEffect } from "react";
import RecordRTC from "recordrtc";
import ReactPlayer from "react-player";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPause,
  FaPlay,
  FaStop,
  FaDownload,
} from "react-icons/fa";
import { MdScreenShare, MdCallEnd } from "react-icons/md";
import { saveAs } from "file-saver";

type MediaType = "video" | "audio";

const RecordRTCApp: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [mediaBlobUrl, setMediaBlobUrl] = useState<string | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [mediaType, setMediaType] = useState<MediaType | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(false);
  const [isCameraOn, setIsCameraOn] = useState<boolean>(true);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [cameras, setCameras] = useState<MediaDeviceInfo[]>([]);
  const [microphones, setMicrophones] = useState<MediaDeviceInfo[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [selectedMicrophone, setSelectedMicrophone] = useState<string | null>(
    null
  );
  const recorderRef = useRef<RecordRTC | null>(null);
  const liveVideoRef = useRef<HTMLVideoElement | null>(null);

  // Fetch the list of available cameras and microphones
  const getAvailableDevices = async () => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const videoDevices = devices.filter(
      (device) => device.kind === "videoinput"
    );
    const audioDevices = devices.filter(
      (device) => device.kind === "audioinput"
    );
    setCameras(videoDevices);
    setMicrophones(audioDevices);
    if (videoDevices.length > 0) setSelectedCamera(videoDevices[0].deviceId);
    if (audioDevices.length > 0)
      setSelectedMicrophone(audioDevices[0].deviceId);
  };

  useEffect(() => {
    getAvailableDevices();
  }, []);

  useEffect(() => {
    if (liveVideoRef.current && mediaStream) {
      liveVideoRef.current.srcObject = mediaStream;
    }
  }, [mediaStream]);

  // Camera recording with selected devices
  const startCameraRecording = async () => {
    try {
      const constraints = {
        video: {
          deviceId: selectedCamera ? { exact: selectedCamera } : undefined,
        },
        audio: {
          deviceId: selectedMicrophone
            ? { exact: selectedMicrophone }
            : undefined,
        },
      };
      const cameraStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      setMediaStream(cameraStream);
      recorderRef.current = new RecordRTC(cameraStream, { type: "video" });
      recorderRef.current.startRecording();
      setMediaType("video");
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting camera recording:", error);
    }
  };

  // Screen Recording with or without audio
  const startScreenRecording = async (recordAudio: boolean) => {
    try {
      const screenStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      if (recordAudio) {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const combinedStream = new MediaStream([
          ...screenStream.getTracks(),
          ...audioStream.getTracks(),
        ]);
        setMediaStream(combinedStream);
        recorderRef.current = new RecordRTC(combinedStream, { type: "video" });
      } else {
        setMediaStream(screenStream);
        recorderRef.current = new RecordRTC(screenStream, { type: "video" });
      }
      recorderRef.current.startRecording();
      setMediaType("video");
      setIsRecording(true);
    } catch (error) {
      console.error("Error starting screen recording:", error);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    await recorderRef.current?.stopRecording(() => {
      const blob = recorderRef.current?.getBlob();
      if (blob) {
        setMediaBlobUrl(URL.createObjectURL(blob));
      }
    });
    mediaStream?.getTracks().forEach((track) => track.stop());
    setMediaStream(null);
  };

  const downloadRecording = () => {
    if (recorderRef.current) {
      const blob = recorderRef.current.getBlob();
      saveAs(blob, `recording.${mediaType === "audio" ? "webm" : "webm"}`);
    }
  };

  // Toggle mute/unmute audio
  const toggleMuteAudio = () => {
    if (mediaStream) {
      mediaStream.getAudioTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsAudioMuted(!isAudioMuted);
    }
  };

  // Toggle camera on/off
  const toggleCamera = () => {
    if (mediaStream) {
      mediaStream.getVideoTracks().forEach((track) => {
        track.enabled = !track.enabled;
      });
      setIsCameraOn(!isCameraOn);
    }
  };

  // Pause/Resume recording
  const togglePauseResumeRecording = () => {
    if (recorderRef.current) {
      if (recorderRef.current.getState() === "paused") {
        recorderRef.current.resumeRecording();
        setIsPaused(false);
      } else {
        recorderRef.current.pauseRecording();
        setIsPaused(true);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
      {/* Device Selection */}
      <div className="mt-4 flex space-x-4">
        {/* Camera Selection Dropdown */}
        <div className="flex flex-col">
          <label
            htmlFor="cameraSelect"
            className="text-sm font-medium text-gray-400 mb-1"
          >
            Camera
          </label>
          <select
            id="cameraSelect"
            value={selectedCamera || ""}
            onChange={(e) => setSelectedCamera(e.target.value)}
            className="px-2 py-1 bg-gray-700 text-white rounded-md"
          >
            {cameras.map((camera) => (
              <option key={camera.deviceId} value={camera.deviceId}>
                {camera.label || `Camera ${camera.deviceId}`}
              </option>
            ))}
          </select>
        </div>

        {/* Microphone Selection Dropdown */}
        <div className="flex flex-col">
          <label
            htmlFor="microphoneSelect"
            className="text-sm font-medium text-gray-400 mb-1"
          >
            Microphone
          </label>
          <select
            id="microphoneSelect"
            value={selectedMicrophone || ""}
            onChange={(e) => setSelectedMicrophone(e.target.value)}
            className="px-2 py-1 bg-gray-700 text-white rounded-md"
          >
            {microphones.map((microphone) => (
              <option key={microphone.deviceId} value={microphone.deviceId}>
                {microphone.label || `Microphone ${microphone.deviceId}`}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="bg-gray-800 p-6 shadow-lg rounded-lg w-full max-w-4xl relative">
        <div className="video-container flex justify-center">
          {isRecording && mediaType === "video" ? (
            <video
              ref={liveVideoRef}
              autoPlay
              muted
              className="w-full h-96 bg-black rounded-md"
            />
          ) : (
            <div className="w-full h-96 bg-black flex items-center justify-center text-lg text-gray-500 rounded-md">
              No video stream
            </div>
          )}
        </div>

        {/* Control Bar */}
        <div className="control-bar mt-4 flex justify-center space-x-6 py-3 bg-gray-700 rounded-md">
          {/* Mute/Unmute */}
          <button onClick={toggleMuteAudio} className="control-button">
            {isAudioMuted ? (
              <FaMicrophoneSlash size={24} />
            ) : (
              <FaMicrophone size={24} />
            )}
          </button>

          {/* Toggle Camera */}
          <button onClick={toggleCamera} className="control-button">
            {isCameraOn ? <FaVideo size={24} /> : <FaVideoSlash size={24} />}
          </button>

          {/* Pause/Resume */}
          <button
            onClick={togglePauseResumeRecording}
            className="control-button"
          >
            {isPaused ? <FaPlay size={24} /> : <FaPause size={24} />}
          </button>

          {/* Stop Recording */}
          <button onClick={stopRecording} className="control-button">
            <FaStop size={24} />
          </button>

          {/* Screen Recording */}
          {!isRecording && (
            <button
              onClick={() => startScreenRecording(true)}
              className="control-button"
            >
              <MdScreenShare size={24} />
            </button>
          )}

          {/* Download Recording */}
          {!isRecording && mediaBlobUrl && (
            <button onClick={downloadRecording} className="control-button">
              <FaDownload size={24} />
            </button>
          )}

          {/* End Call */}
          <button
            onClick={stopRecording}
            className="control-button bg-red-600 hover:bg-red-700 rounded-full p-2"
          >
            <MdCallEnd size={24} />
          </button>
        </div>
      </div>

      {/* Media Preview Section */}
      {!isRecording && mediaBlobUrl && (
        <div className="mt-4 bg-gray-800 p-4 rounded-md w-full max-w-4xl">
          <ReactPlayer
            url={mediaBlobUrl}
            controls
            className="w-full h-64 bg-black rounded-md"
          />
        </div>
      )}
    </div>
  );
};

export default RecordRTCApp;
