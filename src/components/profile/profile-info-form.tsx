"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateProfileSchema, type UpdateProfileInput } from "@/schemas/profile.schema";
import { updateProfile } from "@/actions/profile.actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileInfoFormProps {
  currentName: string;
  email: string;
}

export function ProfileInfoForm({ currentName, email }: ProfileInfoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: currentName },
  });

  const onSubmit = async (values: UpdateProfileInput) => {
    setSuccessMessage(null);
    setIsSubmitting(true);
    const result = await updateProfile(values);
    setIsSubmitting(false);

    if (result.success) {
      setSuccessMessage("Profile updated successfully.");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 sm:p-6 md:p-8">
      <Card className="overflow-hidden border border-border/50 bg-card/50 backdrop-blur-md rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
        <CardHeader className="space-y-1.5 p-6 sm:p-8 border-b border-border/40 bg-muted/20">
          <CardTitle className="text-xl font-semibold tracking-tight text-foreground">
            Profile Information
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 sm:p-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-medium tracking-tight text-foreground/90">
                      Full name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        {...field} 
                        className="h-10 px-3.5 rounded-lg border border-input/80 bg-background transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring/20 focus-visible:ring-offset-0 focus-visible:border-ring"
                      />
                    </FormControl>
                    <FormMessage className="text-xs font-medium text-destructive/90" />
                  </FormItem>
                )}
              />

              <div className="space-y-2">
                <FormLabel className="text-sm font-medium tracking-tight text-foreground/90">
                  Email
                </FormLabel>
                <Input 
                  value={email} 
                  disabled 
                  className="h-10 px-3.5 rounded-lg border border-border/50 bg-muted/40 text-muted-foreground/80 cursor-not-allowed select-none"
                />
                <p className="text-xs text-muted-foreground/70 tracking-wide pl-0.5">
                  Email cannot be changed.
                </p>
              </div>

              {successMessage && (
                <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-3.5 text-sm text-emerald-600 dark:text-emerald-400 flex items-center gap-2.5 animate-in fade-in slide-in-from-top-1 duration-200">
                  <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="font-medium tracking-wide">{successMessage}</p>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto min-w-[120px] h-10 px-5 rounded-lg font-medium shadow-sm transition-all duration-200 active:scale-[0.98] disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    "Save changes"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}