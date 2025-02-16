"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";

interface CertificateDownloaderProps {
  certificateId: string;
  certificateName: string;
  certificateImage: string;
}

export default function CertificateDownloader({
  certificateId,
  certificateName,
  certificateImage,
}: CertificateDownloaderProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    // Load the font
    const font = new FontFace("DM Serif", "url(/fonts/dmserif.ttf)");

    font.load().then((loadedFont) => {
      document.fonts.add(loadedFont);
      setFontLoaded(true);
    });
  }, []);

  const downloadPDF = async () => {
    setIsDownloading(true);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = certificateImage;

    img.onload = () => {
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [3507, 2480],
      });

      // Add the custom font to the PDF
      pdf.addFont("/fonts/dmserif.ttf", "DM Serif", "italic");
      pdf.setFont("CustomSerif");

      // Add the base image
      pdf.addImage(img, "JPEG", 0, 0, 3507, 2480, undefined, "FAST");

      // Add the name text
      pdf.setFontSize(120);
      pdf.setTextColor(0, 0, 0);

      const textX = 3507 * 0.22; // 23% from the left (center of the text area)
      const textY = 2480 * 0.33; // 30% from the top
      const textWidth = 3507 * 0.4; // 40% of the certificate width

      pdf.text(certificateName, textX, textY, {
        align: "center",
        maxWidth: textWidth,
      });

      pdf.save(`certificate-${certificateId}.pdf`);
      setIsDownloading(false);
    };
  };

  return (
    <Button onClick={downloadPDF} disabled={isDownloading || !fontLoaded}>
      {isDownloading ? "Downloading..." : "Download"}
    </Button>
  );
}
