import { FAQ_ITEMS } from "@/config/faq.config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <section id="faq" className="bg-[#F5F6FA] py-24">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center">
          <span className="font-mono-utility text-xs uppercase tracking-widest text-[#2E6BFF]">
            FAQ
          </span>
          <h2 className="font-display mt-3 text-4xl text-[#0B1226]">Questions, answered</h2>
        </div>

        <Accordion type="single" collapsible className="mt-10 w-full">
          {FAQ_ITEMS.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
              <AccordionContent className="text-[#0B1226]/60">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}