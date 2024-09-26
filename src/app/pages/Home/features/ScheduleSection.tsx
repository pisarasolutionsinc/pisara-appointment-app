import React, { useState } from "react";
import InputForm from "../../../components/forms/InputForm";
import { APP_CONSTANTS } from "../../../config/config";
import HorizontalCalendar from "../../../components/others/HorizontalCalendar";

const ScheduleSection = () => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const handleMonthChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const newMonth = event.target.value;
    setSelectedMonth(newMonth);
  };

  const handleDaySelect = (day: string) => {
    console.log("Selected Day:", day);
    setSelectedMonth(day.slice(0, 7));
  };

  return (
    <div
      id="schedule-section"
      className="relative w-full h-screen overflow-hidden px-5 space-y-5 bg-primary"
    >
      <div className="container mx-auto space-y-5">
        <section className="flex items-center justify-between gap-5 mt-20">
          <h1 className="text-5xl font-bold text-white">
            {APP_CONSTANTS.TITLES.SCHEDULE_SECTION}
          </h1>

          <InputForm
            type="month"
            className="w-fit bg-secondary font-bold text-primary text-xl"
            value={selectedMonth}
            onChange={handleMonthChange}
            min={currentMonth}
          />
        </section>

        <section>
          <HorizontalCalendar
            onDaySelect={handleDaySelect}
            selectedMonth={selectedMonth}
          />
        </section>
      </div>
    </div>
  );
};

export default ScheduleSection;
