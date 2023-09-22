import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { SliderProps } from "@/types/imports";

function Slider({
  spaceBetween = 20,
  slidesPerView = 4,
  autoPlay = true,
  delay = 3000,
  loop = false,
  pagination = false,
  onSlideChange,
  onSlideChangeTransitionEnd,
  children,
}: SliderProps) {
  const handleChange = (swiper: any) => {
    if (onSlideChange) {
      onSlideChange(swiper);
    }
    if(onSlideChangeTransitionEnd) {
      onSlideChangeTransitionEnd(swiper)
    }
  };
  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      autoplay={
        autoPlay ? { delay: delay, disableOnInteraction: false } : false
      }
      loop={false}
      spaceBetween={spaceBetween}
      slidesPerView={slidesPerView}
      pagination={pagination ? { clickable: true } : false}
      onSlideChange={handleChange}
      onSlideChangeTransitionEnd={handleChange}
    >
      {children.map((child, index) => (
        <SwiperSlide key={index}>{child}</SwiperSlide>
      ))}
    </Swiper>
  );
}

export default Slider;
