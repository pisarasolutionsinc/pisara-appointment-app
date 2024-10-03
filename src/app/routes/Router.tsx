import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Routes from "./Routes";
import { AuthProvider } from "../contexts/AuthContext";

const router = createBrowserRouter(Routes);

const Router = () => {
  return (
    <>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};

export default Router;
