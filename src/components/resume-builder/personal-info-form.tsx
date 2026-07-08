"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  personalInfoSchema,
  type PersonalInfoInput,
} from "@/schemas/personal-info.schema";
import { savePersonalInfo } from "@/actions/personal-info.actions";
import { useDebouncedAutosave } from "@/hooks/use-debounced-autosave";
import { AutosaveIndicator } from "@/components/resume-builder/autosave-indicator";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface PersonalInfoFormProps {
  resumeId: string;
  defaultValues: Omit<PersonalInfoInput, "resumeId">;
  onValuesChange: (values: Omit<PersonalInfoInput, "resumeId">) => void;
}

export function PersonalInfoForm({
  resumeId,
  defaultValues,
  onValuesChange,
}: PersonalInfoFormProps) {
  const form = useForm<PersonalInfoInput>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: { resumeId, ...defaultValues },
    mode: "onBlur",
  });

  const watchedValues = form.watch();

  useEffect(() => {
    onValuesChange(watchedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    watchedValues.fullName,
    watchedValues.jobTitle,
    watchedValues.email,
    watchedValues.phone,
    watchedValues.location,
    watchedValues.website,
    watchedValues.linkedin,
    watchedValues.github,
    watchedValues.portfolio,
    watchedValues.summary,
  ]);

  const autosaveStatus = useDebouncedAutosave(
    watchedValues,
    savePersonalInfo,
    form.formState.isValid
  );

  return (
    <Form {...form}>
      <form className="space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
            Personal Information
          </h2>

          <div className="self-start transition-all duration-300 sm:self-auto">
            <AutosaveIndicator status={autosaveStatus} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Jane Doe"
                    className="transition-all duration-300 focus-visible:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="jobTitle"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Job title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Senior Frontend Developer"
                    className="transition-all duration-300 focus-visible:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="you@example.com"
                    className="transition-all duration-300 focus-visible:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    placeholder="+880 1XXXXXXXXX"
                    className="transition-all duration-300 focus-visible:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Khulna, Bangladesh"
                    className="transition-all duration-300 focus-visible:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Website</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://yoursite.com"
                    className="transition-all duration-300 focus-visible:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>LinkedIn</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://linkedin.com/in/..."
                    className="transition-all duration-300 focus-visible:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="github"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://github.com/..."
                    className="transition-all duration-300 focus-visible:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Professional summary</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="A brief 2-3 sentence summary of your experience..."
                  rows={6}
                  className="
                    resize-none
                    transition-all
                    duration-300
                    focus-visible:ring-2
                  "
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}