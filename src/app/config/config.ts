import { FaCreditCard, FaFileAlt } from "react-icons/fa";
import PISARA_LOGO from "../../assets/pisara-logo.png";
import { FaCheck, FaEye } from "react-icons/fa6";
import GCASH from "../../assets/gcash.webp";
import GOTYME from "../../assets/gotyme.webp";
import MAYA from "../../assets/maya.webp";
import UNIONBANK from "../../assets/unionbank.webp";
import BPI from "../../assets/bpi.webp";
import BDO from "../../assets/bdo.webp";
import PAYPAL from "../../assets/paypal.webp";

export const WEBAPP = {
  NAME: "PISARA Appointment App",
  LOGO: PISARA_LOGO,
  DESCRIPTION:
    "Our Appointment System is designed to streamline the process of scheduling, tracking, and managing appointments, ensuring that both service providers and clients have a seamless experience.",
  ABOUT:
    "Welcome to PISARA, where innovation meets passion. We are a team of dedicated professionals who strive to create meaningful solutions tailored to your needs. Our mission is to deliver exceptional services, combining cutting-edge technology with a commitment to customer satisfaction.",
  ADDRESS: "Diliman, Quezon City",
  CONTACT_NUMBER: "+639123456789",
  EMAIL: "pisara.solutions.inc@gmail.com",
};

export const APP_CONSTANTS = {
  TITLES: {
    SERVICE_SECTION: "SERVICES",
    GALLERY_SECTION: "GALLERY",
    SCHEDULE_SECTION: "SCHEDULE",
    ABOUT_US_SECTION: "ABOUT US",
    GET_IN_TOUCH: "GET IN TOUCH",
    FAQ: "FREQUENTLY ASKED QUESTIONS",
    HELP_CENTER: "HELP CENTER",
    APPOINTMENT: "APPOINTMENT",
    IN_CASE_OF_EMERGENCY: "IN CASE OF EMERGENCY",
    APPOINTMENT_CONFIRMATION: "APPOINTMENT CONFIRMATION",
    PAYMENT: "PAYMENT",
    YOUR_INFORMATION: "YOUR INFORMATION",
    APPOINTMENT_BOOKED_SUCCESSFULLY: "Your Appointment Booked Successfully!",
  },
  DESCRIPTIONS: {
    FAQ: "Here are some answers to popular questions about our brand and products.  Looking to get in touch or have other questions not listed?",
    BOOKING_INFO_IN_YOUR_EMAIL:
      "We have sent your booking information to your email address",
  },
  LABELS: {
    ENTER_PASSCODE: "Enter Passcode",
    PLEASE_WAIT: "Please wait",
    GO_TO_HOME_PAGE: "Go to Home Page",
    PAYMENT_METHODS: "Payment Methods:",
    CARD_NUMBER: "Card Number",
    NAME: "Name",
    EXPIRATION_DATE: "Expiration Date",
    CVV: "CVV",
    SET_AS_DEFAULT_PAYMENT_METHOD: "Set as your default payment method",
  },
  PLACEHOLDERS: {
    TYPE_MESSAGE_HERE: "Type a message here...",
    ENTER_PASSWORD: "Enter Password",
    ENTER_EMAIL: "Enter email",
    GYM: "Gym",
  },
  BUTTONS: {
    BOOK_NOW: "Book Now",
    BOOK: "Book",
    START_BOOKING: "Start Booking",
    BACK: "Back",
    NEXT: "Next",
    LEARN_MORE: "Learn More",
    CONTACT_US_HERE: "Contact us here",
    PAY: "Pay",
    SUBMIT: "Submit",
    CLOSE: "Close",
  },
  ERROR: {
    UNAUTHORIZED: {
      CODE: 401,
      TITLE: "401 - Unauthorized",
      MESSAGE: "You are not authorized to view this page.",
    },
    FORBIDDEN: {
      CODE: 403,
      TITLE: "403 - Forbidden",
      MESSAGE: "You do not have permission to access this page.",
    },
    NOT_FOUND: {
      CODE: 404,
      TITLE: "404 - Not Found",
      MESSAGE: "The page you are looking for does not exist.",
    },
  },
  FORM_QUESTIONS: {
    HAVE_SURGERY: "Have you ever had any surgery in the last 3 months?",
    HAVE_MEDICATION: "Have you taken any medication in the last 24 hours?",
    HAVE_MEDICAL_CONDITION: "Do you have any medical condition?",
    HAVE_FAMILY_HISTORY_OF_MEDICAL_CONDITION:
      "Do you have any family history of medical condition?",
  },
};

export const DROPDOWN = {
  GENDER: [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ],
  RELATIONSHIP: [
    { label: "Mother", value: "mother" },
    { label: "Father", value: "father" },
    { label: "Sibling", value: "sibling" },
    { label: "Cousin", value: "cousin" },
    { label: "Husband", value: "husband" },
    { label: "Wife", value: "wife" },
    { label: "Daughter", value: "daughter" },
    { label: "Son", value: "son" },
    { label: "Aunt", value: "aunt" },
    { label: "Uncle", value: "uncle" },
    { label: "Grandmother", value: "grandmother" },
    { label: "Grandfather", value: "grandfather" },
    { label: "Nephew", value: "nephew" },
    { label: "Niece", value: "niece" },
    { label: "Partner", value: "partner" },
    { label: "Fiancé", value: "fiance" },
    { label: "Friend", value: "friend" },
    { label: "Colleague", value: "colleague" },
    { label: "Guardian", value: "guardian" },
    { label: "Stepfather", value: "stepfather" },
    { label: "Stepmother", value: "stepmother" },
    { label: "Stepson", value: "stepson" },
    { label: "Stepdaughter", value: "stepdaughter" },
    { label: "Other", value: "other" },
  ],
};

export const STEPS = [FaFileAlt, FaEye, FaCreditCard, FaCheck];

export const PAYMENT_METHOD = [
  { name: "Card", logo: "" },
  { name: "Bank", logo: "" },
];

export const PAYMENT_METHODS_IMG = {
  CARD: [BDO, BPI, UNIONBANK, GOTYME],
  BANK: [PAYPAL, GCASH, MAYA],
};

export const FAQ_CONTENT = [
  {
    CATEGORY: "General Information",
    QUESTIONS: [
      {
        QUESTION: "What is the appointment system used for?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "How do I create an account?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "Can I cancel or reschedule my appointments?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "What types of appointments can be scheduled?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "Is there a fee for using the appointment system?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
    ],
  },
  {
    CATEGORY: "Scheduling & Availability",
    QUESTIONS: [
      {
        QUESTION: "How do I check availability for an appointment?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "Can I schedule multiple appointments at once?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "What should I do if no slots are available?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "How far in advance can I book an appointment?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "Can I schedule recurring appointments?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
    ],
  },
  {
    CATEGORY: "Notifications & Reminders",
    QUESTIONS: [
      {
        QUESTION: "How will I be reminded of my appointment?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "Can I customize reminder notifications?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "What should I do if I miss an appointment reminder?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "Can I turn off appointment reminders?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "What happens if I miss my appointment?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
    ],
  },
  {
    CATEGORY: "Technical Support",
    QUESTIONS: [
      {
        QUESTION: "What do I do if the system is down?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "How do I report a bug or issue with the system?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "Why can't I log in to my account?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "How do I reset my password?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "What if I encounter an error during booking?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
    ],
  },
  {
    CATEGORY: "Account Management",
    QUESTIONS: [
      {
        QUESTION: "Can I edit my personal information?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "How do I change my email address?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "What should I do if my account is locked?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "Can I deactivate my account temporarily?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "How do I delete my account permanently?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
    ],
  },
  {
    CATEGORY: "Payments & Billing",
    QUESTIONS: [
      {
        QUESTION: "WHow do I pay for my appointment?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "Can I request a refund if I cancel an appointment?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "Is my payment information secure?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "Can I save my payment details for future use?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "How will I know if my payment was successful?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
    ],
  },
  {
    CATEGORY: "Privacy & Security",
    QUESTIONS: [
      {
        QUESTION: "How is my personal data protected?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "Can I view and download my appointment history?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "Who can access my appointment details?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "How do I manage my privacy settings?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "Can I enable two-factor authentication (2FA)?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
    ],
  },
  {
    CATEGORY: "Service Providers",
    QUESTIONS: [
      {
        QUESTION: "How do I find the right service provider?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "Can I choose a preferred provider for future appointments?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "What do I do if I need to change my provider?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "Can I view provider reviews?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "How do I contact my provider?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
    ],
  },
  {
    CATEGORY: "Troubleshooting",
    QUESTIONS: [
      {
        QUESTION: "Why am I not receiving confirmation emails?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "Why is my scheduled appointment not showing up?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "What should I do if my payment fails?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "Why is the system not showing available slots?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "What should I do if I booked the wrong service?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
    ],
  },
  {
    CATEGORY: "Mobile App",
    QUESTIONS: [
      {
        QUESTION: "Is there a mobile app available for the system?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "Can I manage appointments through the mobile app?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "How do I update the app to the latest version?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
      {
        QUESTION: "Can I sync my appointments with my phone calendar?",
        ANSWER:
          "Yes, we ship to over 100 countries. Shipping rates and delivery times vary based on location.",
      },
      {
        QUESTION: "What should I do if the app crashes?",
        ANSWER:
          "This system allows users to schedule, manage, and track their appointments efficiently online, providing reminders and notifications.",
      },
    ],
  },
];
