"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, Mail, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileInfoFormProps {
  currentName: string;
  email: string;
}

export function ProfileInfoForm({ currentName, email }: ProfileInfoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm<UpdateProfileInput>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: { name: currentName },
  });

  // Track if the field data differs from initial props
  const isFormDirty = form.formState.isDirty;

  const onSubmit = async (values: UpdateProfileInput) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);
    
    try {
      const result = await updateProfile(values);
      if (result.success) {
        setSuccessMessage("Your profile information has been updated successfully.");
        // Re-calibrate dirty form flags using updated dataset values
        form.reset({ name: values.name });
      } else {
        setErrorMessage(result.error || "Failed to update profile. Please try again.");
      }
    } catch (err) {
      setErrorMessage("An unexpected network error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-slate-200/80 bg-white shadow-sm max-w-xl">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 text-slate-800">
          <User className="h-4 w-4 text-[#2E6BFF]" />
          <CardTitle className="text-base font-bold tracking-tight">Profile Information</CardTitle>
        </div>
        <CardDescription className="text-xs text-slate-500">
          Update your public profile display name and identity details.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Full Name Form Section Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-slate-700">Full Name</FormLabel>
                  <FormControl>
                    <Input 
                      className="border-slate-200 focus-visible:ring-[#2E6BFF]" 
                      placeholder="John Doe"
                      disabled={isSubmitting}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Read-Only Disabled Account Email Section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <FormLabel className="text-xs font-semibold text-slate-700">Email Address</FormLabel>
                <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1 bg-slate-50 border px-1.5 py-0.5 rounded">
                  <Mail className="h-3 w-3" /> Immutable
                </span>
              </div>
              <Input 
                value={email} 
                disabled 
                className="border-slate-200/60 bg-slate-50/50 text-slate-400 cursor-not-allowed select-none"
              />
              <p className="text-[11px] text-slate-400 tracking-normal pl-0.5">
                Your login email endpoint is verified and cannot be changed.
              </p>
            </div>

            {/* Response Alerts Stack */}
            {successMessage && (
              <div className="flex items-start gap-2.5 rounded-lg bg-emerald-50 border border-emerald-100 p-3 text-emerald-800 transform-gpu animate-in fade-in slide-in-from-top-1 duration-200">
                <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-emerald-600" />
                <p className="text-xs font-medium leading-relaxed">{successMessage}</p>
              </div>
            )}

            {errorMessage && (
              <div className="flex items-start gap-2.5 rounded-lg bg-destructive/5 border border-destructive/10 p-3 text-destructive transform-gpu animate-in fade-in slide-in-from-top-1 duration-200">
                <AlertCircle className="h-4 w-4 mt-0.5 shrink-0 text-destructive" />
                <p className="text-xs font-medium leading-relaxed">{errorMessage}</p>
              </div>
            )}

            {/* Action Form Footer Submit Button */}
            <div className="flex justify-end pt-2">
              <Button 
                type="submit" 
                className="w-full sm:w-auto bg-[#2E6BFF] hover:bg-[#2057DE] text-white shadow-sm shadow-blue-500/10 active:scale-[0.99] transition-transform duration-150 transform-gpu"
                disabled={isSubmitting || !isFormDirty}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving updates...
                  </>
                ) : (
                  "Save changes"
                )}
              </Button>
            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  );
}