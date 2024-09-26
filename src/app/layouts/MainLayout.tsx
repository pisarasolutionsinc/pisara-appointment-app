import { Outlet } from "react-router-dom";
import Header from "../components/others/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="bg-secondary">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
