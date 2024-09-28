import React, { ReactNode } from "react";
import { IconType } from "react-icons";

interface StepperProps {
  steps: (string | ReactNode | IconType)[];
  currentStep: number;
  onStepClick: (stepIndex: any) => void;
}

const Stepper = ({ steps, currentStep, onStepClick }: StepperProps) => {
  return (
    <div className="w-full flex items-center justify-center p-3">
      {steps.map((step, index) => (
        <div key={index} className="flex items-center">
          <div className="flex flex-col items-center">
            <button
              className={`size-16 text-3xl rounded-full flex items-center justify-center 
              ${
                index <= currentStep
                  ? "bg-primary text-white"
                  : "bg-neutral text-white"
              } 
              transition-all duration-300 ease-in-out`}
              onClick={() => onStepClick(index)}
            >
              {typeof step === "string"
                ? index + 1
                : typeof step === "function"
                ? React.createElement(step as IconType)
                : step}
            </button>
            {typeof step === "string" && (
              <span
                className={`mt-2 text-sm ${
                  index <= currentStep ? "text-primary" : "text-neutral"
                }`}
              >
                {step}
              </span>
            )}
          </div>

          {index < steps.length - 1 && (
            <div className="flex items-center">
              <div
                className={`w-10 md:w-[15vw] h-1 ${
                  index < currentStep ? "bg-primary" : "bg-neutral"
                }`}
              ></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stepper;
