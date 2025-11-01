import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Camera, RotateCcw, Check, X } from 'lucide-react';
import { showSuccess, showError } from '@/utils/toast';

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onCancel: () => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState<boolean>(false);
  const [triggerCameraRestart, setTriggerCameraRestart] = useState(0); // State to force useEffect re-run

  useEffect(() => {
    let activeStream: MediaStream | null = null; // Use a local variable for the stream within this effect

    const initCamera = async () => {
      setIsCapturing(true);
      setCapturedImage(null); // Clear any previous captured image

      try {
        console.log("Attempting to get user media from useEffect...");
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        console.log("User media obtained from useEffect:", mediaStream);
        activeStream = mediaStream; // Assign to local variable for cleanup
        setStream(mediaStream); // Update state for other parts of the component

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
          console.log("Video srcObject set from useEffect.");
          try {
            await videoRef.current.play();
            console.log("Video playing successfully from useEffect.");
          } catch (playError) {
            console.error("Error playing video from useEffect:", playError);
            showError("Failed to play camera feed. Please check browser settings.");
          }
        } else {
          console.warn("videoRef.current is null when trying to set srcObject from useEffect.");
        }
      } catch (err: any) {
        console.error("Error accessing camera from useEffect:", err);
        let errorMessage = "Failed to access camera. Please ensure permissions are granted.";
        if (err.name === "NotAllowedError") {
          errorMessage = "Camera access denied. Please allow camera access in your browser settings.";
        } else if (err.name === "NotFoundError") {
          errorMessage = "No camera found on this device.";
        } else if (err.name === "NotReadableError") {
          errorMessage = "Camera is already in use by another application.";
        }
        showError(errorMessage);
        onCancel();
      }
    };

    initCamera();

    return () => {
      // Cleanup function: stop the stream when component unmounts
      if (activeStream) { // Use the local variable for cleanup
        console.log("Stopping stream tracks on unmount from useEffect cleanup.");
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onCancel, triggerCameraRestart]); // `triggerCameraRestart` will force re-run when retakePhoto is called.

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Ensure video has loaded metadata to get correct dimensions
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        showError("Camera feed not ready. Please wait a moment and try again.");
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataUrl = canvas.toDataURL('image/png');
        setCapturedImage(imageDataUrl);
        setIsCapturing(false);
        if (stream) {
          console.log("Stopping stream tracks after photo capture.");
          stream.getTracks().forEach(track => track.stop()); // Stop camera stream after capture
          setStream(null); // Clear the stream state after stopping
        }
      }
    }
  };

  const confirmPhoto = () => {
    if (capturedImage) {
      // Convert data URL to Blob, then to File
      const byteString = atob(capturedImage.split(',')[1]);
      const mimeString = capturedImage.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      const file = new File([blob], `captured-photo-${Date.now()}.png`, { type: mimeString });
      onCapture(file);
      showSuccess("Photo captured successfully!");
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    setTriggerCameraRestart(prev => prev + 1); // Increment to trigger useEffect
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full bg-gray-900 text-white">
      {isCapturing && !capturedImage && (
        <video ref={videoRef} className="w-full h-auto max-h-[70vh] object-cover rounded-md mb-4" autoPlay playsInline muted />
      )}
      {capturedImage && (
        <img src={capturedImage} alt="Captured" className="w-full h-auto max-h-[70vh] object-contain rounded-md mb-4" />
      )}
      <canvas ref={canvasRef} className="hidden" />

      <div className="flex space-x-4 mt-4">
        {!capturedImage && isCapturing && (
          <Button
            className="bg-green-600 hover:bg-green-700 text-white text-lg font-semibold px-6 py-3 rounded-full"
            onClick={takePhoto}
            disabled={!stream || videoRef.current?.readyState < 2} // Disable if stream not ready
          >
            <Camera className="h-6 w-6 mr-2" />
            Capture
          </Button>
        )}
        {capturedImage && (
          <>
            <Button
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold px-6 py-3 rounded-full"
              onClick={confirmPhoto}
            >
              <Check className="h-6 w-6 mr-2" />
              Confirm
            </Button>
            <Button
              className="bg-yellow-600 hover:bg-yellow-700 text-white text-lg font-semibold px-6 py-3 rounded-full"
              onClick={retakePhoto}
            >
              <RotateCcw className="h-6 w-6 mr-2" />
              Retake
            </Button>
          </>
        )}
        <Button
          className="bg-red-600 hover:bg-red-700 text-white text-lg font-semibold px-6 py-3 rounded-full"
          onClick={onCancel}
        >
          <X className="h-6 w-6 mr-2" />
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CameraCapture;