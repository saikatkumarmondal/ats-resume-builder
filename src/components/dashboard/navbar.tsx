import { Search } from "lucide-react";
import { MobileSidebar } from "@/components/dashboard/mobile-sidebar";
import { DashboardBreadcrumb } from "@/components/dashboard/dashboard-breadcrumb";
import { ProfileMenu } from "@/components/dashboard/profile-menu";
import { Input } from "@/components/ui/input";

interface NavbarProps {
  userName: string;
  userEmail: string;
}

export function Navbar({ userName, userEmail }: NavbarProps) {
  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-4 lg:px-6">
      <MobileSidebar />
      <DashboardBreadcrumb />
      <div className="ml-auto flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search resumes..."
            className="w-64 pl-8"
          />
        </div>
        <ProfileMenu userName={userName} userEmail={userEmail} />
      </div>
    </header>
  );
}