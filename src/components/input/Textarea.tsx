import React, { TextareaHTMLAttributes } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  showhide?: boolean; // additional
  className?: string;
  classNameForParent? : string,
}

const Textarea: React.FC<TextareaProps> = ({ className, classNameForParent, ...props }) => {
  return (
    <div className={`${classNameForParent ? classNameForParent : ''} relative w-full textarea-parent flex`}>
      <textarea
        className={`resize-none w-full font-secondary-regular text-sm placeholder:text-gray-300 px-[19px] py-[15px] bg-transparent rounded-[6px] border border-gray-100 focus:border-gray-300 outline-none transition-all ${className}`}
        {...props}
      />
    </div>
  );
};

export default Textarea;
