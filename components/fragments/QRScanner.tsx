"use client";

import { useParams } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Camera } from "lucide-react";
import jsQR from "jsqr";
import { updatePresenceAction } from "@/app/lib/actions/tickets";
import { toast } from "@/hooks/use-toast";

export default function QRScanner() {
  const [permission, setPermission] = useState<boolean | null>(null);
  const [scannedData, setScannedData] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const { execute } = useAction(updatePresenceAction, {
    onSettled: (actionResult) => {
      toast({
        title:
          actionResult?.result?.data?.status === "success"
            ? "Success"
            : "Failed",
        description: actionResult?.result?.data?.message,
        variant:
          actionResult?.result?.data?.status === "success"
            ? "default"
            : "destructive",
      });
    },
  });

  useEffect(() => {
    if (permission) {
      startCamera();
    }
    return () => stopCamera();
  }, [permission]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsScanning(true);
        requestAnimationFrame(scanQRCode);
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setError("Failed to access camera. Please check permissions.");
      setPermission(false);
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    setIsScanning(false);
  };

  const scanQRCode = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx && video.videoWidth > 0 && video.videoHeight > 0) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);

      if (code) {
        setScannedData(code.data);
        stopCamera();
        execute({ id: code.data }); // Use code.data directly
      } else {
        animationRef.current = requestAnimationFrame(scanQRCode);
      }
    } else {
      animationRef.current = requestAnimationFrame(scanQRCode);
    }
  };

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => track.stop());
      setPermission(true);
    } catch (error) {
      console.error("Error accessing camera:", error);
      setPermission(false);
    }
  };

  const handleScanAgain = () => {
    setScannedData(null);
    setError(null);
    startCamera(); // Restart the camera
  };

  return (
    <div className="container mx-auto max-w-md p-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center">QR Code Scanner</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {scannedData ? (
            <Alert className="mb-4">
              <AlertTitle>QR Code Scanned</AlertTitle>
              <AlertDescription className="break-all">
                {scannedData}
              </AlertDescription>
            </Alert>
          ) : permission === null ? (
            <Button onClick={requestPermission} className="mb-4 w-full">
              <Camera className="mr-2 h-4 w-4" /> Allow Camera Access
            </Button>
          ) : (
            <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden bg-black">
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                controls={false}
                disablePictureInPicture
                controlsList="nofullscreen"
              />
              <canvas ref={canvasRef} className="hidden" />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-2/3 w-2/3 border-2 border-white" />
              </div>
            </div>
          )}
          {scannedData ? (
            <Button onClick={handleScanAgain} className="mt-4 w-full">
              Scan Again
            </Button>
          ) : (
            permission && (
              <Button
                onClick={isScanning ? stopCamera : startCamera}
                className="mt-4 w-full"
              >
                {isScanning ? "Stop Scanning" : "Start Scanning"}
              </Button>
            )
          )}
        </CardContent>
      </Card>
    </div>
  );
}
