import { useLocation } from "react-router-dom";
import { Link, NavLink } from "react-router-dom"; // Import Link from react-router-dom
import { RoutesPath } from "@/types/router"; // Import your route paths
import { Icon } from "@/components/imports";
import { CloseImage } from "@/assets/imports";
interface SidebarProps {
  navbarActive: boolean;
  onNavClose: () => void;
}
function Sidebar({ navbarActive, onNavClose }: SidebarProps) {
  const location = useLocation();
  const showHiddenPaths = [
    RoutesPath.PROJECTINFO,
    RoutesPath.PROJECTMESSAGES,
    RoutesPath.PROJECTCONTENTS,
    RoutesPath.PROJECTCONTENTS_CREATE,
  ];
  const handleNavClose = () => {
    onNavClose();
  };
  const matchesDynamicRoute = (path: string) => {
    return path.match(/^\/projects\/messages\/\d+$/); // Matches paths like /projects/messages/4, /projects/messages/2, etc.
  };
  const shouldShowHiddenLinks =
    showHiddenPaths.includes(location.pathname) ||
    matchesDynamicRoute(location.pathname);
  return (
    <aside
      className={`${
        navbarActive ? "left-0" : "left-[-300%]"
      } absolute lg:relative lg:left-0 w-full h-screen bg-white pt-6 pb-10 transition-all z-[999999]`}
    >
      <div className="w-full h-full flex flex-col justify-between ">
        <div className="w-full flex flex-col gap-6">
          <div className="pl-4 pr-6 w-full flex items-center">
            <div className="w-full flex justify-between lg:justify-center pb-6 border-b border-gray-100">
              <Link onClick={handleNavClose} to={RoutesPath.HOME}>
                <h1 className="text-blue text-2xl font-main-semibold tracking-[-2%]">
                  HypeWize
                </h1>
              </Link>
              <div
                onClick={handleNavClose}
                className="lg:hidden mt-2 flex cursor-pointer opacity-80 hover:opacity-100"
              >
                <img width={20} src={CloseImage} alt="" />
              </div>
            </div>
          </div>
          <div className="pr-2">
            <nav className="pl-4 pr-2  relative w-full h-[calc(100vh-320px)] overflow-auto custom-scrollbar">
              <ul className="w-full flex flex-col gap-3">
                <NavLink
                  onClick={handleNavClose}
                  to={RoutesPath.PROJECTS}
                  className={({ isActive }) =>
                    `${
                      isActive ? "nav-active" : ""
                    } relative flex items-center gap-3 px-4 py-3 rounded-md group hover:bg-blue transition-all`
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
                  <div className="flex items-center absolute right-[12px]">
                  <svg
                    width="13"
                    height="11"
                    viewBox="0 0 13 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.3723 6.93526H0.627716C0.280903 6.93526 0 7.21201 0 7.55371C0 7.68358 0.0408015 7.80418 0.10985 7.90313C0.139667 7.9727 0.185176 8.03764 0.241671 8.09485L3.00833 10.8191C3.13073 10.9397 3.2908 11 3.45244 11C3.61407 11 3.77414 10.9397 3.89655 10.8191C4.14136 10.5779 4.14136 10.1867 3.89655 9.944L2.095 8.17215H12.3707C12.7175 8.17215 12.9984 7.8954 12.9984 7.55371C12.9984 7.21201 12.7191 6.93526 12.3723 6.93526ZM0.627716 4.06567H12.3723C12.7191 4.06567 13 3.78891 13 3.44722C13 3.31735 12.9592 3.19675 12.8901 3.0978C12.8682 3.04677 12.8368 2.9973 12.7991 2.95092L10.5362 0.226657C10.3165 -0.0377291 9.92105 -0.0763819 9.6527 0.140075C9.38436 0.356531 9.34512 0.746152 9.56482 1.01054L11.076 2.82877H0.627716C0.280903 2.82877 0 3.10553 0 3.44722C0 3.78891 0.280903 4.06567 0.627716 4.06567Z"
                      fill="white"
                    />
                  </svg>
                  </div>
                </NavLink>
                {shouldShowHiddenLinks && (
                  <>
                    <NavLink
                      onClick={handleNavClose}
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
                      onClick={handleNavClose}
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
                        onClick={handleNavClose}
                        to={RoutesPath.PROJECTCONTENTS}
                        className={({ isActive }) =>
                          `${
                            isActive
                              ? "nav-active-additional"
                              : "nav-additional"
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
                    </div>
                  </>
                )}

                <NavLink
                  onClick={handleNavClose}
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
                  onClick={handleNavClose}
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
        </div>
        <div className="flex flex-col gap-4 pl-4 pr-6">
          <div className="pb-4 border-b border-b-gray-100">
            {!shouldShowHiddenLinks && (
              <NavLink
                onClick={handleNavClose}
                to={RoutesPath.STARTER_GUIDE}
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
          <div className="flex items-start w-full gap-3 flex-col">
            <NavLink
              onClick={handleNavClose}
              to={RoutesPath.SETTINGS}
              className={({ isActive }) =>
                `${
                  isActive ? "nav-active" : ""
                } flex w-full items-center gap-3 px-4 py-3 rounded-md group hover:bg-blue transition-all`
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
              onClick={handleNavClose}
              to="/logout"
              className={({ isActive }) =>
                `${
                  isActive ? "nav-active" : ""
                } flex w-full items-center gap-3 px-4 py-3 rounded-md group hover:bg-blue transition-all`
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
