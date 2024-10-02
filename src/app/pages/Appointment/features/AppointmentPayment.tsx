import { useState } from "react";
import { APP_CONSTANTS, PAYMENT_METHOD } from "../../../config/config";
import InputForm from "../../../components/forms/InputForm";
import Button from "../../../components/buttons/Button";
import RadioForm from "../../../components/forms/RadioForm";

const AppointmentPayment = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [cardNumber, setCardNumber] = useState("");

  const handleCardNumberChange = (e: any) => {
    const sanitizedValue = e.target.value.replace(/\D/g, "");

    const formattedValue = sanitizedValue.replace(/(.{4})/g, "$1 ");

    setCardNumber(formattedValue.trim());
  };

  return (
    <>
      <div className="w-full md:w-2/3 mx-auto space-y-10">
        <h1 className="text-primary text-4xl font-bold text-center">
          {APP_CONSTANTS.TITLES.PAYMENT}
        </h1>
        <section className="border p-5 w-full space-y-5 text-black rounded-md shadow-md bg-white">
          <h1 className="font-bold">{APP_CONSTANTS.LABELS.PAYMENT_METHODS}</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PAYMENT_METHOD.map((pay, index) => (
              <Button
                key={index}
                className={`border rounded-md shadow-sm p-5 flex flex-col justify-between ${
                  selectedOption === pay.name ? "bg-primary text-white" : ""
                }`}
                onClick={() => setSelectedOption(pay.name)}
              >
                <div className="mx-auto">
                  <img src={pay.logo} alt="" width={48} />
                </div>
                <div className="mx-auto">
                  <h1 className="font-semibold">{pay.name}</h1>
                </div>
              </Button>
            ))}
          </div>

          {selectedOption === "Card" && (
            <div className="space-y-5">
              <div className="flex flex-col gap-5">
                <p className="text-primary">
                  {APP_CONSTANTS.LABELS.CARD_NUMBER}
                </p>
                <div className="w-full">
                  <InputForm
                    type="text"
                    className="w-full border-0 focus:ring-0"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 1234"
                    maxLength={19}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-5">
                <p className="text-primary">{APP_CONSTANTS.LABELS.NAME}</p>
                <div className="w-full">
                  <InputForm
                    type="text"
                    className="w-full border-0 focus:ring-0"
                    placeholder="Name on the card"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row gap-5">
                <div className="flex flex-col gap-5 w-full">
                  <p className="text-primary">
                    {APP_CONSTANTS.LABELS.EXPIRATION_DATE}
                  </p>
                  <div className="w-full">
                    <InputForm
                      type="month"
                      className="w-full border-0 focus:ring-0"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-5 w-full">
                  <p className="text-primary">{APP_CONSTANTS.LABELS.CVV}</p>
                  <div className="w-full">
                    <InputForm
                      type="tel"
                      className="w-full border-0 focus:ring-0"
                      placeholder="123"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedOption === "Bank" && <div>sasa</div>}
          <div className="flex items-center justify-between gap-3 text-gray-800">
            <div className="flex gap-3">
              <RadioForm type="checkbox" className="rounded-sm p-1" />
              <h1 className="text-black">
                {APP_CONSTANTS.LABELS.SET_AS_DEFAULT_PAYMENT_METHOD}
              </h1>
            </div>
            <div>
              <Button className="bg-primary text-white py-2" ariaLabel={APP_CONSTANTS.BUTTONS.PAY}>
                {APP_CONSTANTS.BUTTONS.PAY}
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default AppointmentPayment;
