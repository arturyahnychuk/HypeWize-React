import { useCallback, useState, useEffect } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

import { Btn, CheckBox, FormLayout, Input } from "@/components/imports";
import { GoogleIcon } from "@/assets/imports";
import { RoutesPath } from "@/types/router";
import { screenConfig } from "@/config/imports";
import useAuthStore from "@/store/auth";

import { REGISTER_API_URL } from "@/apis/endpoint";
import { REGISTER_PAGE_TITLE } from "@/config/utils";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const cssColorIndex: number[] = useOutletContext();
  const navigate = useNavigate();
  const { setProfileInfo } = useAuthStore();

  const colorIndex = cssColorIndex[0];

 useEffect(() => {
    document.title = REGISTER_PAGE_TITLE;
 }, [])

  const handleSubmit = useCallback(() => {
      axios.post(
        `${ REGISTER_API_URL }` || "", {
            email,
            password,
            firstname
        }).then(response => {
          const { user, tokens } = response.data;

          const { access_token } = tokens.access;
          const { refresh_token } = tokens.refresh;

          setProfileInfo(user);
          localStorage.setItem("access_token", access_token);
          localStorage.setItem("refresh_token", refresh_token);
          navigate("/projects");

        }).catch(error => {
            console.log(error.response.data.message);
            toast.error("Sign up Failed");
        });

      // if (registerResponse.data?.user?.email) {

      //   const config = {
      //     headers: {
      //       Authorization: `Bearer ${registerResponse.data.tokens.access.token}`,
      //     },
      //   };

      //   await axios.post(
      //     `${import.meta.env.VITE_API_ENDPOINT}/auth/send-verification-email` || "",
      //     { email },
      //     config
      //   ).then(() => {
      //     console.log("Verification Email Sent!");
      //   }).catch((err) => {
      //     console.log(err);
      //   });
      // }

  }, [email, firstname, password]);

  return (
    <FormLayout title="Sign up" onSubmit={handleSubmit}>
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
        onChange={(e) => setFirstname(e.target.value)}
        placeholder="Full name"
        id="full_name"
        inputName="FirstName"
        updateStatus=""
      />
      <Input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        id="email_address"
        inputName="email"
        updateStatus=""
      />
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        id="password" showhide
        updateStatus=""
        inputName="password"
      />
      <CheckBox
        checked={true} // Provide the initial state as a prop
        onCheckChange={(isChecked) => {
          // Handle the updated state in the parent component
          console.log("Checkbox state changed:", isChecked);
        }}
        label="<p>I agree with <a href='#'>Terms</a> and <a href='#'>Privacy</a></p>"
      />
      <Btn
        bgStyle={screenConfig[colorIndex].color}
        type="submit"
        text="Submit"
        className="submit-btn bg-redLight"
      />
      <Btn
        text="Sign Up"
        image={GoogleIcon}
        width={16}
        height={16}
        onClick={() => alert("Google Authentication")}
        className="submit-btn text-black border border-gray-100 bg-transparent"
      />
      <p className="text-base font-secondary-medium text-black-50 text-center">
        Already have an account?{" "}
        <Link className="text-green" to={RoutesPath.LOGIN}>
          Login
        </Link>
      </p>
    </FormLayout>
  );
}

export default Register;
