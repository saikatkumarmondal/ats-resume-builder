import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CtaBand() {
  return (
    <section className="relative overflow-hidden bg-[#0A0F1F] py-24 text-center">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#2E6BFF]/20 blur-[120px]" />
      <div className="relative mx-auto max-w-2xl px-6">
        <h2 className="font-display text-4xl text-white sm:text-5xl">
          Your next offer starts with a resume that gets seen.
        </h2>
        <p className="mt-4 text-white/60">Free forever. No credit card. Ready in minutes.</p>
        <Button size="lg" className="mt-8" asChild>
          <Link href="/register">
            Start Building Free
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </Button>
      </div>
    </section>
  );
}