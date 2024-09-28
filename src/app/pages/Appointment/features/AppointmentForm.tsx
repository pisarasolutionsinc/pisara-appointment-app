import InputForm from "../../../components/forms/InputForm";
import LocationPicker from "../../../components/forms/LocationPicker";
import RadioForm from "../../../components/forms/RadioForm";
import SelectForm from "../../../components/forms/SelectForm";
import { APP_CONSTANTS, DROPDOWN } from "../../../config/config";

const AppointmentForm = () => {
  const handleLocationChange = () => {};
  return (
    <>
      <div className="p-5 space-y-10">
        <h1 className="text-primary text-4xl font-bold text-center">
          {APP_CONSTANTS.TITLES.APPOINTMENT}
        </h1>
        <div className="space-y-5">
          <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <InputForm
              label="First Name"
              className="bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold"
              type="text"
              placeholder="Enter First Name"
            />
            <InputForm
              label="Last Name"
              className="bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold"
              type="text"
              placeholder="Enter Last Name"
            />
            <InputForm
              label="Middle Initial"
              className="bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold"
              type="text"
              placeholder="Enter Middle Initial"
            />
            <InputForm
              label="Suffix (Optional)"
              className="bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold"
              type="text"
              placeholder="Enter Suffix"
            />
          </section>

          <section className="">
            <LocationPicker
              className="bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold"
              onLocationChange={handleLocationChange}
            />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-4 gap-5">
            <InputForm
              label="Birthday"
              className="bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold"
              type="date"
            />
            <SelectForm
              label="Gender"
              className="bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold"
              name="my-select"
              id="my-select"
              options={DROPDOWN.GENDER}
              placeholder="Please select an option"
              disabled={false}
            />
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <InputForm
              label="Email"
              className="bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold"
              type="email"
              placeholder="Enter Email"
            />
            <InputForm
              label="Contact Number"
              className="bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold"
              type="number"
              placeholder="Enter Contact Number"
            />
          </section>
        </div>
        <hr className="border border-neutral" />
        <h1 className="text-primary text-4xl font-bold text-center">
          {APP_CONSTANTS.TITLES.IN_CASE_OF_EMERGENCY}
        </h1>
        <div className="space-y-5">
          <section className="grid grid-cols-1 md:grid-cols-7 gap-5">
            <div className="col-span-1 md:col-span-3 2xl:col-span-4">
              <InputForm
                label="Full Name"
                className="bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold"
                type="text"
                placeholder="Enter Full name"
              />
            </div>
            <div className="col-span-1 md:col-span-2 2xl:col-span-1">
              <SelectForm
                label="Relationship"
                className="col-span-1 md:col-span-1 bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold"
                name="relationship"
                id="relationship"
                options={DROPDOWN.RELATIONSHIP}
                placeholder="Please select an option"
                disabled={false}
              />
            </div>
            <div className="col-span-1 md:col-span-2 ">
              <InputForm
                label="Contact Number"
                className="col-span-1 md:col-span-1 bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold"
                type="number"
                placeholder="Enter Contact Number"
              />
            </div>
          </section>

          <section className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-7 gap-5">
              <p className="text-primary text-lg col-span-1 md:col-span-3 2xl:col-span-4">
                {APP_CONSTANTS.FORM_QUESTIONS.HAVE_SURGERY}
              </p>
              <div className="flex flex-wrap items-center gap-10 col-span-1 md:col-span-2 2xl:col-span-1">
                <RadioForm label="Yes" />
                <RadioForm label="No" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <InputForm
                  className="bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold w-full"
                  type="text"
                  placeholder="If yes, please specify"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-5">
              <p className="text-primary text-lg col-span-1 md:col-span-3 2xl:col-span-4">
                {APP_CONSTANTS.FORM_QUESTIONS.HAVE_MEDICATION}
              </p>
              <div className="flex flex-wrap items-center gap-10 col-span-1 md:col-span-2 2xl:col-span-1">
                <RadioForm label="Yes" />
                <RadioForm label="No" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <InputForm
                  className="bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold w-full"
                  type="text"
                  placeholder="If yes, please specify"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-5 mt-4">
              <p className="text-primary text-lg col-span-1 md:col-span-3 2xl:col-span-4">
                {APP_CONSTANTS.FORM_QUESTIONS.HAVE_MEDICAL_CONDITION}
              </p>
              <div className="flex flex-wrap items-center gap-10 col-span-1 md:col-span-2 2xl:col-span-1">
                <RadioForm label="Yes" />
                <RadioForm label="No" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <InputForm
                  className="bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold w-full"
                  type="text"
                  placeholder="If yes, please specify"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-7 gap-5 mt-4">
              <p className="text-primary text-lg col-span-1 md:col-span-3 2xl:col-span-4">
                {
                  APP_CONSTANTS.FORM_QUESTIONS
                    .HAVE_FAMILY_HISTORY_OF_MEDICAL_CONDITION
                }
              </p>
              <div className="flex flex-wrap items-center gap-10 col-span-1 md:col-span-2  2xl:col-span-1">
                <RadioForm label="Yes" />
                <RadioForm label="No" />
              </div>
              <div className="col-span-1 md:col-span-2">
                <InputForm
                  className="bg-transparent border-2 border-primary focus:border-0 text-primary font-semibold w-full"
                  type="text"
                  placeholder="If yes, please specify"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AppointmentForm;
