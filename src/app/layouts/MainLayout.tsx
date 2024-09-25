import { Outlet } from "react-router-dom";
import Header from "../components/others/Header";

const MainLayout = () => {
  return (
    <>
      <Header />
      <main className="h-screen bg-secondary">
        <Outlet />
      </main>
    </>
  );
};

export default MainLayout;
