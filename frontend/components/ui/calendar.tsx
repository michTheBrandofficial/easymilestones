import { cn } from "@/lib/shadcn-utils";
import { formatDate } from "date-fns";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../buttons";
import { Typography } from "../typography";
import Modal from "./modal";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfWeek = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

/**
 * @dev this function reverses the array of 12 years;
 * @example
 * ```jsx
 * const years = getYearRange(2024); // [2013, 2014, 2015, 2016, ...];
 * ```
 */
const getYearRange = (year: number) => {
  const currentYear = year;
  const years: number[] = [];
  for (let i = 0; i < 12; i++) {
    years.push(currentYear - i);
  }
  return years.reverse();
};
interface DatePickerModalProps {
  onChange?: (date: Date) => void;
  value?: Date;
  className?: string;
}

/**
 * @dev this modal has it's own trigger
 */
const DatePickerModal = (props: DatePickerModalProps) => {
  const [open, setOpen] = useState(false);
  const [dateValue, setDateValue] = useState(props.value ?? new Date());
  const [years, setYears] = useState(getYearRange(dateValue.getFullYear()));
  useEffect(() => {
    setDateValue(props.value ?? new Date());
  }, [props.value]);
  return (
    <>
      <Button
        onTap={() => setOpen(true)}
        className={cn(
          "w-fit flex items-center gap-x-2 px-4 py-2 !rounded-full  ",
          props.className
        )}
      >
        <Typography variant={"span"} className="font-semibold">
          {formatDate(dateValue, "MMMM yyy")}
        </Typography>
        <div className="-space-y-1">
          <ChevronUp className="w-4 h-4 " />
          <ChevronDown className="w-4 h-4 " />
        </div>
      </Button>
      <Modal onClose={() => setOpen(false)} className="" open={open}>
        <Modal.Body className="p-4 !min-h-0 !h-fit min-w-[300px] shadow-md rounded-xl space-y-4 ">
          <div className="w-full space-y-3 ">
            <Typography
              variant={"p"}
              className=" font-semibold w-full pb-2 border-b-2 text-center flex items-center"
            >
              <span className="mx-auto">Select Month</span>
              <Button
                variant="icon"
                onTap={() => setOpen(false)}
                className="  bg-transparent !p-0"
              >
                <X className="w-5 h-5 " />
              </Button>
            </Typography>

            <div className="w-full grid grid-cols-3 gap-x-2 gap-y-5">
              {months.map((month, index) => {
                return (
                  <Typography
                    onClick={() => {
                      const selectedDate = new Date(
                        dateValue.getFullYear(),
                        index,
                        props.value?.getDate() || 1
                      );
                      setDateValue(selectedDate);
                      props.onChange?.(selectedDate);
                    }}
                    key={index}
                    variant={"span"}
                    className={cn(
                      `font-semibold w-full text-center !mt-0 hover:bg-[#DFE1DB] hover: cursor-pointer `,
                      { " ": dateValue.getMonth() != index },
                      { "bg-black text-white": dateValue.getMonth() === index }
                    )}
                  >
                    {month.slice(0, 3)}
                  </Typography>
                );
              })}
            </div>
          </div>
          <div className="w-full space-y-3 ">
            <div className="w-full pb-2 border-b-2 flex items-center justify-between">
              <Button
                variant="icon"
                onTap={() => {
                  const newYears = getYearRange(years[0] - 1);
                  setYears(newYears);
                }}
                className="w-8 h-8 bg-black text-white"
              >
                <ArrowLeft className="w-4 h-4 " />
              </Button>
              <Typography
                variant={"p"}
                className=" !mt-0 font-semibold text-center"
              >
                Select Year
              </Typography>
              <Button
                variant="icon"
                onTap={() => {
                  const newYears = getYearRange(years[11] + 12);
                  setYears(newYears);
                }}
                className="w-8 h-8 bg-black text-white"
              >
                <ArrowRight className="w-4 h-4 " />
              </Button>
            </div>
            <div className="w-full grid grid-cols-3 gap-x-2 gap-y-5">
              {years.map((year, index) => {
                return (
                  <Typography
                    onClick={() => {
                      const selectedDate = new Date(
                        year,
                        dateValue.getMonth(),
                        props.value?.getDate() || 1
                      );
                      setDateValue(selectedDate);
                      props.onChange?.(selectedDate);
                    }}
                    key={index}
                    variant={"span"}
                    className={cn(
                      `font-semibold w-full text-center !mt-0 hover:bg-[#DFE1DB] hover: cursor-pointer `,
                      { " ": dateValue.getFullYear() != year },
                      {
                        "bg-black text-white": dateValue.getFullYear() === year,
                      }
                    )}
                  >
                    {year}
                  </Typography>
                );
              })}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const getCalendarDays = (date: Date): (Date | null)[][] => {
  const year = date.getFullYear();
  const month = date.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  let firstDayIndex = firstDay.getDay() - 1;
  if (firstDayIndex === -1) firstDayIndex = 6;

  const weeks: (Date | null)[][] = [];
  let currentWeek: (Date | null)[] = Array(7).fill(null);
  let currentDay = 1;

  // Fill first week with leading nulls
  for (let i = firstDayIndex; i < 7; i++) {
    currentWeek[i] = new Date(year, month, currentDay++);
  }
  weeks.push(currentWeek);

  // Fill remaining weeks
  while (currentDay <= lastDay.getDate()) {
    currentWeek = Array(7).fill(null);
    for (let i = 0; i < 7 && currentDay <= lastDay.getDate(); i++) {
      currentWeek[i] = new Date(year, month, currentDay++);
    }
    weeks.push(currentWeek);
  }
  return weeks;
};

/**
 * @todo remove double implementation for date comparison
 */
const isDateCurrent = (date: Date | null): boolean => {
  if (date === null) return false;
  const today = new Date();
  const checkDate = date;
  today.setHours(0, 0, 0, 0);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate.getTime() === today.getTime();
};

const isDateCurrentOrFuture = (date: Date | null): boolean => {
  if (date === null) return false;
  const today = new Date();
  const checkDate = date;
  today.setHours(0, 0, 0, 0);
  checkDate.setHours(0, 0, 0, 0);
  return checkDate.getTime() >= today.getTime();
};

interface DatePickerProps {
  className?: string;
  onChange?: (date: Date) => void;
  value?: Date;
  disableOldDates?: boolean;
  disabledDays?: (
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
    | "Saturday"
    | "Sunday"
  )[];
}

/**
 * @dev the selectedDate should change to props;
 */
const DatePickerComp: React.FC<DatePickerProps> = ({
  disableOldDates = true,
  disabledDays = [],
  ...props
}) => {
  const [selectedDate, setSelectedDate] = useState(props.value ?? new Date());
  const [calendarDays, setCalendarDays] = useState(getCalendarDays(new Date()));
  return (
    <section
      className={cn(
        `w-fit h-fit py-6 px-5 select-none bg-[#EAEBE5] `,
        props.className
      )}
    >
      <div className="w-full flex items-center justify-between ">
        <Button
          onTap={() => {
            const newDate = new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth() - 1,
              selectedDate.getDate()
            );
            setSelectedDate(newDate);
            setCalendarDays(getCalendarDays(newDate));
          }}
          variant="icon"
          className="bg-transparent text-em-dark"
        >
          <ChevronLeft className="size-5" />
        </Button>
        <DatePickerModal
          value={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setCalendarDays(getCalendarDays(date));
          }}
        />
        <Button
          onTap={() => {
            const newDate = new Date(
              selectedDate.getFullYear(),
              selectedDate.getMonth() + 1,
              selectedDate.getDate()
            );
            setSelectedDate(newDate);
            setCalendarDays(getCalendarDays(newDate));
          }}
          variant="icon"
          className="bg-transparent text-em-dark"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>
      <div className={cn(`w-full mt-5 grid grid-cols-7 gap-x-2`)}>
        {daysOfWeek.map((day, index) => (
          <Typography
            key={index}
            variant={"p"}
            className="text-center text-base  !mt-0 font-semibold"
          >
            {day}
          </Typography>
        ))}
      </div>
      <div
        className={cn(
          "w-full mt-5 grid grid-cols-7 gap-x-2 gap-y-3",
          { "grid-rows-6": calendarDays.length === 6 },
          { "grid-rows-5": calendarDays.length === 5 }
        )}
      >
        {calendarDays.flat(Infinity).map((date, index) => {
          const isOldDate = !isDateCurrentOrFuture(date as Date);
          let isDisabledDate: boolean;
          if (date) {
            isDisabledDate = disabledDays.includes(
              formatDate(date as Date, "	EEEE")
                // replace any escape characters that formatDate uses
                .replace(/[\t\n\r]/g, "") as any
            );
          } else isDisabledDate = false;
          const isDisabledTotally =
            (disableOldDates && isOldDate) || isDisabledDate;
          return (
            <div
              key={index}
              onClick={() => {
                if (!date || isDisabledTotally) return;
                setSelectedDate(date as Date);
                props.onChange?.(date as Date);
              }}
              className={cn("flex justify-center cursor-pointer", {
                "!pointer-events-none !cursor-not-allowed opacity-30":
                  isDisabledTotally,
              })}
            >
              <Typography
                variant={"p"}
                className={cn(
                  "text-center text-base  !mt-0 font-semibold rounded-full w-10 h-10 flex flex-col items-center justify-center gap-y-0 relative hover: hover:bg-slate-100 ",
                  {
                    "bg-primary-100 ":
                      selectedDate.getTime() === (date as Date)?.getTime(),
                  },
                  { "!bg-transparent": !date },
                  { "!bg-transparent": isDisabledTotally }
                )}
              >
                {(date as Date | null)?.getDate()}
                <span
                  className={cn(
                    "!mt-0 font-bold text-3xl block min-h-0 !h-fit absolute -bottom-0.5",
                    {
                      hidden: !date
                        ? true
                        : !isDateCurrent(date as Date | null),
                    }
                  )}
                >
                  .
                </span>
              </Typography>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const DatePicker = Object.assign(DatePickerComp, {
  Modal: DatePickerModal,
});

export default DatePicker;
