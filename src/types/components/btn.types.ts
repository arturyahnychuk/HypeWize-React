import { IconSet } from "./icon.types";

export interface BtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  type?: "button" | "submit" | "reset";
  className?: string;
  icon?: boolean;
  image?: string;
  width?: number;
  height?: number;
  name?: string;
  bgStyle?: string;
  iconNext?: boolean;
}
