import { EyeHide, EyeShow } from "@/assets/imports";
import React, { InputHTMLAttributes, useState } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  showhide?: boolean; // additional
  className?: string;
  updateStatus?: string | null;
  inputName?: string;
}

const Input: React.FC<InputProps> = ({
  className='',
  updateStatus,
  inputName,
  showhide = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowHide = (e: React.MouseEvent<HTMLDivElement>) => {
    let showHide = !showPassword;
    let target = e.target as Element;
    let input = target.closest(".input-parent")?.querySelector("input");
    if (input) {
      if (showHide) {
        input.type = "text";
      } else {
        input.type = "password";
      }
    }

    setShowPassword(showHide);
  };

  return (
    <div className="relative w-full input-parent">
      <input
        className={`w-full font-secondary-regular text-sm placeholder:text-gray-300 px-[19px] py-[15px] bg-transparent rounded-[6px] border border-gray-100 focus:border-gray-300 outline-none transition-all ${className} ${ updateStatus === inputName ? "bg-emerald-300 transition ease-in-out duration-500" : ""}`}
        {...props}
      />
      {showhide && (
        <div
          onClick={handleShowHide}
          className="absolute right-[15px] top-[50%] translate-y-[-50%] cursor-pointer active:scale-[0.98] transition-all"
        >
          {showPassword ? (
            <img src={EyeShow} alt="Show Password" />
          ) : (
            <img src={EyeHide} alt="Hide Password" />
          )}
        </div>
      )}
    </div>
  );
};

export default Input;
