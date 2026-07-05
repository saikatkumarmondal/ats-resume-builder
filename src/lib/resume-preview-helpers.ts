import type { SkillEntry } from "@/schemas/skill.schema";

export function formatMonthYear(value: string | undefined): string {
  if (!value) return "";
  const [year, month] = value.split("-");
  if (!year || !month) return value;
  const date = new Date(Number(year), Number(month) - 1);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function stripProtocol(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

export function groupSkillsByCategory(skills: SkillEntry[]): Record<string, string[]> {
  return skills.reduce<Record<string, string[]>>((acc, skill) => {
    acc[skill.category] = [...(acc[skill.category] ?? []), skill.name];
    return acc;
  }, {});
}

export function buildContactLine(
  email?: string,
  phone?: string,
  location?: string
): string[] {
  return [email, phone, location].filter((value): value is string => Boolean(value));
}

export function buildLinkList(
  website?: string,
  linkedin?: string,
  github?: string,
  portfolio?: string
): string[] {
  return [website, linkedin, github, portfolio]
    .filter((value): value is string => Boolean(value))
    .map(stripProtocol);
}