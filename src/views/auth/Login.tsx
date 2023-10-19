import { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import axios from 'axios';

import { Btn, CheckBox, FormLayout, Input } from "@/components/imports";
import { GoogleIcon } from "@/assets/imports";
import { RoutesPath } from "@/types/router";
import { screenConfig } from "@/config/imports";
import useAuthStore from "@/store/auth";

import { GOOGLE_AUTH_URL, LOGIN_API_URL } from "@/apis/endpoint";
import { LOGIN_PAGE_TITLE } from "@/config/utils";

const Login = () => {
  const navigate = useNavigate();
  const cssColorIndex: number[] = useOutletContext();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { setProfileInfo } = useAuthStore();
  
  useEffect(() => {
    document.title = LOGIN_PAGE_TITLE
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${ LOGIN_API_URL }` || "", {
            email,
            password,
        });

      setProfileInfo(response.data.user);
      localStorage.setItem("access_token", response.data.tokens.access.token);

      navigate("/projects");
    } catch (error: any) {
      console.error(error);
    }
  };

  const colorIndex = cssColorIndex[0]
  return (
    <FormLayout title="Login" onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Email address"
        id="email_address"
        onChange={(e) => { setEmail(e.target.value) }}
      />
      <Input
        type="password"
        placeholder="Password"
        id="password"
        onChange={(e) => { setPassword(e.target.value) }}
        showhide
      />
      <div className="w-full flex items-center justify-between">
        <CheckBox
          checked={false}
          onCheckChange={(isChecked) => {
            console.log("Checkbox state changed:", isChecked);
          }}
          label="Remember me"
        />
        <Link
          className="text-orange text-sm font-secondary-medium underline"
          to={RoutesPath.FORGOT_PASSWORD}
        >
          Forgot Password?
        </Link>
      </div>
      <Btn bgStyle={screenConfig[colorIndex].color} type="submit" text="Login" className="submit-btn bg-redLight" />
      <Btn
        text="Login"
        image={GoogleIcon}
        width={16}
        height={16}
        onClick={() => location.replace(`${ GOOGLE_AUTH_URL }`)}
        className="submit-btn text-black border border-gray-100 bg-transparent"
      />
      <p className="text-base font-secondary-medium text-black-50 text-center">
        Don’t have an account?{" "}
        <Link className="text-green" to={RoutesPath.REGISTER}>
          Sign Up
        </Link>
      </p>
    </FormLayout>
  );
}

export default Login;
