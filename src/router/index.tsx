import { createBrowserRouter, redirect } from "react-router-dom";
// Views
import {
  // auth pages
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  // other pages
  Home,
  Projects,
  ProjectInfo,
  ProjectMessages,
  MessagesSingle,
  ContentsPage,
  BillingsPage,
  ContentCreatePage,
  UsagePage,
  
  SettingsPage,
  StarterPage,
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
      {
        path: RoutesPath.PROJECTINFO,
        element: <ProjectInfo />,
      },
      {
        path: RoutesPath.PROJECTMESSAGES,
        element: <ProjectMessages />,
      },
      {
        path: RoutesPath.PROJECTMESSAGESSINGLE,
        element: <MessagesSingle />,
      },
      {
        path: RoutesPath.PROJECTCONTENTS,
        element: <ContentsPage />,
      },
      {
        path: RoutesPath.PROJECTCONTENTS_CREATE,
        element: <ContentCreatePage />,
      },
      {
        path: RoutesPath.BILLINGS,
        element: <BillingsPage />,
      },
      {
        path: RoutesPath.USAGE,
        element: <UsagePage />,
      },
      {
        path: RoutesPath.SETTINGS,
        element: <SettingsPage />,
      },
      {
        path: RoutesPath.STARTER_GUIDE,
        element: <StarterPage />
      }
    ],
  },
]);
export default routes;
