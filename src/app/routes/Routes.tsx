import { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { routeConfig } from "../config/routesConfig";
import Error404 from "../pages/Errors/Error404";
import Login from "../pages/Other/Login";
import Register from "../pages/Other/Register";
import ProtectedRoute from "./ProtectedRoute";

const Routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    element: <MainLayout />,
    children: routeConfig.MAIN,
  },
  {
    element: <ProtectedRoute allowedRoles={["admin", "user"]} />,
    children: [
      {
        element: <MainLayout />,
        children: routeConfig.PROTECTED,
      },
    ],
  },

  { path: "*", element: <Error404 /> },
];

export default Routes;
