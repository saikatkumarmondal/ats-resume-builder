import Link from "next/link";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";

export function Sidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background lg:flex lg:flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="text-lg font-semibold tracking-tight">
          ResumeForge
        </Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        <SidebarNav />
      </div>
    </aside>
  );
}