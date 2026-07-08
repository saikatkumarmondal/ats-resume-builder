"use client";

import { GripVertical, Trash2 } from "lucide-react";
import { MonthYearPicker } from "@/components/shared/month-year-picker";
import type { Control } from "react-hook-form";
import type { SaveExperiencesInput } from "@/schemas/experience.schema";
import { EMPLOYMENT_TYPE_LABELS } from "@/config/employment-type.config";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";

interface ExperienceEntryCardProps {
  control: Control<SaveExperiencesInput>;
  index: number;
  isCurrent: boolean;
  onRemove: () => void;
  dragHandleProps?: React.HTMLAttributes<HTMLButtonElement>;
}

export function ExperienceEntryCard({
  control,
  index,
  isCurrent,
  onRemove,
  dragHandleProps,
}: ExperienceEntryCardProps) {
  return (
    <Card
      className="
        transition-all
        duration-300
        ease-out
        hover:-translate-y-1
        hover:shadow-lg
      "
    >
      <CardContent className="space-y-5 p-4 sm:p-5 lg:p-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="
              cursor-grab
              rounded-lg
              p-1.5
              text-muted-foreground
              transition-all
              duration-300
              hover:bg-muted
              hover:text-foreground
              active:scale-95
            "
            {...dragHandleProps}
          >
            <GripVertical className="size-4 transition-transform duration-300 hover:scale-110" />
          </button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="
              size-8
              rounded-lg
              text-destructive
              transition-all
              duration-300
              hover:scale-110
              hover:bg-destructive/10
              hover:text-destructive
              active:scale-95
            "
            onClick={onRemove}
          >
            <Trash2 className="size-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormField
            control={control}
            name={`experiences.${index}.company`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Acme Inc."
                    className="transition-all duration-300 focus-visible:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`experiences.${index}.position`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Position</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Software Engineer"
                    className="transition-all duration-300 focus-visible:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`experiences.${index}.location`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Dhaka, Bangladesh"
                    className="transition-all duration-300 focus-visible:ring-2"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`experiences.${index}.employmentType`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Employment type</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger
                      className="
                        w-full
                        transition-all
                        duration-300
                        focus:ring-2
                      "
                    >
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    {Object.entries(EMPLOYMENT_TYPE_LABELS).map(
                      ([value, label]) => (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`experiences.${index}.startDate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Start date</FormLabel>
                <FormControl>
                  <MonthYearPicker
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={control}
            name={`experiences.${index}.endDate`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>End date</FormLabel>
                <FormControl>
                  <MonthYearPicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isCurrent}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={control}
          name={`experiences.${index}.isCurrent`}
          render={({ field }) => (
            <FormItem
              className="
                flex
                flex-row
                items-start
                sm:items-center
                gap-3
                rounded-lg
                border
                p-3
                transition-all
                duration-300
                hover:bg-muted/40
                space-y-0
              "
            >
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>

              <FormLabel className="cursor-pointer font-normal leading-relaxed">
                I currently work here
              </FormLabel>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`experiences.${index}.description`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Textarea
                  placeholder="Describe your responsibilities and achievements..."
                  rows={5}
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
      </CardContent>
    </Card>
  );
}