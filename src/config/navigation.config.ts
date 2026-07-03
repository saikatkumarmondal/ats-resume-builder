import type { LucideIcon } from "lucide-react";
import {
  LayoutDashboard,
  FileText,
  LayoutTemplate,
  Sparkles,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

export const SIDEBAR_NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Resumes", href: "/resumes", icon: FileText },
  { label: "Templates", href: "/templates", icon: LayoutTemplate },
  { label: "AI Assistant", href: "/ai-assistant", icon: Sparkles },
  { label: "Profile", href: "/profile", icon: User },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Help", href: "/help", icon: HelpCircle },
];