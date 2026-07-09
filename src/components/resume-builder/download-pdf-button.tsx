"use client";

import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadPdfButtonProps {
  resumeId: string;
}

export function DownloadPdfButton({ resumeId }: DownloadPdfButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleDownload = async () => {
    setErrorMessage(null);
    setIsDownloading(true);

    try {
      const response = await fetch(`/api/pdf/export?resumeId=${resumeId}`);
      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "resume.pdf";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(downloadUrl);
    } catch {
      setErrorMessage("Could not generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-end gap-1">
      <Button onClick={handleDownload} disabled={isDownloading}>
        {isDownloading ? (
          <Loader2 className="mr-2 size-4 animate-spin" />
        ) : (
          <Download className="mr-2 size-4" />
        )}
        {isDownloading ? "Generating..." : "Download PDF"}
      </Button>
      {errorMessage && <p className="text-xs text-destructive">{errorMessage}</p>}
    </div>
  );
}