import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  
  const getToken= () => {
    const expires = localStorage.getItem("token_expiration") || "";
    const currentTime = new Date().getTime().toString();
    console.log("expires log ---", expires);
    if(expires > currentTime) {
      return localStorage.getItem("access_token");
    } else {
      return "";
    }
  }

  useEffect(() => {
    if (getToken == "") {
      navigate("/projects");
    } else {
      navigate("/auth/login");
    }
  }, []);
  return (
    <div>
      {/* <Icon icon="star" width={20} height={20} /> */}
    </div>
  );
}

export default Home;
