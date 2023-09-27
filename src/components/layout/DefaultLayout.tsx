import { Outlet } from "react-router-dom";
import { Sidebar, Header } from "../imports";
function DefaultLayout() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[233px,auto]">
      <Header />
      <Sidebar />
      <div className="w-full pl-6 pr-6 h-[calc(100vh-84px)] md:h-screen max-h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
export default DefaultLayout;
