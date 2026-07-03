"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { SidebarNav } from "@/components/dashboard/sidebar-nav";

export function MobileSidebar() {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  return (
    <Sheet open={isMobileNavOpen} onOpenChange={setIsMobileNavOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetTitle className="border-b px-6 py-4 text-left text-lg font-semibold">
          ResumeForge
        </SheetTitle>
        <SidebarNav />
      </SheetContent>
    </Sheet>
  );
}