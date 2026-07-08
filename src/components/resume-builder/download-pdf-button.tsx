"use client";

import { useState } from "react";
import { Download, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface DownloadPdfButtonProps {
  resumeId: string;
}

export function DownloadPdfButton({ resumeId }: DownloadPdfButtonProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    setIsDownloading(true);
    setError(null);

    let objectUrl: string | null = null;

    try {
      const response = await fetch(`/api/resumes/${resumeId}/pdf`);

      if (!response.ok) {
        throw new Error("Could not generate your PDF. Please try again in a few moments.");
      }

      const blob = await response.blob();
      objectUrl = window.URL.createObjectURL(blob);

      // Parse metadata filenames securely out of the server's response headers
      const contentDisposition = response.headers.get("Content-Disposition");
      const fileNameMatch = contentDisposition?.match(/filename="(.+)"/);
      const fileName = fileNameMatch?.[1] ?? `resume-${resumeId}.pdf`;

      // Mount a virtual document injection anchor link to prompt a native client save file action
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = fileName;
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
    } catch (err) {
      console.error("[PDF_DOWNLOAD_FAILURE]:", err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred during file assembly.");
    } finally {
      // Free memory allocations by releasing the object url wrapper safely
      if (objectUrl) {
        window.URL.revokeObjectURL(objectUrl);
      }
      setIsDownloading(false);
    }
  }

  return (
    <div className="flex flex-col items-stretch sm:items-end gap-2 max-w-xs sm:max-w-none">
      <Button 
        onClick={handleDownload} 
        disabled={isDownloading}
        className="bg-[#2E6BFF] hover:bg-[#2057DE] text-white font-semibold rounded-xl shadow-sm shadow-blue-500/10 active:scale-[0.99] transition-transform duration-150 transform-gpu h-10 px-4"
      >
        {isDownloading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin text-white/80 transform-gpu" />
            Generating PDF...
          </>
        ) : (
          <>
            <Download className="mr-2 h-4 w-4 stroke-[2.2]" />
            Download as PDF
          </>
        )}
      </Button>

      {/* Exception Error Banner Callout */}
      {error && (
        <div className="flex items-center gap-1.5 text-xs font-medium text-destructive mt-1 transform-gpu animate-in fade-in slide-in-from-top-1 duration-150 sm:justify-end">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}