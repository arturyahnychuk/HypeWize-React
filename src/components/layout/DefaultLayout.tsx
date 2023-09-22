import { Outlet } from "react-router-dom";
import { Sidebar, Header } from "../imports";
function DefaultLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[233px,auto]">
      <Header />
      <Sidebar />
      <div className="w-full pt-5 pl-6 pr-6 pb-8">
        <Outlet />
      </div>
    </div>
  );
}
export default DefaultLayout;
