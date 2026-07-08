export const MONTH_OPTIONS = [
  { value: "01", label: "January" },
  { value: "02", label: "February" },
  { value: "03", label: "March" },
  { value: "04", label: "April" },
  { value: "05", label: "May" },
  { value: "06", label: "June" },
  { value: "07", label: "July" },
  { value: "08", label: "August" },
  { value: "09", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" },
];

const CURRENT_YEAR = new Date().getFullYear();
const EARLIEST_YEAR = CURRENT_YEAR - 60;
const LATEST_YEAR = CURRENT_YEAR + 10;

export const YEAR_OPTIONS = Array.from(
  { length: LATEST_YEAR - EARLIEST_YEAR + 1 },
  (_, index) => String(LATEST_YEAR - index)
);