"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
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
      <form className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Certifications
          </h2>
          <AutosaveIndicator status={autosaveStatus} />
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <Card key={field.fieldKey}>
              <CardContent className="space-y-4 p-4">
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-7 text-destructive hover:text-destructive"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name={`certifications.${index}.name`}
                    render={({ field: inputField }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Certification name</FormLabel>
                        <FormControl>
                          <Input placeholder="AWS Certified Developer" {...inputField} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`certifications.${index}.issuer`}
                    render={({ field: inputField }) => (
                      <FormItem>
                        <FormLabel>Issuer</FormLabel>
                        <FormControl>
                          <Input placeholder="Amazon Web Services" {...inputField} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`certifications.${index}.issueDate`}
                    render={({ field: inputField }) => (
                      <FormItem>
                        <FormLabel>Issue date</FormLabel>
                        <FormControl>
                          <Input type="month" {...inputField} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`certifications.${index}.credentialUrl`}
                    render={({ field: inputField }) => (
                      <FormItem className="sm:col-span-2">
                        <FormLabel>Credential URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://credential-link.com" {...inputField} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => append(EMPTY_CERTIFICATION)}
        >
          <Plus className="mr-2 size-4" />
          Add Certification
        </Button>
      </form>
    </Form>
  );
}