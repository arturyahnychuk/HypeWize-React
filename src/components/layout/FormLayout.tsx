import { FormLayoutProps } from "@/types/imports";
import React from "react";

function FormLayout({ title, children, onSubmit }: FormLayoutProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="w-full max-w-[328px] m-auto flex flex-col gap-5">
      <h4 className="text-black font-secondary-semibold text-2xl text-center">
        {title}
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-5">{children}</div>
      </form>
    </div>
  );
}

export default FormLayout;
