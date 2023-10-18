import React from "react";

export interface FormLayoutProps {
  title: string;
  children: React.ReactNode[];
  onSubmit: () => void;
}
