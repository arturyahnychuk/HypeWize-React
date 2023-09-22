import { useState } from "react";
import { projectsFilterBtns } from "@/config/imports";
import { filterBtnConfigTypes } from "@/types/imports";
import {
  AddImage,
  RobotImage,
  OptionImage,
  DeleteIcon,
} from "@/assets/imports";
import { Filter } from "@/components/imports";

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
        className={`layout w-full my-[21px] grid gap-5 ${
          gridSystem === "grid" ? "grid" : "list"
        }`}
      >
        <div className="parent rounded-[10px] w-full h-[210px] bg-white flex flex-col cursor-pointer hover:opacity-60 transition-all">
          <div className="main w-full flex flex-col my-auto gap-6 items-center justify-center">
            <img className="image" width={55} src={AddImage} alt="Add Image" />
            <p className="text mx-auto text-center px-4 text-md font-secondary-medium text-black2">
              Create New Project
            </p>
          </div>
        </div>
        <div className="parent rounded-[10px] w-full h-[210px] bg-white flex flex-col">
          <div className="settings-grid group w-max h-[20px] flex justify-end delay-100 relative w-full ml-auto p-3">
            <div className="cursor-pointer w-full h-[15px] flex justify-end absolute top-3">
              <img width={2} src={OptionImage} alt="Option Image" />
            </div>
            <div className="group-hover:visible invisible absolute top-7 right-3 flex flex-col p-[3px] border border-gray-100 rounded-[5px] transition-all">
              <div className="text-xs font-secondary-regular tracking-[-2%] text-gray-300 px-4 py-2 bg-gray-200 cursor-pointer hover:opacity-80">
                Edit
              </div>
              <div className="w-full flex items-center justify-center p-2 cursor-pointer opacity-80 hover:opacity-100">
                <img width={12} src={DeleteIcon} alt="Delete Icon" />
              </div>
            </div>
          </div>
          <div className="main w-full flex flex-col my-auto gap-6 items-center justify-center">
            <img
              className="image"
              width={55}
              src={RobotImage}
              alt="Add Image"
            />
            <div className="main flex flex-col items-center gap-2">
              <p className="text-base min-w-max md:text-md font-secondary-medium text-blue">
                Sample 1
              </p>
              <p className="text-xs px-2 text-center font-secondary-regular text-gray-300">
                This is the description for this project
              </p>
            </div>
            <div className="settings-list bg-white group w-max h-[20px] flex justify-end delay-100 relative w-full ml-auto p-3">
              <div className="icon cursor-pointer w-full h-[15px] flex justify-end absolute top-3">
                <img width={2} src={OptionImage} alt="Option Image" />
              </div>
              <div className="options group-hover:visible invisible absolute top-7 right-3 flex flex-col p-[3px] border border-gray-100 rounded-[5px] transition-all">
                <div className="text-xs font-secondary-regular tracking-[-2%] text-gray-300 px-4 py-2 bg-gray-200 cursor-pointer hover:opacity-80">
                  Edit
                </div>
                <div className="w-full flex items-center justify-center p-2 cursor-pointer opacity-80 hover:opacity-100">
                  <img width={12} src={DeleteIcon} alt="Delete Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="parent rounded-[10px] w-full h-[210px] bg-white flex flex-col">
          <div className="settings-grid group w-max h-[20px] flex justify-end delay-100 relative w-full ml-auto p-3">
            <div className="cursor-pointer w-full h-[15px] flex justify-end absolute top-3">
              <img width={2} src={OptionImage} alt="Option Image" />
            </div>
            <div className="group-hover:visible invisible absolute top-7 right-3 flex flex-col p-[3px] border border-gray-100 rounded-[5px] transition-all">
              <div className="text-xs font-secondary-regular tracking-[-2%] text-gray-300 px-4 py-2 bg-gray-200 cursor-pointer hover:opacity-80">
                Edit
              </div>
              <div className="w-full flex items-center justify-center p-2 cursor-pointer opacity-80 hover:opacity-100">
                <img width={12} src={DeleteIcon} alt="Delete Icon" />
              </div>
            </div>
          </div>
          <div className="main w-full flex flex-col my-auto gap-6 items-center justify-center">
            <img
              className="image"
              width={55}
              src={RobotImage}
              alt="Add Image"
            />
            <div className="main flex flex-col items-center gap-2">
              <p className="text-base min-w-max md:text-md font-secondary-medium text-blue">
                Sample 1
              </p>
              <p className="text-xs px-2 text-center font-secondary-regular text-gray-300">
                This is the description for this project
              </p>
            </div>
            <div className="settings-list bg-white group w-max h-[20px] flex justify-end delay-100 relative w-full ml-auto p-3">
              <div className="icon cursor-pointer w-full h-[15px] flex justify-end absolute top-3">
                <img width={2} src={OptionImage} alt="Option Image" />
              </div>
              <div className="options group-hover:visible invisible absolute top-7 right-3 flex flex-col p-[3px] border border-gray-100 rounded-[5px] transition-all">
                <div className="text-xs font-secondary-regular tracking-[-2%] text-gray-300 px-4 py-2 bg-gray-200 cursor-pointer hover:opacity-80">
                  Edit
                </div>
                <div className="w-full flex items-center justify-center p-2 cursor-pointer opacity-80 hover:opacity-100">
                  <img width={12} src={DeleteIcon} alt="Delete Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="parent rounded-[10px] w-full h-[210px] bg-white flex flex-col">
          <div className="settings-grid group w-max h-[20px] flex justify-end delay-100 relative w-full ml-auto p-3">
            <div className="cursor-pointer w-full h-[15px] flex justify-end absolute top-3">
              <img width={2} src={OptionImage} alt="Option Image" />
            </div>
            <div className="group-hover:visible invisible absolute top-7 right-3 flex flex-col p-[3px] border border-gray-100 rounded-[5px] transition-all">
              <div className="text-xs font-secondary-regular tracking-[-2%] text-gray-300 px-4 py-2 bg-gray-200 cursor-pointer hover:opacity-80">
                Edit
              </div>
              <div className="w-full flex items-center justify-center p-2 cursor-pointer opacity-80 hover:opacity-100">
                <img width={12} src={DeleteIcon} alt="Delete Icon" />
              </div>
            </div>
          </div>
          <div className="main w-full flex flex-col my-auto gap-6 items-center justify-center">
            <img
              className="image"
              width={55}
              src={RobotImage}
              alt="Add Image"
            />
            <div className="main flex flex-col items-center gap-2">
              <p className="text-base min-w-max md:text-md font-secondary-medium text-blue">
                Sample 1
              </p>
              <p className="text-xs px-2 text-center font-secondary-regular text-gray-300">
                This is the description for this project
              </p>
            </div>
            <div className="settings-list bg-white group w-max h-[20px] flex justify-end delay-100 relative w-full ml-auto p-3">
              <div className="icon cursor-pointer w-full h-[15px] flex justify-end absolute top-3">
                <img width={2} src={OptionImage} alt="Option Image" />
              </div>
              <div className="options group-hover:visible invisible absolute top-7 right-3 flex flex-col p-[3px] border border-gray-100 rounded-[5px] transition-all">
                <div className="text-xs font-secondary-regular tracking-[-2%] text-gray-300 px-4 py-2 bg-gray-200 cursor-pointer hover:opacity-80">
                  Edit
                </div>
                <div className="w-full flex items-center justify-center p-2 cursor-pointer opacity-80 hover:opacity-100">
                  <img width={12} src={DeleteIcon} alt="Delete Icon" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Projects;
