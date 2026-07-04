"use client";

import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import {
  saveLanguagesSchema,
  proficiencyLevelOptions,
  type SaveLanguagesInput,
  type LanguageEntry,
} from "@/schemas/language.schema";
import { saveLanguages } from "@/actions/language.actions";
import { useDebouncedAutosave } from "@/hooks/use-debounced-autosave";
import { AutosaveIndicator } from "@/components/resume-builder/autosave-indicator";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EMPTY_LANGUAGE: LanguageEntry = { name: "", proficiency: "Conversational" };

interface LanguagesSectionFormProps {
  resumeId: string;
  defaultLanguages: LanguageEntry[];
  onValuesChange: (languages: LanguageEntry[]) => void;
}

export function LanguagesSectionForm({
  resumeId,
  defaultLanguages,
  onValuesChange,
}: LanguagesSectionFormProps) {
  const form = useForm<SaveLanguagesInput>({
    resolver: zodResolver(saveLanguagesSchema),
    defaultValues: { resumeId, languages: defaultLanguages },
    mode: "onBlur",
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "languages",
    keyName: "fieldKey",
  });

  const watchedLanguages = form.watch("languages");

  useEffect(() => {
    onValuesChange(watchedLanguages);
  }, [watchedLanguages, onValuesChange]);

  const autosaveStatus = useDebouncedAutosave(
    form.watch(),
    saveLanguages,
    form.formState.isValid
  );

  return (
    <Form {...form}>
      <form className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Languages
          </h2>
          <AutosaveIndicator status={autosaveStatus} />
        </div>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div key={field.fieldKey} className="flex items-end gap-3">
              <FormField
                control={form.control}
                name={`languages.${index}.name`}
                render={({ field: inputField }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Language</FormLabel>
                    <FormControl>
                      <Input placeholder="English" {...inputField} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`languages.${index}.proficiency`}
                render={({ field: inputField }) => (
                  <FormItem className="w-40">
                    <FormLabel>Proficiency</FormLabel>
                    <Select onValueChange={inputField.onChange} value={inputField.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {proficiencyLevelOptions.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="text-destructive hover:text-destructive"
                onClick={() => remove(index)}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => append(EMPTY_LANGUAGE)}
        >
          <Plus className="mr-2 size-4" />
          Add Language
        </Button>
      </form>
    </Form>
  );
}