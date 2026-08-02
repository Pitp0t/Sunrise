import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Calendar } from 'lucide-react';
import { format } from 'date-fns';

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
  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = new Date(e.target.value);
    if (!isNaN(newDate.getTime())) {
      onDateChange(newDate);
    }
  };

  const formattedDate = format(date, 'yyyy-MM-dd');

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-center">
      <div className="relative flex-1 w-full">
        <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
        <Input
          type="date"
          value={formattedDate}
          onChange={handleDateChange}
          className="pl-10"
        />
      </div>
      <Button variant="outline" onClick={onResetToToday}>
        Today
      </Button>
    </div>
  );
};
