import * as React from "react";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface DatePickerProps {
  date: Date;
  onDateChange: (date: Date) => void;
  onResetToToday: () => void;
}

export const DatePicker = ({
  date,
  onDateChange,
  onResetToToday,
}: DatePickerProps) => {
  return (
    <div className="flex gap-3">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "flex-1 justify-start text-left font-normal bg-gray-800/50 border-gray-700 text-white hover:bg-gray-700",
              !date && "text-gray-400"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-orange-500" />
            {date ? format(date, "PPP", { locale: es }) : <span>Selecciona una fecha</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-gray-800 border-gray-700">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => newDate && onDateChange(newDate)}
            initialFocus
            locale={es}
          />
        </PopoverContent>
      </Popover>
      <Button
        variant="outline"
        onClick={onResetToToday}
        className="bg-orange-600 hover:bg-orange-700 text-white border-0 font-semibold"
      >
        Hoy
      </Button>
    </div>
  );
};
