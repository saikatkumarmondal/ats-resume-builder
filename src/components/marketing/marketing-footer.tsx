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
  return (
    <footer className="border-t border-black/5 bg-white py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 sm:grid-cols-4">
        <div>
          <span className="font-display text-lg font-semibold text-[#0B1226]">
            ResumeForge
          </span>
          <p className="mt-2 text-sm text-[#0B1226]/50">
            Build resumes that get past the bots and in front of humans.
          </p>
        </div>
        {Object.entries(FOOTER_LINKS).map(([section, links]) => (
          <div key={section}>
            <p className="text-sm font-semibold text-[#0B1226]">{section}</p>
            <ul className="mt-3 space-y-2">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-sm text-[#0B1226]/50 hover:text-[#0B1226]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-10 text-center text-xs text-[#0B1226]/40">
        © {new Date().getFullYear()} ResumeForge. Built with Next.js, Prisma, and Gemini.
      </p>
    </footer>
  );
}