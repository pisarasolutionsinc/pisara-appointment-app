import { Link, useNavigate } from "react-router-dom";
import { APP_CONSTANTS, WEBAPP } from "../../config/config";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { getDisplayName } from "../../utils/common";
import Button from "../buttons/Button";
import { useToast } from "../../contexts/ToastProvider";
import LinkButton from "../buttons/LinkButton";
import { IoIosArrowDown } from "react-icons/io";
import useProject from "../../hooks/useProject";

const Header = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const authContext = useContext(AuthContext);
  const user = authContext?.user;
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { currentProject } = useProject();

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handleLogout = async () => {
    try {
      authContext?.logout();
      showToast("Successfully logged out.", "success", "top-20 right-10");
      navigate("/");
    } catch (error) {
      showToast(
        "Error logging out. Please try again.",
        "error",
        "top-20 right-10"
      );
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <header className="fixed w-full bg-white p-3 z-30 flex items-center justify-between gap-5">
        <Link to={"/"} className="flex items-center gap-5">
          <img
            src={currentProject?.image || WEBAPP.LOGO}
            alt={currentProject?.name || WEBAPP.NAME}
            width={35}
          />
          <h1 className="text-black font-bold">
            {currentProject?.name || WEBAPP.NAME}
          </h1>
        </Link>
        <div className="flex items-center gap-2">
          {!user ? (
            <LinkButton path="/login" className="bg-primary text-white">
              {APP_CONSTANTS.BUTTONS.LOGIN}
            </LinkButton>
          ) : (
            <>
              <div className="relative">
                <div className="flex gap-2">
                  <p className="text-black">{getDisplayName(user)}</p>
                  <Button className="p-1" onClick={togglePanel}>
                    <IoIosArrowDown
                      className={`transition-transform ${
                        isPanelOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </div>
                {isPanelOpen && (
                  <div className="absolute top-7 right-0 bg-white w-fit border rounded-xl p-3 space-y-3">
                    <p className="font-semibold text-black">{user.email}</p>
                    <hr />
                    <Button
                      className="px-0 w-full text-start py-1"
                      onClick={handleLogout}
                    >
                      {APP_CONSTANTS.BUTTONS.LOGOUT}
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
