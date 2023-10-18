import { Navigate, createBrowserRouter, redirect, useNavigate } from "react-router-dom";
import { useJwt } from "react-jwt";
// Views
import {
  // auth pages
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  VerifyEmail,
  // other pages
  Home,
  Projects,
  ProjectInfo,
  ProjectMessages,
  Chatbot,
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
import axios from "axios";
import useAuthStore from "@/store/auth";
import { useEffect } from "react";
import HubSpot from "@/views/auth/HubSpot";
import Google from "@/views/auth/Google";
import { USERS_URL } from "@/apis/endpoint";


const ProtectedRoute: React.FC<any> = ({ component }) => {

  const accessToken = localStorage.getItem('access_token') || '';
  const { decodedToken, isExpired } = useJwt(accessToken);
  const { setProfileInfo } = useAuthStore();
  const navigate = useNavigate();

  const getUserInfo = async (token: string, id: string) => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${ USERS_URL }/${id}`,
        config
      );

      setProfileInfo(response.data);

    } catch (error: any) {
      console.log("error:", error);
    }

  }

  useEffect(() => {
    // @ts-ignore
    if (decodedToken?.sub && !isExpired) { getUserInfo(accessToken, decodedToken?.sub); }
  }, [decodedToken]);

  if (accessToken && !isExpired) {
    return <>{component}</>;
  } else {
    return <Navigate to="/auth/login" replace />;
  }
};

const routes = createBrowserRouter([
  {
    path: RoutesPath.CHATBOT + "/" + ":id",
    element: <Chatbot />,
  },
  {
    path: RoutesPath.HubSpotConnectConfirm,
    element: <HubSpot />,
  },
  {
    path: RoutesPath.GoogleConnectConfirm,
    element: <Google />,
  },

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
      {
        path: RoutesPath.VERIFYEMAIL,
        element: <VerifyEmail />,
      },

    ],
  },
  {
    path: RoutesPath.HOME,
    element: <ProtectedRoute component={<DefaultLayout />} />,
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
        path: RoutesPath.PROJECTINFO + "/:id",
        element: <ProjectInfo />,
      },
      {
        path: RoutesPath.PROJECTMESSAGES + "/:id",
        element: <ProjectMessages />,
      },
      {
        path: RoutesPath.PROJECTMESSAGESSINGLE + "/:id",
        element: <MessagesSingle />,
      },
      {
        path: RoutesPath.PROJECTCONTENTS + "/:id",
        element: <ContentsPage />,
      },
      {
        path: RoutesPath.PROJECTCONTENTS_CREATE + "/:id",
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
        element: <StarterPage />,
      },
    ],
  },
]);
export default routes;
