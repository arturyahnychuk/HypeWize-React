import { useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";

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
  const [error, setError] = useState({email: "", password: ""});

  useEffect(() => {
    document.title = LOGIN_PAGE_TITLE;
  }, []);

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    setError({});
  }

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    setError({});
  }

  const handleSubmit = () => {
    if(email && password) {
      axios
        .post(`${ LOGIN_API_URL }` || "", {
            email,
            password,
        })
        .then(response => {
          const { user, tokens } = response.data;

          console.log("test response --------", tokens);
          setProfileInfo(user);

          localStorage.setItem("access_token", tokens.access.token);
          localStorage.setItem("refresh_token", tokens.refresh.token);

          navigate("/projects");
        }).catch(error => {
          const { code, message } = error.response.data;
          console.log(code, message);
          if(code == 401) {
            setError({
              email : "incorrect email",
              password : "incorrect password"
            });
          }
          toast.error("Login Failed");
        });
    } else {
      const errors = {email : "", password : ""};
      if(email == "")
        errors.email = "email can't be empty";
      if(password == "")
        errors.password = "password can't be empty";

      setError(errors);
    }
  };

  const colorIndex = cssColorIndex[0]
  return (
    <FormLayout title="Login" onSubmit={handleSubmit}>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Input
        type="text"
        placeholder="Email address"
        id="email_address"
        onChange={e => handleChangeEmail(e)}
        inputName="email"
        updateStatus=""
        error={ error.email }
      />
      <Input
        type="password"
        placeholder="Password"
        id="password"
        onChange={e => handleChangePassword(e)}
        showhide
        inputName="password"
        updateStatus=""
        error={ error.password }
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
      <Btn
        bgStyle={screenConfig[colorIndex].color} 
        type="submit"
        text="Login"
        className="submit-btn bg-redLight" />
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
