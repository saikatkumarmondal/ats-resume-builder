export const RESUME_TEMPLATES = [
  { slug: "modern", name: "Modern", description: "Clean and contemporary with bold section headings." },
  { slug: "professional", name: "Professional", description: "Traditional structure favored by recruiters." },
  { slug: "executive", name: "Executive", description: "Formal, elegant layout suited for senior roles." },
  { slug: "minimal", name: "Minimal", description: "Ultra-clean, typography-first design." },
  { slug: "creative", name: "Creative", description: "Subtle color accents — still fully ATS-safe." },
  { slug: "corporate", name: "Corporate", description: "Structured and formal, ideal for enterprise roles." },
] as const;

export type TemplateSlug = (typeof RESUME_TEMPLATES)[number]["slug"];