import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/others/Header";

const MainLayout = () => {
  const location = useLocation();

  const isAppointmentPage = location.pathname === "/appointment";

  return (
    <>
      <Header />
      <main className={`${isAppointmentPage ? "bg-accent" : "bg-secondary"} min-h-screen`}>
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
