"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Templates", href: "#templates" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export function MarketingNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track page scroll coordinates to handle background frosting blends dynamically
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 transform-gpu ${
          isScrolled
            ? "border-b border-slate-200/50 bg-[#F5F6FA]/80 backdrop-blur-md shadow-sm"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          
          {/* Logo / Brand Anchor */}
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tight text-[#0B1226] hover:opacity-90 transition-opacity"
          >
            ResumeForge
          </Link>

          {/* Desktop Central Navigation Menu */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#0B1226]/70 transition-colors duration-200 hover:text-[#2E6BFF]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Triggers and Mobile Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" className="font-medium text-[#0B1226]/80 hover:text-[#0B1226]" asChild>
                <Link href="/login">Sign in</Link>
              </Button>
              <Button size="sm" className="font-medium shadow-sm hover:shadow-md transition-shadow transform-gpu active:scale-98" asChild>
                <Link href="/register">Start Building</Link>
              </Button>
            </div>

            {/* Mobile Menu Open/Close Trigger Icon */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-center p-2 rounded-lg md:hidden text-[#0B1226] hover:bg-slate-100 transition-colors focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Backdrop Slide Overlay Drawer */}
      <div
        className={`fixed inset-0 z-40 md:hidden bg-black/20 backdrop-blur-sm transition-opacity duration-300 transform-gpu ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`fixed right-0 top-0 bottom-0 z-40 w-full max-w-xs bg-white p-6 shadow-2xl transition-transform duration-300 ease-in-out transform-gpu md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full justify-between pt-12">
          {/* Mobile Specific Link Links Layout stack */}
          <nav className="flex flex-col gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-semibold text-[#0B1226] border-b border-slate-50 pb-2 hover:text-[#2E6BFF] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Low Width Breakpoint Fallback CTAs Inside Drawer */}
          <div className="flex flex-col gap-3 sm:hidden mt-auto pb-4">
            <Button variant="outline" className="w-full text-center border-slate-200" asChild>
              <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign in</Link>
            </Button>
            <Button className="w-full text-center" asChild>
              <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>Start Building</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}