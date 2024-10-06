import React, { useState, useContext } from "react";
import InputForm from "../../../components/forms/InputForm";
import { APP_CONSTANTS, WEBAPP } from "../../../config/config";
import HorizontalCalendar from "../../../components/others/HorizontalCalendar";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/buttons/Button";
import { AuthContext } from "../../../contexts/AuthContext";
import Modal from "../../../components/others/Modal";
import LinkButton from "../../../components/buttons/LinkButton";

const ScheduleSection = () => {
  const currentMonth = new Date().toISOString().slice(0, 7);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

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

  const handleBookNowClick = () => {
    if (authContext?.user) {
      navigate("/appointment");
    } else {
      setShowLoginModal(true);
    }
  };

  const closeModal = () => {
    setShowLoginModal(false);
  };

  return (
    <>
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
              <Button
                className="bg-primary text-white rounded-full"
                onClick={handleBookNowClick}
              >
                {APP_CONSTANTS.BUTTONS.BOOK_NOW}
              </Button>
            </div>
          </section>
        </div>
      </div>
      {showLoginModal && (
        <Modal
          isOpen={showLoginModal}
          onClose={closeModal}
          className="w-full md:w-1/2 2xl:w-1/3 bg-secondary"
        >
          <div className="flex flex-col items-center justify-center gap-10">
            <div className="text-center space-y-3">
              <img src={WEBAPP.LOGO} alt="" className="mx-auto" />
              <h1 className="text-lg text-primary font-bold">
                {APP_CONSTANTS.TITLES.LOGIN_REQUIRED}
              </h1>
              <p className="text-black">
                {APP_CONSTANTS.DESCRIPTIONS.LOGIN_TO_CONTINUE}
              </p>
            </div>
            <div className="self-center" onClick={closeModal}>
              <LinkButton
                path="/login"
                className="bg-primary text-white py-1.5 px-5"
                ariaLabel={APP_CONSTANTS.BUTTONS.LOGIN}
              >
                {APP_CONSTANTS.BUTTONS.LOGIN}
              </LinkButton>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ScheduleSection;
