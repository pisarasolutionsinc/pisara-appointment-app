import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import Stepper from "../../components/navs/Stepper";
import AppointmentForm from "./features/AppointmentForm";
import { APP_CONSTANTS, STEPS } from "../../config/config";
import AppointmentConfirmation from "./features/AppointmentConfirmation";
import AppointmentPayment from "./features/AppointmentPayment";
import AppointmentReceipt from "./features/AppointmentReceipt";
import { AuthContext } from "../../contexts/AuthContext";
import {
  formatCurrency,
  formatISODateToReadable,
  getDisplayName,
  getUserInitials,
} from "../../utils/common";
import { getFieldValue } from "../../utils/getFieldValue";
import useItems from "../../hooks/useItems";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa6";
import { MdOutlineLocationOn, MdOutlinePersonOutline } from "react-icons/md";
import { PiMoneyFill } from "react-icons/pi";

const AppointmentPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const childId = searchParams.get("id");
  const initialStep = parseInt(searchParams.get("step") || "0", 10);
  const [currentStep, setCurrentStep] = useState(initialStep);
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const { fetchItemById, item } = useItems();

  useEffect(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  useEffect(() => {
    const fetchChildInfo = async () => {
      if (childId) {
        try {
          await fetchItemById(childId);
        } catch (error) {
          console.error("Error fetching child information:", error);
        }
      }
    };

    fetchChildInfo();
  }, [childId]);

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);

    setSearchParams({ id: childId || "", step: stepIndex.toString() });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <AppointmentForm />;
      case 1:
        return <AppointmentConfirmation />;
      case 2:
        return <AppointmentPayment />;
      case 3:
        return <AppointmentReceipt />;
      default:
        return <AppointmentForm />;
    }
  };

  const title = getFieldValue(
    item?.fields?.common!,
    APP_CONSTANTS.LABELS.TITLE
  );

  const description = getFieldValue(
    item?.fields?.common!,
    APP_CONSTANTS.LABELS.DESCRIPTION
  );

  const startDate = formatISODateToReadable(
    getFieldValue(item?.fields?.custom!, APP_CONSTANTS.LABELS.START_DATE) ||
      APP_CONSTANTS.LABELS.NO_DATE_SET
  );

  const endDate = formatISODateToReadable(
    getFieldValue(item?.fields?.custom!, APP_CONSTANTS.LABELS.END_DATE) ||
      APP_CONSTANTS.LABELS.NO_DATE_SET
  );

  const time =
    getFieldValue(item?.fields?.custom!, APP_CONSTANTS.LABELS.TIME) ||
    APP_CONSTANTS.LABELS.NO_TIME_SET;

  const address =
    getFieldValue(item?.fields?.custom!, APP_CONSTANTS.LABELS.ADDRESS) ||
    APP_CONSTANTS.LABELS.NO_ADDRESS_SET;

  const instructor =
    getFieldValue(item?.fields?.custom!, APP_CONSTANTS.LABELS.INSTRUCTOR) ||
    APP_CONSTANTS.LABELS.NO_INSTRUCTOR_ASSIGNED;

  const fee = formatCurrency(
    getFieldValue(item?.fields?.custom!, APP_CONSTANTS.LABELS.FEE) ||
      APP_CONSTANTS.LABELS.NO_FEE_SET,
    APP_CONSTANTS.CURRENCY.PHP,
    APP_CONSTANTS.LOCALE.EN_PH
  );

  return (
    <div className="space-y-20 pt-16 md:h-screen overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <section className="md:h-screen w-full md:w-1/4 bg-primary">
          <div className="h-1/6 bg-primary pt-10 p-5 flex gap-3">
            <div className="size-[6vh] rounded-full bg-white text-2xl font-bold text-primary p-2 flex items-center justify-center">
              {getUserInitials(user)}
            </div>
            <div>
              <p className="text-white text-2xl font-bold">
                {getDisplayName(user)}
              </p>
              <p className="text-neutral">{user?.email}</p>
              {/* <p className="text-white">Referral Code</p>
              <div className="bg-accent p-2"></div> */}
            </div>
          </div>
          <div className="h-5/6 bg-secondary p-5 space-y-5 text-primary">
            <div className="space-y-3">
              <p className="font-bold text-2xl">{title}</p>
              <hr className="border-neutral" />
              <p className="text-black">{description}</p>
              <hr className="border-neutral" />
            </div>
            <div className="flex items-center gap-3">
              <FaRegCalendarAlt className="text-2xl " />
              <p className="font-semibold">
                {startDate} - {endDate}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FaRegClock className="text-2xl" />
              <p className="font-bold">{time}</p>
            </div>
            <div className="flex items-center gap-3">
              <MdOutlineLocationOn className="text-2xl " />
              <p className="font-bold">{address}</p>
            </div>
            <div className="flex items-center gap-3">
              <MdOutlinePersonOutline className="text-2xl " />
              <p className="font-semibold">{instructor}</p>
            </div>
            <div className="flex items-center gap-3">
              <PiMoneyFill className="text-2xl " />
              <p className="font-semibold">{fee}</p>
            </div>
          </div>
        </section>
        <section className="w-full md:w-3/4 p-5 space-y-5">
          <Stepper
            steps={STEPS}
            currentStep={currentStep}
            onStepClick={handleStepClick}
          />
          <div className="md:h-[79vh] overflow-auto">{renderStepContent()}</div>
        </section>
      </div>
    </div>
  );
};

export default AppointmentPage;
