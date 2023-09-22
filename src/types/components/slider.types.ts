import React from "react";
import { SwiperEvents } from "swiper/types";

export interface SliderProps {
  spaceBetween?: number;
  slidesPerView?: number;
  autoPlay?: boolean;
  delay?: number;
  loop?: boolean;
  pagination?: boolean;
  onSlideChange?: (swiper: SwiperEvents) => void;
  onSlideChangeTransitionEnd?: (swiper: SwiperEvents) => void;
  children: React.ReactNode[];
}
