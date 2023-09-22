import { RoutesPath } from "@/types/router";
import { menuConfigTypes } from "@/types/config/menuConfig.types";

export const navMenuConfig: menuConfigTypes[] = [
  {
    to: RoutesPath.PROJECTS,
    text: "Projects",
    icon: "category",
  },
  {
    to: "/blabla",
    text: "Billings",
    icon: "wallet",
  },
  {
    to: "/blablabla",
    text: "Usage",
    icon: "chart",
  },
];

export const guideMenuConfig: menuConfigTypes[] = [
  {
    to: "/guide",
    text: "Starter Guide",
    icon: "star",
  },
];

export const actionsMenuConfig: menuConfigTypes[] = [
  {
    to: "/settings",
    text: "Settings",
    icon: "setting",
  },
  {
    // later will change to do action
    to: "/logout",
    text: "Logout",
    icon: "logout",
  },
];
