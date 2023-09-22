import { Btn, FormLayout, Input } from "@/components/imports";
import { RoutesPath } from "@/types/router";
import { Link, useOutletContext } from "react-router-dom";
import { screenConfig } from "@/config/imports";

function ResetPassword() {
  const handleSubmit = (): void => {
    alert("Submited");
  };
  const cssColorIndex: number[] = useOutletContext();
  const colorIndex = cssColorIndex[0];
  return (
    <FormLayout title="Reset Password" onSubmit={handleSubmit}>
      <Input type="password" placeholder="password" id="password" showhide />
      <Btn
        bgStyle={screenConfig[colorIndex].color}
        type="submit"
        text="Send Email"
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
