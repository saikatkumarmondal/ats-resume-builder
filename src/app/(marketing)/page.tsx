import { HeroSection } from "@/components/marketing/hero-section";
import { TrustStrip } from "@/components/marketing/trust-strip";
import { FeaturesBento } from "@/components/marketing/features-bento";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { TemplatesShowcase } from "@/components/marketing/templates-showcase";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBand } from "@/components/marketing/cta-band";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <TrustStrip />
      <FeaturesBento />
      <HowItWorksSection />
      <TemplatesShowcase />
      <TestimonialsSection />
      <FaqSection />
      <CtaBand />
    </>
  );
}