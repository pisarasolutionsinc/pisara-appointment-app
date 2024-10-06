import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/buttons/Button";
import InputForm from "../../components/forms/InputForm";
import { APP_CONSTANTS, WEBAPP } from "../../config/config";
import { useState } from "react";
import RadioForm from "../../components/forms/RadioForm";
import { PLACEHOLDERS } from "../../config/placeholderImg";
import { useCreateUser } from "../../hooks/useCreateUser";
import { UserModel } from "../../models/UserModel";
import Loading from "../../components/others/Loading";
import useProject from "../../hooks/useProject";

const Register = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { createUserHandler, isLoading } = useCreateUser();
  const [isChecked, setIsChecked] = useState(false);
  const [user, setUser] = useState<UserModel>({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { currentProject } = useProject();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createUserHandler(user, () => navigate("/login"));
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const isFormComplete =
    user.firstname?.trim() !== "" &&
    user.lastname?.trim() !== "" &&
    user.email.trim() !== "" &&
    user.password.trim() !== "" &&
    isChecked;

  return (
    <>
      <div
        className="h-screen w-full flex items-center justify-center bg-cover bg-black bg-blend-overlay"
        style={{ backgroundImage: `url('${PLACEHOLDERS.GYM}')` }}
      >
        <div className="bg-secondary p-5 rounded-xl space-y-5">
          <section>
            <div className="flex items-center gap-3 p-3 rounded-t-xl">
              <img
                src={currentProject?.image || WEBAPP.LOGO}
                alt={currentProject?.name || WEBAPP.NAME}
                className="size-14"
              />
              <h1 className="text-balck font-semibold text-2xl">
                {currentProject?.name || WEBAPP.NAME}
              </h1>
            </div>
            <h1 className="text-xl font-bold text-black text-center">
              {APP_CONSTANTS.TITLES.REGISTER}
            </h1>
          </section>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputForm
                name="firstname"
                label={APP_CONSTANTS.LABELS.FIRST_NAME}
                placeholder={APP_CONSTANTS.LABELS.FIRST_NAME}
                onChange={handleInputChange}
              />
              <InputForm
                name="lastname"
                label={APP_CONSTANTS.LABELS.LAST_NAME}
                placeholder={APP_CONSTANTS.LABELS.LAST_NAME}
                onChange={handleInputChange}
              />
            </div>
            <InputForm
              name="email"
              label={APP_CONSTANTS.LABELS.ENTER_EMAIL}
              placeholder={APP_CONSTANTS.LABELS.ENTER_EMAIL}
              onChange={handleInputChange}
            />
            <div className="relative">
              <InputForm
                name="password"
                className="pr-16"
                type={isPasswordVisible ? "text" : "password"}
                label={APP_CONSTANTS.LABELS.ENTER_PASSWORD}
                placeholder={APP_CONSTANTS.LABELS.ENTER_PASSWORD}
                onChange={handleInputChange}
              />
              <Button
                onClick={togglePasswordVisibility}
                className="absolute right-0 bottom-0 px-3 py-2 bg-white text-black"
              >
                {isPasswordVisible ? "Hide" : "Show"}
              </Button>
            </div>
            <div className="flex gap-1">
              <RadioForm
                type="checkbox"
                className="p-2 rounded-md"
                label="I agree to the"
                onChange={handleCheckboxChange}
              />
              <p className="text-primary font-semibold">Terms and condition</p>
            </div>
            <Button
              className={`w-full py-2 text-white ${
                !isFormComplete || isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-primary"
              }`}
              ariaLabel={
                isLoading
                  ? APP_CONSTANTS.PLACEHOLDERS.PLEASE_WAIT
                  : APP_CONSTANTS.BUTTONS.REGISTER
              }
              type="submit"
              disable={!isFormComplete || isLoading}
            >
              {isLoading ? (
                <Loading text={APP_CONSTANTS.PLACEHOLDERS.PLEASE_WAIT} />
              ) : (
                APP_CONSTANTS.BUTTONS.REGISTER
              )}
            </Button>
            <p className="text-center text-neutral">
              {APP_CONSTANTS.LABELS.ALREADY_HAVE_AN_ACCOUNT}{" "}
              <Link
                to={"/login"}
                className="text-primary"
                aria-label={APP_CONSTANTS.BUTTONS.LOGIN}
              >
                {APP_CONSTANTS.BUTTONS.LOGIN}
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
