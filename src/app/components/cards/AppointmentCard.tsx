import { createContext, PropsWithChildren, useContext } from "react";
import { twMerge } from "tailwind-merge";
import { APP_CONSTANTS } from "../../config/config";

type AppointmentCardContext = {
  appointmentCard?: AppointmentCardContents;
};

const AppointmentCardContext = createContext<
  AppointmentCardContext | undefined
>(undefined);

function useAppointmentCardContext() {
  const context = useContext(AppointmentCardContext);
  if (!context) {
    throw new Error("useAppointmentCardContext must be used within a card");
  }
  return context;
}

interface AppointmentCardContents {
  image?: string;
  class?: string;
  instructor?: string;
  startDate?: string;
  time?: string;
  location?: string;
  slots?: number;
}

type AppointmentCardProps = PropsWithChildren & {
  onClick?: () => void;
  className?: string;
  appointmentCard?: AppointmentCardContents;
};

const AppointmentCard = ({
  appointmentCard,
  className,
  children,
}: AppointmentCardProps) => {
  return (
    <AppointmentCardContext.Provider value={{ appointmentCard }}>
      <div
        className={twMerge(
          "flex flex-col md:flex-row md:items-center md:justify-between gap-5 bg-secondary p-5 rounded-xl shadow-md",
          className
        )}
      >
        {children}
      </div>
    </AppointmentCardContext.Provider>
  );
};

export default AppointmentCard;

AppointmentCard.Image = function AppointmentCardImage({
  className,
}: {
  className?: string;
}) {
  const { appointmentCard } = useAppointmentCardContext();
  return (
    <img
      src={appointmentCard?.image}
      alt=""
      className={twMerge(
        "size-20 object-contain self-center shadow-neumorphic-light dark:shadow-neumorphic-dark",
        className
      )}
    />
  );
};

AppointmentCard.Class = function AppointmentCardTime({
  className,
}: {
  className?: string;
}) {
  const { appointmentCard } = useAppointmentCardContext();
  return (
    <section className={twMerge("font-bold", className)}>
      <p>{appointmentCard?.class}</p>
    </section>
  );
};

AppointmentCard.Instructor = function AppointmentCardTime({
  className,
}: {
  className?: string;
}) {
  const { appointmentCard } = useAppointmentCardContext();
  return (
    <section className={twMerge("space-y-2", className)}>
      <p>{appointmentCard?.instructor}</p>
    </section>
  );
};

AppointmentCard.Time = function AppointmentCardTime({
  className,
}: {
  className?: string;
}) {
  const { appointmentCard } = useAppointmentCardContext();
  return (
    <section
      className={twMerge(
        "flex items-center divide-x-2 divide-primary",
        className
      )}
    >
      <p className="pr-4 font-bold">{appointmentCard?.startDate}</p>
      <p className="pl-4">{appointmentCard?.time}</p>
    </section>
  );
};

AppointmentCard.Location = function AppointmentCardLocation({
  className,
}: {
  className?: string;
}) {
  const { appointmentCard } = useAppointmentCardContext();
  return (
    <section className={twMerge("text-black", className)}>
      {appointmentCard?.location}
    </section>
  );
};

AppointmentCard.Slots = function AppointmentCardSlots({
  className,
}: {
  className?: string;
}) {
  const { appointmentCard } = useAppointmentCardContext();
  const slots = appointmentCard?.slots;
  return (
    <section className={twMerge("text-black", className)}>
      {slots} {APP_CONSTANTS.LABELS.SLOTS_LEFT}
    </section>
  );
};
