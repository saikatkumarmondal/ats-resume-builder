"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MONTH_OPTIONS, YEAR_OPTIONS } from "@/config/date-picker.config";

interface MonthYearPickerProps {
  value: string | undefined;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function MonthYearPicker({ value, onChange, disabled }: MonthYearPickerProps) {
  const [year, month] = value ? value.split("-") : ["", ""];

  const handleMonthChange = (newMonth: string) => {
    onChange(`${year || YEAR_OPTIONS[0]}-${newMonth}`);
  };

  const handleYearChange = (newYear: string) => {
    onChange(`${newYear}-${month || "01"}`);
  };

  return (
    <div className="flex gap-2">
      <Select value={month} onValueChange={handleMonthChange} disabled={disabled}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {MONTH_OPTIONS.map((monthOption) => (
            <SelectItem key={monthOption.value} value={monthOption.value}>
              {monthOption.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={year} onValueChange={handleYearChange} disabled={disabled}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {YEAR_OPTIONS.map((yearOption) => (
            <SelectItem key={yearOption} value={yearOption}>
              {yearOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}