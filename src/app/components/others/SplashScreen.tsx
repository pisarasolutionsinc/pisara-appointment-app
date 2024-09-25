import { APP_CONSTANTS, WEBAPP } from "../../config/config";

const SplashScreen = () => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-white dark:bg-black">
        <div className="flex flex-col justify-center items-center gap-5 p-10">
          <img src={WEBAPP.LOGO} alt={WEBAPP.NAME} className="size-48 p-5" />

          <h1 className="font-bold text-primary text-2xl">{WEBAPP.NAME}</h1>
          <p className="text-black dark:text-neutral font-medium">
            {APP_CONSTANTS.LABELS.PLEASE_WAIT}
            <span
              className="inline-block ml-1"
              style={{ animation: "ellipsis 2s infinite steps(4, end)" }}
            >
              {" "}
            </span>
          </p>
        </div>
        <style>
          {`
  @keyframes ellipsis {
    0% {
      content: " ";
    }
    25% {
      content: ".";
    }
    50% {
      content: "..";
    }
    75% {
      content: "...";
    }
    100% {
      content: " ";
    }
  }

  span::after {
    content: " ";
    animation: ellipsis 2s infinite steps(4, end);
  }
`}
        </style>
      </div>
    </>
  );
};

export default SplashScreen;
