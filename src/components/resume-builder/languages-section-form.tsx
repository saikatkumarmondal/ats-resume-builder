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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EMPTY_LANGUAGE: LanguageEntry = {
  name: "",
  proficiency: "Conversational",
};

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
      <form className="space-y-5 sm:space-y-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground sm:text-sm">
            Languages
          </h2>

          <div className="self-start sm:self-auto transition-all duration-300 ease-out">
            <AutosaveIndicator status={autosaveStatus} />
          </div>
        </div>

        <div className="space-y-4">
          {fields.map((field, index) => (
            <div
              key={field.fieldKey}
              className="
                rounded-xl
                border
                p-4
                transition-all
                duration-300
                ease-out
                hover:-translate-y-0.5
                hover:shadow-md
              "
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-end">
                <FormField
                  control={form.control}
                  name={`languages.${index}.name`}
                  render={({ field: inputField }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Language</FormLabel>

                      <FormControl>
                        <Input
                          placeholder="English"
                          className="transition-all duration-300 focus-visible:ring-2"
                          {...inputField}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`languages.${index}.proficiency`}
                  render={({ field: inputField }) => (
                    <FormItem className="w-full md:w-52">
                      <FormLabel>Proficiency</FormLabel>

                      <Select
                        onValueChange={inputField.onChange}
                        value={inputField.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full transition-all duration-300">
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

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => remove(index)}
                  className="
                    h-10
                    w-10
                    shrink-0
                    self-end
                    rounded-lg
                    text-destructive
                    transition-all
                    duration-300
                    hover:scale-110
                    hover:bg-destructive/10
                    hover:text-destructive
                    active:scale-95
                  "
                >
                  <Trash2 className="size-4 transition-transform duration-300" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() => append(EMPTY_LANGUAGE)}
          className="
            group
            w-full
            h-11
            sm:h-12
            rounded-xl
            border-dashed
            transition-all
            duration-300
            ease-out
            hover:scale-[1.01]
            hover:shadow-lg
            active:scale-[0.98]
            text-sm
            sm:text-base
          "
        >
          <Plus className="mr-2 size-4 transition-transform duration-300 group-hover:rotate-90 group-hover:scale-110" />
          <span>Add Language</span>
        </Button>
      </form>
    </Form>
  );
}