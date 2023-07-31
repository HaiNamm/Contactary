import { createBrowserRouter } from "react-router-dom";
import * as path from "./path";
import { lazy } from "react";

const Login = lazy(async () => import("@/pages/Login"));

export const routes = createBrowserRouter([
  {
    path: path.LOGIN_PATH,
    Component: Login,
  },
  {
    path: path.DASHBOARD_PATH,
    Component: lazy(async () => import("@/pages/Dashboard")),
  }
]);
