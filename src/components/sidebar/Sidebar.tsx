import { useLocation } from "react-router-dom";
import { Link, NavLink } from "react-router-dom"; // Import Link from react-router-dom
import { RoutesPath } from "@/types/router"; // Import your route paths
import { Icon } from "@/components/imports";
import { CloseImage } from "@/assets/imports";

function Sidebar() {
  const location = useLocation();
  const showHiddenPaths = [
    RoutesPath.PROJECTINFO,
    RoutesPath.PROJECTMESSAGES,
    RoutesPath.PROJECTCONTENTS,
    RoutesPath.PROJECTCONTENTS_CREATE
  ];
  const matchesDynamicRoute = (path: string) => {
    return path.match(/^\/projects\/messages\/\d+$/); // Matches paths like /projects/messages/4, /projects/messages/2, etc.
  };
  const shouldShowHiddenLinks =
    showHiddenPaths.includes(location.pathname) ||
    matchesDynamicRoute(location.pathname);
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
              <NavLink
                to={RoutesPath.PROJECTS}
                className={({ isActive }) =>
                  `${
                    isActive ? "nav-active" : ""
                  } flex items-center gap-3 px-4 py-3 rounded-md group hover:bg-blue transition-all`
                }
              >
                <Icon
                  className="nav-icon stroke text-black group-hover:text-white transition-all"
                  icon="category"
                  width={18}
                  height={18}
                />
                <p className="nav-text font-secondary-medium text-base text-black tracking-[-2%] group-hover:text-white transition-all">
                  Projects
                </p>
              </NavLink>
              {shouldShowHiddenLinks && (
                <>
                  <NavLink
                    to={RoutesPath.PROJECTINFO}
                    className={({ isActive }) =>
                      `${
                        isActive ? "nav-active-additional" : "nav-additional"
                      } flex items-center gap-3 px-4 py-3 rounded-md group hover:bg-blue transition-all`
                    }
                  >
                    <Icon
                      className="nav-icon stroke text-black group-hover:text-white transition-all"
                      icon="info"
                      width={18}
                      height={18}
                    />
                    <p className="nav-text font-secondary-medium text-base text-black tracking-[-2%] group-hover:text-white transition-all">
                      Info
                    </p>
                  </NavLink>
                  <NavLink
                    to={RoutesPath.PROJECTMESSAGES}
                    className={({ isActive }) =>
                      `${
                        isActive ? "nav-active-additional" : "nav-additional"
                      } flex items-center gap-3 px-4 py-3 rounded-md group hover:bg-blue transition-all`
                    }
                  >
                    <Icon
                      className="nav-icon stroke text-black group-hover:text-white transition-all"
                      icon="message"
                      width={18}
                      height={18}
                    />
                    <p className="nav-text font-secondary-medium text-base text-black tracking-[-2%] group-hover:text-white transition-all">
                      messages
                    </p>
                  </NavLink>
                  <div className="relative border-b pb-3">
                    <NavLink
                      to={RoutesPath.PROJECTCONTENTS}
                      className={({ isActive }) =>
                        `${
                          isActive ? "nav-active-additional" : "nav-additional"
                        } flex items-center gap-3 px-4 py-3 rounded-md group hover:bg-blue transition-all`
                      }
                    >
                      <Icon
                        className="nav-icon stroke text-black group-hover:text-white transition-all"
                        icon="content"
                        width={18}
                        height={18}
                      />
                      <p className="nav-text font-secondary-medium text-base text-black tracking-[-2%] group-hover:text-white transition-all">
                        Contents
                      </p>
                    </NavLink>
                    {location.pathname === RoutesPath.PROJECTCONTENTS || location.pathname === RoutesPath.PROJECTCONTENTS_CREATE ? (
                      <Link
                        to={RoutesPath.PROJECTCONTENTS_CREATE}
                        className="absolute top-[50%] translate-y-[-80%] right-3 hover:scale-[1.1] ml-auto transition-all w-[18px] h-[18px] rounded-full bg-blue flex items-center justify-center"
                      >
                        <Icon
                          className="nav-icon additional text-white stroke transition-all"
                          icon="add"
                          width={10}
                          height={10}
                        />
                      </Link>
                    ): <></>}
                  </div>
                </>
              )}

              <NavLink
                to={RoutesPath.BILLINGS}
                className={({ isActive }) =>
                  `${
                    isActive ? "nav-active" : ""
                  } flex items-center gap-3 px-4 py-3 rounded-md group hover:bg-blue transition-all`
                }
              >
                <Icon
                  className="nav-icon stroke text-black group-hover:text-white transition-all"
                  icon="wallet"
                  width={18}
                  height={18}
                />
                <p className="nav-text font-secondary-medium text-base text-black tracking-[-2%] group-hover:text-white transition-all">
                  Billings
                </p>
              </NavLink>
              <NavLink
                to={RoutesPath.USAGE}
                className={({ isActive }) =>
                  `${
                    isActive ? "nav-active" : ""
                  } flex items-center gap-3 px-4 py-3 rounded-md group hover:bg-blue transition-all`
                }
              >
                <Icon
                  className="nav-icon stroke text-black group-hover:text-white transition-all"
                  icon="chart"
                  width={18}
                  height={18}
                />
                <p className="nav-text font-secondary-medium text-base text-black tracking-[-2%] group-hover:text-white transition-all">
                  Usage
                </p>
              </NavLink>
            </ul>
          </nav>
        </div>
        <div className="flex flex-col gap-4">
          <div className="pb-4 border-b border-b-gray-100">
            {!shouldShowHiddenLinks && (
              <NavLink
                to="/guide"
                className={({ isActive }) =>
                  `${
                    isActive ? "nav-active" : ""
                  } flex items-center gap-3 px-4  group py-3 rounded-md group hover:bg-blue transition-all`
                }
              >
                <Icon
                  className="nav-icon stroke text-black group-hover:text-white transition-all"
                  icon="star"
                  width={18}
                  height={18}
                />
                <p className="nav-text font-secondary-medium text-base text-black tracking-[-2%] group-hover:text-white transition-all">
                  Starter Guide
                </p>
              </NavLink>
            )}
          </div>
          <div>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                `${
                  isActive ? "nav-active" : ""
                } flex items-center gap-3 px-4 py-3 rounded-md group hover:bg-blue transition-all`
              }
            >
              <Icon
                className="nav-icon text-black group-hover:text-white transition-all"
                icon="setting"
                width={21}
                height={21}
              />
              <p className="nav-text font-secondary-medium text-base text-black tracking-[-2%] group-hover:text-white transition-all">
                Settings
              </p>
            </NavLink>
            <NavLink
              to="/logout"
              className={({ isActive }) =>
                `${
                  isActive ? "nav-active" : ""
                } flex items-center gap-3 px-4 py-3 rounded-md group hover:bg-blue transition-all`
              }
            >
              <Icon
                className="nav-icon text-black group-hover:text-white transition-all"
                icon="logout"
                width={21}
                height={21}
              />
              <p className="nav-text font-secondary-medium text-base text-black tracking-[-2%] group-hover:text-white transition-all">
                Logout
              </p>
            </NavLink>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
