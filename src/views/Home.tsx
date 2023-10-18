import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate = useNavigate();
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    if (!accessToken) {
      navigate("/auth/login");
    } else {
      navigate("/projects");
    }
  }, []);
  return (
    <div>
      {/* <Icon icon="star" width={20} height={20} /> */}
    </div>
  );
}

export default Home;
