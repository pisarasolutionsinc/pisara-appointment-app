import { RouteObject } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { routeConfig } from "../config/routesConfig";
import Error404 from "../pages/Errors/Error404";

const Routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: routeConfig.MAIN,
  },

  { path: "*", element: <Error404 /> },
];

export default Routes;
