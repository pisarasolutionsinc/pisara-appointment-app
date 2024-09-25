import { APP_CONSTANTS } from "../../../config/config";

const ScheduleSection = () => {
  return (
    <>
      <div className="relative w-full h-screen overflow-hidden px-5 space-y-5 bg-primary">
        <h1 className="text-5xl font-bold text-white mt-20">
          {APP_CONSTANTS.TITLES.SCHEDULE_SECTION}
        </h1>
      </div>
    </>
  );
};

export default ScheduleSection;
