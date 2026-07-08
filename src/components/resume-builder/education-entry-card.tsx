"use client";

import { Trash2, GraduationCap, MapPin, Calendar, Award, BookOpen } from "lucide-react";
import type { Control } from "react-hook-form";
import type { SaveEducationsInput } from "@/schemas/education.schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTH_OPTIONS, YEAR_OPTIONS } from "@/config/date-picker.config";

interface EducationEntryCardProps {
  control: Control<SaveEducationsInput>;
  index: number;
  onRemove: () => void;
}

function MonthYearField({
  control,
  name,
  label,
}: {
  control: Control<SaveEducationsInput>;
  name: `educations.${number}.startDate` | `educations.${number}.endDate`;
  label: string;
}) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // field.value format: "YYYY-MM" (e.g. "2024-08"), or empty string
        const [year, month] = (field.value ?? "").split("-");

        const handleMonthChange = (newMonth: string) => {
          const safeYear = year || String(new Date().getFullYear());
          field.onChange(`${safeYear}-${newMonth}`);
        };

        const handleYearChange = (newYear: string) => {
          const safeMonth = month || "01";
          field.onChange(`${newYear}-${safeMonth}`);
        };

        return (
          <FormItem className="space-y-1.5">
            <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5 text-slate-400" /> {label}
            </FormLabel>
            <div className="flex gap-2">
              <Select value={month || ""} onValueChange={handleMonthChange}>
                <FormControl>
                  <SelectTrigger className="w-full border-slate-200 h-10 px-3 focus:ring-[#2E6BFF]">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {MONTH_OPTIONS.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={year || ""} onValueChange={handleYearChange}>
                <FormControl>
                  <SelectTrigger className="w-full border-slate-200 h-10 px-3 focus:ring-[#2E6BFF]">
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {YEAR_OPTIONS.map((y) => (
                    <SelectItem key={y} value={y}>
                      {y}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <FormMessage className="text-xs font-medium" />
          </FormItem>
        );
      }}
    />
  );
}

export function EducationEntryCard({ control, index, onRemove }: EducationEntryCardProps) {
  return (
    <Card className="border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 group relative">
      
      {/* Absolute Positioning for Close Control Button */}
      <div className="absolute right-3 top-3 z-10">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-7 w-7 text-slate-400 hover:text-destructive hover:bg-destructive/5 rounded-md transition-colors"
          onClick={onRemove}
          title="Remove education history card"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <CardContent className="space-y-4 p-5 pt-10 sm:pt-6">
        <div className="grid gap-4 sm:grid-cols-2">
          
          {/* Institution Field */}
          <FormField
            control={control}
            name={`educations.${index}.institution`}
            render={({ field }) => (
              <FormItem className="sm:col-span-2 space-y-1.5">
                <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <GraduationCap className="h-3.5 w-3.5 text-slate-400" /> Institution
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="University of Dhaka" 
                    className="border-slate-200 h-10 px-3 focus-visible:ring-[#2E6BFF]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs font-medium" />
              </FormItem>
            )}
          />

          {/* Degree Title Field */}
          <FormField
            control={control}
            name={`educations.${index}.degree`}
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-slate-400" /> Degree
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="B.Sc. / B.A. / MBA" 
                    className="border-slate-200 h-10 px-3 focus-visible:ring-[#2E6BFF]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs font-medium" />
              </FormItem>
            )}
          />

          {/* Field of Study Input */}
          <FormField
            control={control}
            name={`educations.${index}.field`}
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5 text-slate-400" /> Field of Study
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Computer Science & Engineering" 
                    className="border-slate-200 h-10 px-3 focus-visible:ring-[#2E6BFF]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs font-medium" />
              </FormItem>
            )}
          />

          {/* Location Field */}
          <FormField
            control={control}
            name={`educations.${index}.location`}
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-slate-400" /> Location
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Dhaka, Bangladesh" 
                    className="border-slate-200 h-10 px-3 focus-visible:ring-[#2E6BFF]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs font-medium" />
              </FormItem>
            )}
          />

          {/* Grade Marks Field */}
          <FormField
            control={control}
            name={`educations.${index}.grade`}
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
                  <Award className="h-3.5 w-3.5 text-slate-400" /> Grade / CGPA
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., 3.85 / 4.00" 
                    className="border-slate-200 h-10 px-3 focus-visible:ring-[#2E6BFF]" 
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-xs font-medium" />
              </FormItem>
            )}
          />

          {/* Dynamic Date Row Blocks */}
          <MonthYearField control={control} name={`educations.${index}.startDate`} label="Start Date" />
          <MonthYearField control={control} name={`educations.${index}.endDate`} label="End Date (or Expected)" />
        </div>

        {/* Detailed Description Block */}
        <FormField
          control={control}
          name={`educations.${index}.description`}
          render={({ field }) => (
            <FormItem className="space-y-1.5 pt-1">
              <FormLabel className="text-xs font-semibold text-slate-700">Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="List relevant coursework, honors, dean's list status, or major thesis research fields..." 
                  className="border-slate-200 min-h-[90px] focus-visible:ring-[#2E6BFF] resize-y" 
                  rows={3} 
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-xs font-medium" />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}