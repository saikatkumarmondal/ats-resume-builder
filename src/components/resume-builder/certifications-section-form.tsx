"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2, Award, Link2, Calendar, Building2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MonthYearPicker } from "@/components/shared/month-year-picker";
import {
  saveCertificationsSchema,
  type SaveCertificationsInput,
  type CertificationEntry,
} from "@/schemas/certification.schema";
import { saveCertifications } from "@/actions/certification.actions";
import { useDebouncedAutosave } from "@/hooks/use-debounced-autosave";
import { AutosaveIndicator } from "@/components/resume-builder/autosave-indicator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const EMPTY_CERTIFICATION: CertificationEntry = {
  name: "",
  issuer: "",
  issueDate: "",
  credentialUrl: "",
};

interface CertificationsSectionFormProps {
  resumeId: string;
  defaultCertifications: CertificationEntry[];
  onValuesChange: (certifications: CertificationEntry[]) => void;
}

export function CertificationsSectionForm({
  resumeId,
  defaultCertifications,
  onValuesChange,
}: CertificationsSectionFormProps) {
  const form = useForm<SaveCertificationsInput>({
    resolver: zodResolver(saveCertificationsSchema),
    defaultValues: { resumeId, certifications: defaultCertifications },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "certifications",
    keyName: "fieldKey",
  });

  const watchedCertifications = form.watch("certifications");

  // Keep live canvas builder preview synchronized on array changes
  useEffect(() => {
    onValuesChange(watchedCertifications);
  }, [watchedCertifications, onValuesChange]);

  const autosaveStatus = useDebouncedAutosave(
    form.watch(),
    saveCertifications,
    form.formState.isValid
  );

  return (
    <Form {...form}>
      <form className="space-y-6 max-w-3xl mx-auto">
        
        {/* Isolated Interactive Top Header Section Block */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-[#2E6BFF]" />
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-800">
              Certifications
            </h2>
          </div>
          <AutosaveIndicator status={autosaveStatus} />
        </div>

        {/* Dynamic List Shell Layer */}
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {fields.map((field, index) => (
              <motion.div
                key={field.fieldKey}
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: 10 }}
                transition={{ type: "spring", stiffness: 500, damping: 40 }}
                className="overflow-hidden"
              >
                <Card className="border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 group relative">
                  
                  {/* Dynamic Top Right Delete Trigger */}
                  <div className="absolute right-3 top-3 z-10">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-slate-400 hover:text-destructive hover:bg-destructive/5 rounded-md transition-colors"
                      onClick={() => remove(index)}
                      title="Remove field"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <CardContent className="space-y-4 p-5 pt-10 sm:pt-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      
                      {/* Name of Certification input */}
                      <FormField
                        control={form.control}
                        name={`certifications.${index}.name`}
                        render={({ field: inputField }) => (
                          <FormItem className="sm:col-span-2">
                            <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                              <Award className="h-3.5 w-3.5 text-slate-400" /> Certification Name
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="AWS Certified Solutions Architect" 
                                className="border-slate-200 focus-visible:ring-[#2E6BFF]" 
                                {...inputField} 
                              />
                            </FormControl>
                            <FormMessage className="text-xs font-medium" />
                          </FormItem>
                        )}
                      />

                      {/* Certification Issuing Entity input */}
                      <FormField
                        control={form.control}
                        name={`certifications.${index}.issuer`}
                        render={({ field: inputField }) => (
                          <FormItem>
                            <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                              <Building2 className="h-3.5 w-3.5 text-slate-400" /> Issuer
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="Amazon Web Services" 
                                className="border-slate-200 focus-visible:ring-[#2E6BFF]" 
                                {...inputField} 
                              />
                            </FormControl>
                            <FormMessage className="text-xs font-medium" />
                          </FormItem>
                        )}
                      />

                      {/* Issue Date selector track */}
                      <FormField
  control={form.control}
  name={`certifications.${index}.issueDate`}
  render={({ field: inputField }) => (
    <FormItem>
      <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
        <Calendar className="h-3.5 w-3.5 text-slate-400" /> Issue Date
      </FormLabel>
      <FormControl>
        <MonthYearPicker value={inputField.value} onChange={inputField.onChange} />
      </FormControl>
      <FormMessage className="text-xs font-medium" />
    </FormItem>
  )}
/>

                      {/* Verification Link / Credential Anchor tracking path */}
                      <FormField
                        control={form.control}
                        name={`certifications.${index}.credentialUrl`}
                        render={({ field: inputField }) => (
                          <FormItem className="sm:col-span-2">
                            <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                              <Link2 className="h-3.5 w-3.5 text-slate-400" /> Credential URL
                            </FormLabel>
                            <FormControl>
                              <Input 
                                placeholder="https://www.credly.com/credentials/..." 
                                className="border-slate-200 focus-visible:ring-[#2E6BFF]" 
                                {...inputField} 
                              />
                            </FormControl>
                            <FormMessage className="text-xs font-medium" />
                          </FormItem>
                        )}
                      />
                      
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty State Fallback Box layout banner when index elements register zero entries */}
          {fields.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center bg-slate-50/50"
            >
              <Award className="h-8 w-8 text-slate-300 mx-auto stroke-[1.5]" />
              <p className="text-sm font-semibold text-slate-600 mt-2">No certifications added yet</p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Add relevant licenses, certifications, or specialized bootcamps to pass recruiter checks.
              </p>
            </motion.div>
          )}
        </div>

        {/* Append Item Trigger Controller */}
        <Button
          type="button"
          variant="outline"
          className="w-full h-11 border-dashed border-slate-300 hover:border-[#2E6BFF] hover:bg-blue-50/20 hover:text-[#2E6BFF] transition-all font-semibold shadow-sm rounded-xl transform-gpu active:scale-[0.99]"
          onClick={() => append(EMPTY_CERTIFICATION)}
        >
          <Plus className="mr-2 h-4 w-4 stroke-[2.5]" />
          Add Certification Card
        </Button>
        
      </form>
    </Form>
  );
}