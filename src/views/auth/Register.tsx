import { useCallback, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import axios from "axios";

import { Btn, CheckBox, FormLayout, Input } from "@/components/imports";
import { GoogleIcon } from "@/assets/imports";
import { RoutesPath } from "@/types/router";
import { screenConfig } from "@/config/imports";

import { REGISTER_API_URL } from "@/apis/endpoint";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [firstname, setFirstname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  
  const cssColorIndex: number[] = useOutletContext();
  const navigate = useNavigate();
  const colorIndex = cssColorIndex[0];

  const handleSubmit = useCallback(async () => {
    axios.post(
      `${ REGISTER_API_URL }` || "", {
          email,
          password,
          firstname
      }).then(response => {
        console.log("Register Result:", response.data);
        if(response.data.user)
          navigate("/projects");
        else
          alert(response.data.message);
      }).catch(error => {
        console.log(error.response.data.message);
        alert(error.response.data.message);
      });

    console.log("Register Result:");

  }, [email, firstname, password]);

  return (
    <FormLayout title="Sign up" onSubmit={handleSubmit}>
      <Input
        type="text"
        onChange={(e) => setFirstname(e.target.value)}
        placeholder="Full name"
        id="full_name"
      />
      <Input
        type="text"
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email address"
        id="email_address"
      />
      <Input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        id="password" showhide
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
