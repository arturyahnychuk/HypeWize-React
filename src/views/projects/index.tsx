import { useState } from "react";
import { projectsFilterBtns } from "@/config/imports";
import { filterBtnConfigTypes } from "@/types/imports";
import { AddImage } from "@/assets/imports";
import { Filter, ProjectsCard } from "@/components/imports";

function Projects() {
  const activeFilter: string = "grid";
  const [gridSystem, setGridSystem] = useState(activeFilter);
  const handleFilter = (value: filterBtnConfigTypes["value"]) => {
    setGridSystem(value);
  };

  return (
    <div className="w-full">
      <div className="w-full flex items-center justify-end">
        <Filter
          filterBtnConfig={projectsFilterBtns}
          active={activeFilter}
          onFilter={handleFilter}
        />
      </div>

      <div
        className={`layout w-full my-[21px] gap-5 ${
          gridSystem === "grid" ? "grid" : "list"
        }`}
      >
        <div className="parent rounded-[10px] w-full h-[240px] bg-white flex flex-col cursor-pointer hover:opacity-60 transition-all">
          <div className="main w-full flex flex-col my-auto gap-6 items-center justify-center">
            <img className="image" width={55} src={AddImage} alt="Add Image" />
            <p className="text mx-auto text-center px-4 text-md font-secondary-medium text-black2">
              Create New Project
            </p>
          </div>
        </div>

        <ProjectsCard title="Sample 1" text="this is sample 1 text" />
        <ProjectsCard title="Sample 2" text="this is sample 2 text" />
        <ProjectsCard title="Sample 3" text="this is sample 3 text" />
      </div>
    </div>
  );
}

export default Projects;
