import { ChangeEvent, FormEvent, useContext, useState } from "react";
import InputForm from "../../components/forms/InputForm";
import { APP_CONSTANTS, WEBAPP } from "../../config/config";
import Button from "../../components/buttons/Button";
import { Link, useNavigate } from "react-router-dom";
import { PLACEHOLDERS } from "../../config/placeholderImg";
import { AuthContext } from "../../contexts/AuthContext";
import { useToast } from "../../contexts/ToastProvider";
import Loading from "../../components/others/Loading";
import useProject from "../../hooks/useProject";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { currentProject } = useProject();

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!authContext) {
      return;
    }

    setIsLoading(true);

    try {
      const isSuccess = await authContext.login(email, password);
      if (isSuccess) {
        showToast("Login Successful", "success", "top-20 right-10");
        navigate("/");
      } else {
        showToast(
          "Invalid email or password, or your account is not active.",
          "error",
          "top-10 right-10"
        );
      }
    } catch (error) {
      showToast(
        "An error occurred during login. Please try again.",
        "error",
        "top-20 right-10"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <>
      <div
        className="h-screen w-full flex items-center justify-center bg-cover bg-black bg-blend-overlay"
        style={{ backgroundImage: `url('${PLACEHOLDERS.GYM}')` }}
      >
        <div className="bg-secondary p-5 rounded-xl space-y-5">
          <form onSubmit={handleLogin}>
            <section>
              <div className="flex items-center gap-3 p-3 rounded-t-xl">
                <img
                  src={currentProject?.image || WEBAPP.LOGO}
                  alt={currentProject?.name || WEBAPP.NAME}
                  className="size-14"
                />
                <h1 className="text-balck font-semibold text-2xl">
                  {WEBAPP.NAME}
                </h1>
              </div>
              <h1 className="text-xl font-bold text-black text-center">
                {APP_CONSTANTS.TITLES.LOGIN}
              </h1>
            </section>
            <section className="space-y-5">
              <InputForm
                name="email"
                label={APP_CONSTANTS.LABELS.ENTER_EMAIL}
                placeholder={APP_CONSTANTS.LABELS.ENTER_EMAIL}
                onChange={handleChange}
              />
              <div className="relative">
                <InputForm
                  name="password"
                  className="pr-16"
                  type={isPasswordVisible ? "text" : "password"}
                  label={APP_CONSTANTS.LABELS.ENTER_PASSWORD}
                  placeholder={APP_CONSTANTS.LABELS.ENTER_PASSWORD}
                  onChange={handleChange}
                />
                <Button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-0 bottom-0 px-3 py-2 bg-white text-black"
                  ariaLabel={isPasswordVisible ? "Hide" : "Show"}
                >
                  {isPasswordVisible ? "Hide" : "Show"}
                </Button>
              </div>
              <Button
                type="submit"
                className={`w-full py-2 text-white ${
                  isLoading ? "bg-neutral" : "bg-primary"
                }`}
                ariaLabel={APP_CONSTANTS.BUTTONS.LOGIN}
                disable={isLoading}
              >
                {isLoading ? (
                  <Loading text="Loading..." />
                ) : (
                  APP_CONSTANTS.BUTTONS.LOGIN
                )}
              </Button>
              <p className="text-center text-neutral">
                {APP_CONSTANTS.LABELS.DONT_HAVE_AN_ACCOUNT}{" "}
                <Link
                  to={"/register"}
                  className="text-primary"
                  aria-label={APP_CONSTANTS.BUTTONS.REGISTER}
                >
                  {APP_CONSTANTS.BUTTONS.REGISTER}
                </Link>
              </p>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
