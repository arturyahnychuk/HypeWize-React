export type IconSet = "light" | "bold" | "two-tone" | "bulk" | "broken" | "curved";

export interface IconProps {
  icon: string;
  width?: number; // default 20
  height?: number; // default 20
  className?: string;
}
