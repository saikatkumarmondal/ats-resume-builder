import { Mail } from "lucide-react";
import { FAQ_ITEMS } from "@/config/faq.config";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HelpPage() {
  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Help & FAQ</h1>
        <p className="text-sm text-muted-foreground">
          Answers to common questions about ResumeForge.
        </p>
      </div>

      <Card>
        <CardContent className="pt-6">
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Still need help?</CardTitle>
        </CardHeader>
        <CardContent>
          <a
            href="mailto:support@resumeforge.app"
            className="flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <Mail className="size-4" />
            mondalsaikatkumar@gmail.com
          </a>
        </CardContent>
      </Card>
    </div>
  );
}