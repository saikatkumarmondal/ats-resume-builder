"use client";

interface LivePreviewProps {
  fullName: string;
  jobTitle?: string;
  email?: string;
  phone?: string;
  location?: string;
  summary?: string;
}

export function LivePreview({
  fullName,
  jobTitle,
  email,
  phone,
  location,
  summary,
}: LivePreviewProps) {
  const contactLine = [email, phone, location].filter(Boolean).join("  |  ");

  return (
    <div className="mx-auto aspect-[1/1.414] w-full max-w-[600px] bg-white p-8 text-black shadow-sm">
      <h1 className="text-2xl font-bold">{fullName || "Your Name"}</h1>
      {jobTitle && <p className="text-sm text-gray-600">{jobTitle}</p>}
      {contactLine && (
        <p className="mt-1 text-xs text-gray-500">{contactLine}</p>
      )}
      {summary && (
        <div className="mt-4">
          <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-700">
            Summary
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-gray-800">
            {summary}
          </p>
        </div>
      )}
    </div>
  );
}