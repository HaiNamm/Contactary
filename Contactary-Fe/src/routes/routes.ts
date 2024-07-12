import { createBrowserRouter } from "react-router-dom";
import * as path from "./path";
import { lazy } from "react";

const Login = lazy(async () => import("@/pages/Login"));
const DashboardLayout = lazy(async () => import("@/layout/DashboardLayout"));
export const routes = createBrowserRouter([
  {
    path: path.LOGIN_PATH,
    Component: Login,
  },
  {
    path: "/",
    Component: DashboardLayout,
    children: [
      {
        path: path.DASHBOARD_PATH,
        Component: lazy(async () => import("@/pages/Home")),
      },
      {
        path: path.COMPANY_PATH,
        Component: lazy(async () => import("@/pages/Company")),
      },
    ],
  },
]);
