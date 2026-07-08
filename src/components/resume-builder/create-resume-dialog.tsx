"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Loader2, FileText, Sparkles } from "lucide-react";

import { createResumeSchema, type CreateResumeInput } from "@/schemas/resume.schema";
import { createResume } from "@/actions/resume.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export function CreateResumeDialog() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isMutatingAction, setIsMutatingAction] = useState(false);

  const form = useForm<CreateResumeInput>({
    resolver: zodResolver(createResumeSchema),
    defaultValues: { title: "", templateSlug: "modern" },
  });

  // Combined tracking state checking both server action execution and client navigation timing
  const isLoading = isMutatingAction || isPending;

  const onSubmit = async (values: CreateResumeInput) => {
    setIsMutatingAction(true);
    try {
      const result = await createResume(values);
      
      if (result.success) {
        // startTransition guarantees loading text stays visible while Next.js fetches the target page bundle
        startTransition(() => {
          setIsOpen(false);
          form.reset();
          router.push(`/resumes/${result.resumeId}/edit`);
        });
      } else {
        // Implement error handling mechanisms here if needed (e.g., toast alerts)
        setIsMutatingAction(false);
      }
    } catch (error) {
      setIsMutatingAction(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isLoading && setIsOpen(open)}>
      <DialogTrigger asChild>
        <Button className="bg-[#2E6BFF] hover:bg-[#2057DE] text-white font-semibold rounded-xl shadow-sm shadow-blue-500/10 active:scale-[0.98] transition-all transform-gpu">
          <Plus className="mr-1.5 h-4 w-4 stroke-[2.5]" />
          Create Resume
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[440px] border-slate-100 bg-white shadow-2xl rounded-2xl p-5 sm:p-6 gap-0">
        <DialogHeader className="space-y-1 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2 text-slate-800">
            <FileText className="h-4 w-4 text-[#2E6BFF]" />
            <DialogTitle className="text-base font-bold tracking-tight">Create a new resume</DialogTitle>
          </div>
          <DialogDescription className="text-xs text-slate-500">
            Give your new resume setup a title to initialize your ATS-friendly workspace canvas.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 pt-4">
            
            {/* Title Entry Input */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-xs font-semibold text-slate-700">Resume Title</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Senior Full Stack Engineer - 2026" 
                      className="border-slate-200 h-10 px-3 focus-visible:ring-[#2E6BFF]"
                      disabled={isLoading}
                      autoFocus
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Custom Dialog Footer Area controls */}
            <DialogFooter className="pt-2 border-t border-slate-100 mt-2 gap-2 sm:gap-0">
              <Button
                type="button"
                variant="ghost"
                className="text-slate-500 font-medium text-xs hover:bg-slate-50 rounded-xl"
                disabled={isLoading}
                onClick={() => setIsOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-[#2E6BFF] hover:bg-[#2057DE] text-white font-semibold px-4 rounded-xl min-w-[100px] shadow-sm transform-gpu active:scale-[0.99]"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                    Initializing...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-1.5 h-3.5 w-3.5 fill-current" />
                    Create
                  </>
                )}
              </Button>
            </DialogFooter>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}