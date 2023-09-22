import { filterBtnConfigTypes } from "@/types/config/filterBtnConfig.types";

export const projectsFilterBtns: filterBtnConfigTypes[] = [
  {
    text: "Grid",
    icon: true,
    name: "category",
    width: 12,
    height: 12,
    value: "grid", // to detect which filter is active
  },
  {
    text: "List",
    icon: true,
    name: "list",
    width: 12,
    height: 12,
    value: "list", // to detect which filter is active
  },
];
