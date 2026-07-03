"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { createResumeSchema, type CreateResumeInput } from "@/schemas/resume.schema";
import { createResume } from "@/actions/resume.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
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
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateSubmitting, setIsCreateSubmitting] = useState(false);

  const form = useForm<CreateResumeInput>({
    resolver: zodResolver(createResumeSchema),
    defaultValues: { title: "", templateSlug: "modern" },
  });

  const onSubmit = async (values: CreateResumeInput) => {
    setIsCreateSubmitting(true);
    const result = await createResume(values);
    setIsCreateSubmitting(false);

    if (result.success) {
      setIsDialogOpen(false);
      form.reset();
      router.push(`/resumes/${result.resumeId}/edit`);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 size-4" />
          Create Resume
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new resume</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resume title</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Frontend Developer Resume" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit" disabled={isCreateSubmitting}>
                {isCreateSubmitting ? "Creating..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}