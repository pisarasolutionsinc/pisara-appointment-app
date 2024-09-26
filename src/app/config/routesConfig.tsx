import FAQpage from "../pages/FAQs/FAQpage";
import Homepage from "../pages/Home/Homepage";

export const routeConfig = {
  MAIN: [
    {
      path: "/",
      element: <Homepage />,
    },
    {
      path: "/faqs",
      element: <FAQpage />,
    },
  ],
};
