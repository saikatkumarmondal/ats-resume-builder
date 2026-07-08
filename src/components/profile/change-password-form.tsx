"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, KeyRound, CheckCircle2, AlertCircle } from "lucide-react";

import { changePasswordSchema, type ChangePasswordInput } from "@/schemas/profile.schema";
import { changePassword } from "@/actions/profile.actions";
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

export function ChangePasswordForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Separate show/hide state parameters for every individual input path
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const form = useForm<ChangePasswordInput>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
  });

  const onSubmit = async (values: ChangePasswordInput) => {
    setSuccessMessage(null);
    setErrorMessage(null);
    setIsSubmitting(true);
    
    try {
      const result = await changePassword(values);
      if (result.success) {
        setSuccessMessage("Your password has been changed successfully.");
        form.reset();
      } else {
        setErrorMessage(result.error || "Failed to update your password. Please try again.");
      }
    } catch (err) {
      setErrorMessage("An unexpected network connection issue occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="border-slate-200/80 bg-white shadow-sm max-w-xl">
      <CardHeader className="space-y-1">
        <div className="flex items-center gap-2 text-slate-800">
          <KeyRound className="h-4 w-4 text-[#2E6BFF]" />
          <CardTitle className="text-base font-bold tracking-tight">Change Password</CardTitle>
        </div>
        <CardDescription className="text-xs text-slate-500">
          Update the security credentials associated with your account profile.
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            
            {/* Current Password Field */}
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-slate-700">Current Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showCurrent ? "text" : "password"} 
                        className="pr-10 border-slate-200 focus-visible:ring-[#2E6BFF]" 
                        placeholder="••••••••"
                        disabled={isSubmitting}
                        {...field} 
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrent(!showCurrent)}
                        disabled={isSubmitting}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-150 disabled:opacity-50"
                        title={showCurrent ? "Hide password" : "Show password"}
                      >
                        {showCurrent ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* New Password Field */}
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-slate-700">New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showNew ? "text" : "password"} 
                        className="pr-10 border-slate-200 focus-visible:ring-[#2E6BFF]" 
                        placeholder="••••••••"
                        disabled={isSubmitting}
                        {...field} 
                      />
                      <button
                        type="button"
                        onClick={() => setShowNew(!showNew)}
                        disabled={isSubmitting}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-150 disabled:opacity-50"
                        title={showNew ? "Hide password" : "Show password"}
                      >
                        {showNew ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs font-semibold text-slate-700">Confirm New Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input 
                        type={showConfirm ? "text" : "password"} 
                        className="pr-10 border-slate-200 focus-visible:ring-[#2E6BFF]" 
                        placeholder="••••••••"
                        disabled={isSubmitting}
                        {...field} 
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirm(!showConfirm)}
                        disabled={isSubmitting}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors duration-150 disabled:opacity-50"
                        title={showConfirm ? "Hide password" : "Show password"}
                      >
                        {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs font-medium" />
                </FormItem>
              )}
            />

            {/* Status Alert Panels */}
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

            {/* Action Submit Control Button */}
            <Button 
              type="submit" 
              className="w-full sm:w-auto bg-[#2E6BFF] hover:bg-[#2057DE] text-white shadow-sm shadow-blue-500/10 active:scale-[0.99] transition-transform duration-150 transform-gpu"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating password...
                </>
              ) : (
                "Update password"
              )}
            </Button>
            
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}