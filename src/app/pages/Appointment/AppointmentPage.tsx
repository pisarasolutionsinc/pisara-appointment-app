import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Stepper from "../../components/navs/Stepper";
import AppointmentForm from "./features/AppointmentForm";
import { STEPS } from "../../config/config";
import AppointmentConfirmation from "./features/AppointmentConfirmation";
import AppointmentPayment from "./features/AppointmentPayment";
import AppointmentReceipt from "./features/AppointmentReceipt";

const AppointmentPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialStep = parseInt(searchParams.get("step") || "0", 10);
  const [currentStep, setCurrentStep] = useState(initialStep);

  useEffect(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex);
    setSearchParams({ step: stepIndex.toString() }); // Convert to string
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

  return (
    <>
      <div className="space-y-20 pt-14 md:h-screen overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <section className="md:h-screen w-full md:w-1/4 bg-primary">
            <div className="h-1/4 bg-primary">Name</div>
            <div className="h-3/4 bg-secondary">Details</div>
          </section>
          <section className="w-full md:w-3/4 p-5 space-y-5">
            <Stepper
              steps={STEPS}
              currentStep={currentStep}
              onStepClick={handleStepClick}
            />
            <div className="md:h-[79vh] overflow-auto">
              {renderStepContent()}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default AppointmentPage;
