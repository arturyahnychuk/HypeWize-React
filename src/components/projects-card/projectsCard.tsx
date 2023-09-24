import { RobotImage, OptionImage, DeleteIcon } from "@/assets/imports";
import { ChangeEvent, useState } from "react";
import { Btn, Input, Textarea } from "../imports";
import { Link } from "react-router-dom";
import { RoutesPath } from "@/types/router";

interface ProjectsCardTypes {
  title: string;
  text: string;
}
function ProjectsCard({ title, text }: ProjectsCardTypes) {
  const [editMode, setEditMode] = useState(false);
  const [titleVal, setTitleVal] = useState(title);
  const [textVal, setTextVal] = useState(text);
  const handleEditMode = (e: any) => {
    e.preventDefault()
    setEditMode(true);
  };
  const handleDelete = (e: any) => {
    e.preventDefault()
    alert("Delete");
  };
  const handleTextInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextVal(e.target.value);
  };
  const handleTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleVal(e.target.value);
  };
  const cancel = (e: any) => {
    e.preventDefault()
    setEditMode(false);
  };
  const save = (e: any) => {
    e.preventDefault()
    alert("save");
  };
  return (
    <Link to={RoutesPath.PROJECTINFO} className="parent rounded-[10px] w-full h-[240px] bg-white flex flex-col">
      {!editMode ? (
        <div className="settings-grid group w-max h-[20px] flex justify-end delay-100 relative w-full ml-auto p-3">
          <div className="cursor-pointer w-full h-[15px] flex justify-end absolute top-3">
            <img width={2} src={OptionImage} alt="Option Image" />
          </div>
          <div className="group-hover:visible bg-white invisible absolute top-7 right-3 flex flex-col p-[3px] border border-gray-100 rounded-[5px] transition-all">
            <div
              onClick={handleEditMode}
              className="text-xs font-secondary-regular tracking-[-2%] text-gray-300 px-4 py-2 bg-gray-200 cursor-pointer hover:opacity-80"
            >
              Edit
            </div>
            <div
              onClick={handleDelete}
              className="w-full flex items-center justify-center p-2 cursor-pointer opacity-80 hover:opacity-100"
            >
              <img width={12} src={DeleteIcon} alt="Delete Icon" />
            </div>
          </div>
        </div>
      ) : (
        <div className="actions-grid justify-between flex px-4 py-2 items-center">
          <Btn
            onClick={cancel}
            text="cancel"
            className="action-btn danger !p-0"
          />
          <Btn
            onClick={save}
            text="save"
            className="action-btn border border-green px-3 !py-1 hover:bg-green success transition-all"
          />
        </div>
      )}

      <div
        className={`${
          editMode ? "edit-mode" : ""
        } main body w-full flex flex-col my-auto gap-6 items-center justify-center`}
      >
        <div className="head items-center">
          <img className="image" width={55} src={RobotImage} alt="Add Image" />
          <div className="main w-full flex flex-col items-center gap-2 px-4">
            {!editMode ? (
              <p className="text-base min-w-max md:text-md font-secondary-medium text-blue">
                {title}
              </p>
            ) : (
              <div className="list-input w-full">
                <Input
                  type="text"
                  onChange={handleTitleInput}
                  value={titleVal}
                  className="!py-2"
                />
              </div>
            )}
            {!editMode ? (
              <p className="text-xs px-4 text-center font-secondary-regular text-gray-300">
                This is the description for this project
              </p>
            ) : (
              <div className="w-full">
                <Textarea
                  onChange={handleTextInput}
                  value={textVal}
                  className="!py-2 w-full"
                />
              </div>
            )}
          </div>
        </div>
        {!editMode ? (
          <div className="settings-list bg-white group h-[20px] flex justify-end delay-100 relative ml-auto p-3">
            <div className="icon cursor-pointer w-full h-[15px] flex justify-end absolute top-3">
              <img width={2} src={OptionImage} alt="Option Image" />
            </div>
            <div className="options bg-white group-hover:visible invisible absolute top-7 right-3 flex flex-col p-[3px] border border-gray-100 rounded-[5px] transition-all">
              <div
                onClick={handleEditMode}
                className="text-xs font-secondary-regular tracking-[-2%] text-gray-300 px-4 py-2 bg-gray-200 cursor-pointer hover:opacity-80"
              >
                Edit
              </div>
              <div
                onClick={handleDelete}
                className="w-full flex items-center justify-center p-2 cursor-pointer opacity-80 hover:opacity-100"
              >
                <img width={12} src={DeleteIcon} alt="Delete Icon" />
              </div>
            </div>
          </div>
        ) : (
          <div className="actions-list ml-auto flex items-center">
            <Btn onClick={cancel} text="cancel" className="action-btn danger" />
            <Btn
              onClick={save}
              text="save"
              className="action-btn border border-green hover:bg-green success transition-all"
            />
          </div>
        )}
      </div>
    </Link>
  );
}
export default ProjectsCard;
