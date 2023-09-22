import { Link } from "react-router-dom";
import { HamburgerImage } from "@/assets/imports";
import { RoutesPath } from "@/types/router";

function Header() {
  return (
    <div className="flex md:hidden w-full bg-white shadow-sm flex items-center justify-between py-[22px] px-6">
      <Link to={RoutesPath.HOME}>
        <h1 className="text-blue text-2xl font-main-semibold tracking-[-2%]">
          HypeWize
        </h1>
      </Link>
      <img width={20} src={HamburgerImage} alt="Hamburger Menu" />
    </div>
  );
}
export default Header;
