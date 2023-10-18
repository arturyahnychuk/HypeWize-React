import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom"; // Import necessary components
import { Slider } from "../imports";
import { Screen } from "@/components/imports";
import { screenConfig } from "@/config/imports";

function AuthLayout() {

  const navigate = useNavigate();
  const [cssColorIndex, setCssColorIndex] = useState(0);
  const handleSlideChange = (swiper: any) => {
    setCssColorIndex(swiper.activeIndex)
    // swiper.slides.map((item: any) => {
    //   if (item.classList.contains("swiper-slide-active")) {
    //     let index = parseInt(item.getAttribute("data-swiper-slide-index"));
    //     setCssColorIndex(index)
    //   }
    // });
  };

  const access_token = localStorage.getItem("access_token");

  useEffect(() => {
    if (access_token) navigate("/projects");
  }, [access_token]);

  return (
    <div className="authLayout w-full h-screen grid sm:grid-cols-2">
      <div className="hidden sm:block opacity-0 sm:opacity-100 invisiblee sm:visible w-full h-full">
        <Slider
          slidesPerView={1}
          spaceBetween={0}
          autoPlay={true}
          delay={3000}
          loop={true}
          pagination={true}
          onSlideChange={handleSlideChange}
        >
          {screenConfig.map((item) => (
            <Screen
              key={item.title}
              color={item.color}
              image={item.image}
              title={item.title}
              text={item.text}
            />
          ))}
        </Slider>
      </div>
      <div className="w-full h-full">
        <div className="w-full h-full flex px-4">
          <Outlet context={[cssColorIndex]} />
        </div>
      </div>
    </div>
  );
}
export default AuthLayout;
