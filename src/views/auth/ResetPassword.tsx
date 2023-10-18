import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useSearchParams } from "react-router-dom";
import axios from "axios";

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

  const handleResetPassword = useCallback(async () => {

    try {

      // const config = {
      //     headers: {
      //         Authorization: `Bearer ${accessToken}`,
      //     },
      // };

      const res = await axios.post(
        `${ RESET_PASSWORD_URL }?token=${searchParams.get('token')}`, {
        password: password
      }
      );

      if (res.data) {
        setConfirmResult("Google Connected Successfully");
        localStorage.setItem("access_token", res.data.tokens.access.token);
        // console.log(res.data);
        navigate("/auth/login");
      }
      else setConfirmResult("Error, please check log");

      console.log("res:", res);
    } catch (error) {
      console.log(error);
    }
  }, [searchParams, password]);

  useEffect(() => {
    console.log("confirmResult:", confirmResult);
  }, [confirmResult]);

  return (
    <FormLayout title="Reset Password" onSubmit={handleSubmit}>
      <Input
        type="password"
        placeholder="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        showhide
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
