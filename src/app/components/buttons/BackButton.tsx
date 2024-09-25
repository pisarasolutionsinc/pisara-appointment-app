import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <button
        onClick={handleGoBack}
        className="p-2 rounded-full bg-primary text-white "
        aria-label="Back"
      >
        <IoIosArrowBack />
      </button>
    </>
  );
};

export default BackButton;
