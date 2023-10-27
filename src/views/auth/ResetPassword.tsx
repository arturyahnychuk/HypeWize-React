import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import { Btn, FormLayout, Input } from "@/components/imports";
import { RoutesPath } from "@/types/router";
import { screenConfig } from "@/config/imports";

import { RESET_PASSWORD_URL } from "@/apis/endpoint";

const ResetPassword = () => {
  const handleSubmit = (): void => {
    // alert("Submited");
  };
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [password, setPassword] = useState<string>("");
  const cssColorIndex: number[] = useOutletContext() || [];
  const [confirmResult, setConfirmResult] = useState<string>("");
  const colorIndex = cssColorIndex[0];

  useEffect(() => {
    console.log("confirmResult:", confirmResult);
  }, [confirmResult]);

  const handleResetPassword = useCallback(async () => {
      axios
        .post(`${ RESET_PASSWORD_URL }?token=${searchParams.get('token')}`, {
            password: password
          })
        .then(response => {
            const { tokens } = response.data;

            toast.info("Password Reset Successfully");

            setConfirmResult("Google Connected Successfully");
            localStorage.setItem("access_token", tokens.access.token);

            navigate("/auth/login");
        })
        .catch(error => {
            console.log(error);
        });
  }, [searchParams, password]);

  return (
    <FormLayout title="Reset Password" onSubmit={handleSubmit}>
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
        type="password"
        placeholder="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showhide
        inputName="resetPassword"
        updateStatus=""
      />
      <Btn
        bgStyle={screenConfig[colorIndex]?.color}
        type="submit"
        text="Submit"
        onClick={handleResetPassword}
        className="submit-btn bg-blue"
      />
      <p className="text-base font-secondary-medium text-black-50 text-center">
        Remember Password?{" "}
        <Link className="text-green" to={RoutesPath.LOGIN}>
          Log in
        </Link>
      </p>
    </FormLayout>
  );
}

export default ResetPassword;
