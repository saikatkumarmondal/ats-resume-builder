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
    onChange(`${year || String(new Date().getFullYear())}-${newMonth}`);
  };

  const handleYearChange = (newYear: string) => {
    onChange(`${newYear}-${month || "01"}`);
  };

  return (
    <div className="flex gap-2">
      <Select value={month || ""} onValueChange={handleMonthChange} disabled={disabled}>
        <SelectTrigger className="h-10 w-full border-slate-200 px-3 shadow-sm transition-colors focus:ring-[#2E6BFF]">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          sideOffset={4}
          className="max-h-64 overflow-y-auto"
        >
          {MONTH_OPTIONS.map((monthOption) => (
            <SelectItem
              key={monthOption.value}
              value={monthOption.value}
              className="cursor-pointer"
            >
              {monthOption.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={year || ""} onValueChange={handleYearChange} disabled={disabled}>
        <SelectTrigger className="h-10 w-full border-slate-200 px-3 shadow-sm transition-colors focus:ring-[#2E6BFF]">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          sideOffset={4}
          className="max-h-64 overflow-y-auto"
        >
          {YEAR_OPTIONS.map((yearOption) => (
            <SelectItem key={yearOption} value={yearOption} className="cursor-pointer">
              {yearOption}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}