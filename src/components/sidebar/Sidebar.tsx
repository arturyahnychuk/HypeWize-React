import { Link, NavLink } from "react-router-dom"; // Import Link from react-router-dom
import { RoutesPath } from "@/types/router"; // Import your route paths
import { Icon } from "@/components/imports";
import { CloseImage } from "@/assets/imports";
import {
  navMenuConfig,
  guideMenuConfig,
  actionsMenuConfig,
} from "@/config/menu.config";

function Sidebar() {
  return (
    <aside className="left-[-300%] absolute md:relative md:left-0 w-full h-screen bg-white pl-4 pr-6 pt-6 pb-10 transition-all">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="w-full flex flex-col gap-6">
          <div className="flex justify-between md:justify-center w-full pb-6 border-b border-gray-100">
            <Link to={RoutesPath.HOME}>
              <h1 className="text-blue text-2xl font-main-semibold tracking-[-2%]">
                HypeWize
              </h1>
            </Link>
            <div className="md:hidden flex cursor-pointer opacity-80 hover:opacity-100">
              <img width={20} src={CloseImage} alt="" />
            </div>
          </div>
          <nav className="relative w-full">
            <ul className="w-full flex flex-col gap-3">
              {navMenuConfig.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.to}
                  className={({ isActive }) =>
                    `${
                      isActive ? "nav-active" : ""
                    } flex items-center gap-3 px-4 py-3 rounded-md group hover:bg-blue transition-all`
                  }
                >
                  <Icon
                    className="nav-icon stroke text-black group-hover:text-white transition-all"
                    icon={item.icon}
                    width={18}
                    height={18}
                  />
                  <p className="nav-text font-secondary-medium text-base text-black tracking-[-2%] group-hover:text-white transition-all">
                    {item.text}
                  </p>
                </NavLink>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <div className="pb-4 border-b border-b-gray-100">
            {guideMenuConfig.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  `${
                    isActive ? "nav-active" : ""
                  } flex items-center gap-3 px-4  group py-3 rounded-md group hover:bg-blue transition-all`
                }
              >
                <Icon
                  className="nav-icon stroke text-black group-hover:text-white transition-all"
                  icon={item.icon}
                  width={18}
                  height={18}
                />
                <p className="nav-text font-secondary-medium text-base text-black tracking-[-2%] group-hover:text-white transition-all">
                  {item.text}
                </p>
              </NavLink>
            ))}
          </div>
          <div>
            {actionsMenuConfig.map((item, index) => (
              <NavLink
                key={index}
                to={item.to}
                className={({ isActive }) =>
                  `${
                    isActive ? "nav-active" : ""
                  } flex items-center gap-3 px-4 py-3 rounded-md group hover:bg-blue transition-all`
                }
              >
                <Icon
                  className="nav-icon text-black group-hover:text-white transition-all"
                  icon={item.icon}
                  width={21}
                  height={21}
                />
                <p className="nav-text font-secondary-medium text-base text-black tracking-[-2%] group-hover:text-white transition-all">
                  {item.text}
                </p>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
