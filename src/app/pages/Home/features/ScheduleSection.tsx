import React, { useState } from "react";
import InputForm from "../../../components/forms/InputForm";
import { APP_CONSTANTS } from "../../../config/config";
import HorizontalCalendar from "../../../components/others/HorizontalCalendar";
import LinkButton from "../../../components/buttons/LinkButton";

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
      className="relative flex flex-col items-center justify-center w-full xl:h-screen overflow-hidden px-5 pb-5 space-y-5 bg-primary"
    >
      <div className="container mx-auto space-y-5">
        <section className="flex flex-col md:flex-row items-center justify-between gap-5 mt-20">
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

        <section className="bg-accent h-[70vh] p-5 rounded-lg overflow-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 bg-secondary p-5 rounded-xl shadow-md">
            <section>
              <p className="font-bold">CLASS</p>
              <p>INSTRUCTOR</p>
            </section>
            <section className="flex items-center divide-x-2 divide-primary">
              <p className="pr-4 font-bold">Start Time</p>
              <p className="pl-4">Duration</p>
            </section>
            <section>
              <p className="font-bold">BUILDING</p>
              <p>Address</p>
            </section>
            <section>10 slots left</section>
            <LinkButton
              path="/appointment"
              className="bg-primary text-white rounded-full"
            >
              {APP_CONSTANTS.BUTTONS.BOOK_NOW}
            </LinkButton>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ScheduleSection;
