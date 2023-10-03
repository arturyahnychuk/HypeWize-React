import { useState } from "react";
import { projectsFilterBtns } from "@/config/imports";
import { filterBtnConfigTypes } from "@/types/imports";
import { AddImage } from "@/assets/imports";
import {
  Filter,
  ProjectsCard,
  PaginationComponent,
} from "@/components/imports";

function Projects() {
  const activeFilter: string = "grid";
  const [gridSystem, setGridSystem] = useState(activeFilter);
  const handleFilter = (value: filterBtnConfigTypes["value"]) => {
    setGridSystem(value);
  };

  return (
    <div className="w-full relative h-full">
      <div className="w-full flex items-center justify-end pt-4 pb-7 sticky top-0 bg-milk z-[9999]">
        <Filter
          filterBtnConfig={projectsFilterBtns}
          active={activeFilter}
          onFilter={handleFilter}
        />
      </div>
      <div className="h-[calc(100vh-200px)] lg:h-[calc(100vh-120px)] flex flex-col justify-between items-center">
        <div
          className={`layout w-full mb-[21px] gap-5 ${
            gridSystem === "grid" ? "grid" : "list"
          }`}
        >
          <div className="parent rounded-[10px] w-full h-[240px] bg-white flex flex-col cursor-pointer hover:opacity-60 transition-all">
            <div className="main w-full flex flex-col my-auto gap-6 items-center justify-center">
              <img
                className="image"
                width={55}
                src={AddImage}
                alt="Add Image"
              />
              <p className="text mx-auto text-center px-4 text-md font-secondary-medium text-black2">
                Create New Project
              </p>
            </div>
          </div>

          <ProjectsCard title="Sample 1" text="this is sample 1 text" />
          <ProjectsCard title="Sample 2" text="this is sample 2 text" />
          <ProjectsCard title="Sample 3" text="this is sample 3 text" />
        </div>

        <div className="py-4">
        <PaginationComponent pageCount={10} />
        </div>
      </div>
    </div>
  );
}

export default Projects;
