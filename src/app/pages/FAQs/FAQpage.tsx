import { useState } from "react";
import Accordion from "../../components/others/Accordion";
import { APP_CONSTANTS, FAQ_CONTENT } from "../../config/config";

const FAQpage = () => {
  const [openIndex, setOpenIndex] = useState<{
    [categoryIndex: number]: number | null;
  }>({});

  const handleToggle = (categoryIndex: number, questionIndex: number) => {
    setOpenIndex((prevOpenIndex) => ({
      ...prevOpenIndex,
      [categoryIndex]:
        prevOpenIndex[categoryIndex] === questionIndex ? null : questionIndex,
    }));
  };

  return (
    <>
      <div className="space-y-20 p-10">
        <section className="pt-20 flex flex-col items-center justify-center gap-5">
          <p className="text-black text-lg">{APP_CONSTANTS.TITLES.HELP_CENTER}</p>
          <h1 className="text-3xl font-bold text-secondary filter brightness-50">
            {APP_CONSTANTS.TITLES.FAQ}
          </h1>
          <p className="text-black text-center max-w-2xl text-lg">
            {APP_CONSTANTS.DESCRIPTIONS.FAQ}{" "}
            <span className="font-semibold text-secondary filter brightness-50 text-lg">
              {APP_CONSTANTS.BUTTONS.CONTACT_US_HERE}
            </span>
          </p>
        </section>
        <section className="container mx-auto">
          <section className="space-y-20">
            {FAQ_CONTENT.map((faq, categoryIndex) => (
              <div key={categoryIndex} className="">
                <h1 className="text-2xl font-bold text-center mb-5 text-secondary filter brightness-50">
                  {faq.CATEGORY}
                </h1>
                {faq.QUESTIONS.map((faq, questionIndex) => (
                  <Accordion
                    key={questionIndex}
                    title={faq.QUESTION}
                    content={faq.ANSWER}
                    isOpen={openIndex[categoryIndex] === questionIndex}
                    onClick={() => handleToggle(categoryIndex, questionIndex)}
                  />
                ))}
              </div>
            ))}
          </section>
        </section>
      </div>
    </>
  );
};

export default FAQpage;
