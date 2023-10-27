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
import { useEffect, useState } from "react";
import HubSpot from "@/views/auth/HubSpot";
import Google from "@/views/auth/Google";
import { REFRESH_TOKENS_URL, USERS_URL } from "@/apis/endpoint";
import CheckoutSession from "@/views/checkout/CheckoutSession";
import { REQUEST_CONFIG } from "@/config/auth";


const ProtectedRoute: React.FC<any> = ({ component }) => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('access_token') || '';
  const refreshToken = localStorage.getItem("refresh_token") || "";
  
  const {
    decodedToken: decodedAccessToken,
    isExpired: isAccessTokenExpired
  } = useJwt(accessToken);

  const {
    decodedToken: decodedRefreshToken,
    isExpired: isRefreshTokenExpired
  } = useJwt(refreshToken);

  const { setProfileInfo } = useAuthStore();

  useEffect(() => {
    if (decodedAccessToken?.sub && !isAccessTokenExpired) {
      console.log("user id --------", decodedAccessToken?.sub);
      getUserInfo(accessToken, decodedAccessToken?.sub);
    }
    // } else if (!isRefreshTokenExpired) {
    //   refreshTokenValue();
    // } else {
    //   localStorage.setItem("access_token", "");
    //   localStorage.setItem("refresh_token", "");
    //   navigate("/auth/login");
    // }
  }, [decodedAccessToken]);

  const refreshTokenValue = () => {
    axios
      .post(`${ REFRESH_TOKENS_URL }`, {
        refreshToken: refreshToken
      },REQUEST_CONFIG)
      .then(response => {
          const { access, refresh } = response.data;

          localStorage.setItem("access_token", access.token);
          localStorage.setItem("refresh_token", refresh.token);
          getUserInfo(access.token, decodedAccessToken?.sub);
      })
      .catch(error => {
          console.log("refresh token error : ", error);
      })
  }

  const getUserInfo = (token: string, id: string) => {
      axios
        .get(`${ USERS_URL }/${id}`, REQUEST_CONFIG)
        .then(response => {
          console.log("----------------user info : ", response.data);
            setProfileInfo(response.data);
        })
        .catch(error => {
            console.log(error);
        });
  }

  if (!isAccessTokenExpired && !isRefreshTokenExpired) {
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
      {
        path: RoutesPath.CREATE_CHECKOUT_SESSION,
        element: <CheckoutSession/>
      }
    ],
  },
]);
export default routes;
