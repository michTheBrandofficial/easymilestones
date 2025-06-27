import { Button } from "@/components/buttons";
import DatePicker from "@/components/ui/calendar";
import { useState } from "react";

type DatePickerSheetContentProps = {
  close(): void;
  saveDate(selectedDate: Date): void;
  initialDate: Date | null;
};

const DatePickerSheetBody: React.FC<DatePickerSheetContentProps> = (
  props
) => {
  const [selectedDate, setSelectedDate] = useState<Date>(
    props.initialDate || new Date()
  );
  return (
    <>
      <DatePicker
        disableOldDates
        value={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="min-h-[454px]"
      />
      <div className="w-full flex gap-x-2 ">
        <Button variant="ghost-outline" className="w-full" onTap={props.close}>
          Cancel
        </Button>
        <Button
          variant="full"
          className="w-full"
          onTap={() => props.saveDate(selectedDate)}
        >
          Select
        </Button>
      </div>
    </>
  );
};

export default DatePickerSheetBody;