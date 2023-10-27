import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { Btn, FormLayout, Input } from "@/components/imports";
import { RoutesPath } from "@/types/router";
import { screenConfig } from "@/config/imports";

import { FORGOT_PASSWORD_URL } from "@/apis/endpoint";

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>("");

  const handleSubmit = () => {
    if (!email) return;

    axios.post(
      `${ FORGOT_PASSWORD_URL }` || "",
      { email: email },
    ).then(() => {
      toast.success("Email Successfully Sent");
      console.log("Reset Password Email Sent!");
    }).catch((err) => {
      toast.error("Email Send Error!");
      console.log(err);
    });
  };

  const cssColorIndex: number[] = useOutletContext();
  const colorIndex = cssColorIndex[0];

  return (
    <FormLayout title="Forgot Password" onSubmit={handleSubmit}>
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
        type="email" 
        placeholder="Email address" 
        id="email_address" 
        onChange={(e) => setEmail(e.target.value)} 
        inputName="email"
        updateStatus=""/>
      <Btn bgStyle={screenConfig[colorIndex].color} type="submit" text="Send Email" className="submit-btn bg-blue" />
      <p className="text-base font-secondary-medium text-black-50 text-center">
        Remember Password?{" "}
        <Link className="text-green" to={RoutesPath.LOGIN}>
          Log in
        </Link>
      </p>
    </FormLayout>
  );
}

export default ForgotPassword;
