import Link from "next/link";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4 py-12">
      <div className="flex w-full flex-col items-center gap-6">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          ResumeForge
        </Link>
        {children}
      </div>
    </div>
  );
}