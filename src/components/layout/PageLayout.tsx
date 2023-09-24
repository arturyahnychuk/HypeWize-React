import { ReactNode } from "react";

interface PageLayoutProps {
  children: ReactNode;
}
function PageLayout({ children }: PageLayoutProps) {
  return <div className="relative w-full">{children}</div>;
}
export default PageLayout;
