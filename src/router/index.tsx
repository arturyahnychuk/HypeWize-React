import { createBrowserRouter, redirect } from "react-router-dom";
// Views
import {
  Home,
  Projects,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
} from "@/views/imports";
// Components
import { DefaultLayout, AuthLayout } from "@/components/imports";
// Routes Path Enums
import { RoutesPath } from "@/types/imports";

const routes = createBrowserRouter([
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        loader: () => redirect("/auth/login"),
        element: <div>Login</div>,
      },
      {
        path: RoutesPath.LOGIN,
        element: <Login />,
      },
      {
        path: RoutesPath.REGISTER,
        element: <Register />,
      },
      {
        path: RoutesPath.FORGOT_PASSWORD,
        element: <ForgotPassword />,
      },
      {
        path: RoutesPath.RESET_PASSWORD,
        element: <ResetPassword />,
      },
    ],
  },
  {
    path: RoutesPath.HOME,
    element: <DefaultLayout />,
    children: [
      {
        path: RoutesPath.HOME,
        element: <Home />,
      },
      {
        path: RoutesPath.PROJECTS,
        element: <Projects />,
      },
    ],
  },
]);
export default routes;
