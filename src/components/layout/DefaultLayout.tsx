import { Outlet } from "react-router-dom";
import { Sidebar, Header } from "../imports";
import { useState } from "react";
function DefaultLayout() {
  const [navbarActive, setNavbarActive] = useState(false)
  const handleClick = ()=> {
    let currentVal = navbarActive
    setNavbarActive(!currentVal)
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-[233px,auto]">
      <Header onClick={handleClick}/>
      <Sidebar onNavClose={handleClick} navbarActive={navbarActive}/>
      <div className="w-full pl-6 pr-6 h-[calc(100vh-84px)] md:h-screen max-h-screen overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}
export default DefaultLayout;
