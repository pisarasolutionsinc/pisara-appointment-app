import { DateTime } from "luxon";
import { useState, useEffect } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import Button from "../buttons/Button";

interface HorizontalCalendarProps {
  onDaySelect: (day: string) => void;
  selectedMonth: string;
}

function HorizontalCalendar({
  onDaySelect,
  selectedMonth,
}: HorizontalCalendarProps) {
  const [currentDate, setCurrentDate] = useState(
    DateTime.fromISO(selectedMonth).startOf("month")
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    DateTime.now().toISODate()!
  );

  useEffect(() => {
    const newCurrentDate = DateTime.fromISO(selectedMonth).startOf("month");
    setCurrentDate(newCurrentDate);

    // Reset selected date if current month
    if (newCurrentDate.hasSame(DateTime.now(), "month")) {
      setSelectedDate(DateTime.now().toISODate()!);
    } else {
      setSelectedDate(newCurrentDate.startOf("month").toISODate()!);
    }
  }, [selectedMonth]);

  const handleDayClick = (day: DateTime) => {
    const today = DateTime.now().startOf("day");
    if (day < today) return;

    const formattedDay = day.toISODate()!;
    setSelectedDate(formattedDay);
    onDaySelect(formattedDay);
  };

  const renderDays = () => {
    const days: JSX.Element[] = [];
    let startDay = currentDate.hasSame(DateTime.now(), "month")
      ? DateTime.now().startOf("day")
      : currentDate.startOf("month");

    for (let i = 0; i < 7; i++) {
      const day = startDay.plus({ days: i });
      const isToday = day.hasSame(DateTime.now(), "day");
      const isSelected = day.hasSame(DateTime.fromISO(selectedDate), "day");
      const isPast = day < DateTime.now().startOf("day");

      days.push(
        <div
          key={i}
          onClick={() => handleDayClick(day)}
          className={`w-full cursor-pointer flex flex-col items-center p-2 rounded-lg transform transition duration-300 ease-in-out space-y-1 shadow-md ${
            isSelected
              ? "bg-white border-2 border-secondary"
              : "bg-accent hover:bg-gray-200"
          } ${isToday && !isSelected ? "border-2 border-secondary" : ""} ${
            isPast ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <p className="text-primary text-lg">{day.toFormat("EEE")}</p>
          <h1 className="text-primary text-3xl font-bold">
            {day.toFormat("MMM dd")}
          </h1>
        </div>
      );
    }
    return days;
  };

  const handlePreviousWeek = () => {
    setCurrentDate((prev) => prev.minus({ weeks: 1 }));
  };

  const handleNextWeek = () => {
    setCurrentDate((prev) => prev.plus({ weeks: 1 }));
  };

  return (
    <div className="flex items-center justify-center container mx-auto">
      <div className="flex justify-between md:gap-5 w-full items-center">
        <Button onClick={handlePreviousWeek} className="p-2">
          <IoIosArrowBack className="text-accent text-4xl" />
        </Button>
        <div className="grid grid-cols-2  md:grid-cols-7 gap-5 w-full">{renderDays()}</div>
        <Button onClick={handleNextWeek} className="p-2">
          <IoIosArrowForward className="text-accent text-4xl" />
        </Button>
      </div>
    </div>
  );
}

export default HorizontalCalendar;
