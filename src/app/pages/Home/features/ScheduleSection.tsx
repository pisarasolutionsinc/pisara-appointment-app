import InputForm from "../../../components/forms/InputForm";
import { APP_CONSTANTS, WEBAPP } from "../../../config/config";
import HorizontalCalendar from "../../../components/others/HorizontalCalendar";
import Button from "../../../components/buttons/Button";
import Modal from "../../../components/others/Modal";
import LinkButton from "../../../components/buttons/LinkButton";
import AppointmentCard from "../../../components/cards/AppointmentCard";
import { ItemModel } from "../../../models/ItemModel";
import { formatISODateToReadable } from "../../../utils/common";
import { Card } from "../../../components/cards/Card";
import { getFieldValue } from "../../../utils/getFieldValue";
import useScheduleSection from "../../../hooks/useScheduleSection";

const ScheduleSection = () => {
  const {
    selectedMonth,
    handleMonthChange,
    currentMonth,
    handleDaySelect,
    classes,
    handleBookNowClick,
    isOpen,
    closeModal,
  } = useScheduleSection();

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

          <section className="bg-accent h-[70vh] p-5 rounded-lg overflow-auto space-y-3">
            {classes.length > 0 ? (
              classes.map((classItem: ItemModel) => (
                <div key={classItem._id} className="space-y-3">
                  {classItem.children?.map((child: ItemModel) => {
                    const className = getFieldValue(
                      child?.fields?.common!,
                      APP_CONSTANTS.LABELS.TITLE
                    );

                    const startDateField = getFieldValue(
                      child?.fields?.custom!,
                      APP_CONSTANTS.LABELS.START_DATE
                    );

                    const startDate = formatISODateToReadable(startDateField);

                    const time = getFieldValue(
                      child?.fields?.custom!,
                      APP_CONSTANTS.LABELS.TIME
                    );

                    const address = getFieldValue(
                      child.fields?.custom!,
                      APP_CONSTANTS.LABELS.ADDRESS
                    );

                    const slots = getFieldValue(
                      child?.fields?.custom!,
                      APP_CONSTANTS.LABELS.SLOTS
                    );

                    const instructor =
                      child.assignees && child.assignees.length > 0
                        ? child.assignees
                            .map((assignee) => {
                              return assignee.email || "No email Name";
                            })
                            .join(", ")
                        : "No Instructors Assigned";

                    return (
                      <AppointmentCard
                        key={child._id}
                        appointmentCard={{
                          class: className || APP_CONSTANTS.LABELS.NO_CLASS_SET,
                          instructor:
                            instructor ||
                            APP_CONSTANTS.LABELS.NO_INSTRUCTOR_ASSIGNED,
                          startDate:
                            startDate || APP_CONSTANTS.LABELS.NO_DATE_SET,
                          location:
                            address || APP_CONSTANTS.LABELS.NO_ADDRESS_SET,
                          time: time || APP_CONSTANTS.LABELS.NO_TIME_SET,
                          slots:
                            slots || APP_CONSTANTS.LABELS.NO_SLOT_NUMBER_SET,
                        }}
                        className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 bg-secondary p-5 rounded-xl shadow-md"
                      >
                        <div>
                          <AppointmentCard.Class className="text-lg text-primary" />
                          <AppointmentCard.Instructor className="text-primary font-semibold" />
                        </div>
                        <AppointmentCard.Time className="text-primary text-lg" />
                        <AppointmentCard.Location className="text-primary font-semibold" />
                        <AppointmentCard.Slots
                          className={`font-semibold text-primary ${
                            slots > 10 ? "text-primary" : "text-danger"
                          }`}
                        />
                        <Button
                          className="bg-primary text-white rounded-full"
                          onClick={() => handleBookNowClick(child._id!)}
                        >
                          {APP_CONSTANTS.BUTTONS.BOOK_NOW}
                        </Button>
                      </AppointmentCard>
                    );
                  })}
                </div>
              ))
            ) : (
              <Card className="bg-primary">
                <p className="text-white text-center text-2xl">
                  {APP_CONSTANTS.LABELS.NO_CLASSES_AVAILABLE}
                </p>
              </Card>
            )}
          </section>
        </div>
      </div>
      {isOpen && (
        <Modal
          isOpen={isOpen}
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
