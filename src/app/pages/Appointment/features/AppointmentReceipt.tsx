import { WEBAPP } from "../../../config/config";

const AppointmentReceipt = () => {
  return (
    <>
      <div className="w-full mx-auto space-y-10">
        <div className="p-5">
          <section></section>
          <section className="w-full md:w-1/2 mx-auto">
            <div className="bg-primary flex items-center gap-3 p-3 rounded-t-xl">
              <img src={WEBAPP.LOGO} alt={WEBAPP.NAME} className="size-14" />
              <h1 className="text-white text-2xl">{WEBAPP.NAME}</h1>
            </div>
            <div className="StyledReceipt">Details</div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AppointmentReceipt;
