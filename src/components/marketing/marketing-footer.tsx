import Link from "next/link";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Templates", href: "#templates" },
  ],
  Company: [
    { label: "GitHub", href: "https://github.com" },
    { label: "Contact", href: "mailto:support@resumeforge.app" },
  ],
  Legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
  ],
};

export function MarketingFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/60 bg-white pb-12 pt-16 w-full">
      {/* Structural Adaptive Container Block */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 grid grid-cols-2 gap-y-10 gap-x-6 md:grid-cols-5 md:gap-8">
        
        {/* Brand Information Module Block (Spans 2 columns on mobile for text room) */}
        <div className="col-span-2 md:col-span-2 flex flex-col space-y-3">
          <span className="font-display text-lg font-bold tracking-tight text-[#0B1226]">
            ResumeForge
          </span>
          <p className="text-sm text-[#0B1226]/60 max-w-xs leading-relaxed font-normal">
            Build resumes that get past the bots and in front of human eyes.
          </p>
        </div>

        {/* Mapped Dynamic Navigation Link Collections */}
        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
          <div key={section} className="flex flex-col space-y-3.5">
            <h4 className="text-xs font-semibold tracking-wider uppercase text-[#0B1226]/80 select-none">
              {section}
            </h4>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-sm text-[#0B1226]/60 inline-block transition-all duration-200 hover:text-[#2E6BFF] hover:translate-x-0.5 transform-gpu font-medium"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        
      </div>

      {/* Underline Divider Ring */}
      <div className="mx-auto max-w-6xl px-4 sm:px-6 mt-12 pt-6 border-t border-slate-100">
        <p className="text-center text-xs text-[#0B1226]/50 tracking-normal font-normal leading-relaxed">
          © {currentYear} ResumeForge. Built with Next.js, Prisma, and Gemini AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}