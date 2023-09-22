import { Btn, CheckBox, FormLayout, Input } from "@/components/imports";
import { GoogleIcon } from "@/assets/imports";
import { RoutesPath } from "@/types/router";
import { Link, useOutletContext } from "react-router-dom";
import { screenConfig } from "@/config/imports";

function Register() {
  const handleSubmit = (): void => {
    alert("Submited");
  };
  const cssColorIndex: number[] = useOutletContext();
  const colorIndex = cssColorIndex[0];
  return (
    <FormLayout title="Sign up" onSubmit={handleSubmit}>
      <Input type="text" placeholder="Full name" id="full_name" />
      <Input type="text" placeholder="Email address" id="email_address" />
      <Input type="password" placeholder="Password" id="password" showhide />
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
