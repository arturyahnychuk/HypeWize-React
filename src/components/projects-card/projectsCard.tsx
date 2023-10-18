import { RobotImage, OptionImage, DeleteIcon } from "@/assets/imports";
import React, { ChangeEvent, useState } from "react";
import { Btn, Input, Textarea } from "../imports";
import { Link, useNavigate } from "react-router-dom";
import { RoutesPath } from "@/types/router";
import { ProjectTpye } from "@/store/types";
import axios from "axios";

interface ProjectsCardTypes {
  info: ProjectTpye,
  handleDelete: () => void;
}
function ProjectsCard({ info, handleDelete }: ProjectsCardTypes) {
  const [editMode, setEditMode] = useState(false);
  const [titleVal, setTitleVal] = useState(info.name);
  const [textVal, setTextVal] = useState(info.description);
  const [editTabIsOpen, setEditTabIsOpen] = useState(false);
  const openEditTab = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    let currentVal = !editTabIsOpen;
    setEditTabIsOpen(currentVal);
  };
  const handleEditMode = (e: any) => {
    e.preventDefault();
    setEditTabIsOpen(false);
    setEditMode(true);
  };

  const navigate = useNavigate();

  const handleTextInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextVal(e.target.value);
  };
  const handleTitleInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleVal(e.target.value);
  };
  const cancel = (e: any) => {
    e.preventDefault();
    setEditMode(false);
  };

  const accessToken = localStorage.getItem('access_token');



  const save = async (e: any) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_API_ENDPOINT}/projects/${info.id}`,
        {
          description: textVal,
          name: titleVal,
        },
        config
      );

      if (response.data) {
        console.log("Updated Successfully!");
      }
      setEditMode(false);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={(e) => {
        if (editMode || (e.target as Element).closest(".delete") || (e.target as Element).closest(".editMode") || (e.target as Element).closest(".edit")) {
          return;
        }
        navigate(`${RoutesPath.PROJECTINFO}/${info.id}`);
      }}
      className={`${editMode ? "cursor-default" : ""
        } parent rounded-[10px] w-full h-[240px] bg-white flex flex-col cursor-pointer`
      }
      id={info.id}
    >
      {!editMode ? (
        <div className="settings-grid group h-[20px] flex justify-end delay-100 relative w-full ml-auto p-3 ">
          <div
            onClick={openEditTab}
            className="h-[25px] right-0 cursor-pointer w-[30px] flex justify-center absolute top-3 editMode"
          >
            <img width={2} src={OptionImage} alt="Option Image" />
          </div>
          {editTabIsOpen && (
            <div className="bg-white absolute top-7 right-3 flex flex-col p-[3px] border border-gray-100 rounded-[5px] transition-all">
              <div
                onClick={handleEditMode}
                className="text-xs font-secondary-regular tracking-[-2%] text-gray-300 px-4 py-2 bg-gray-200 cursor-pointer hover:opacity-80 edit"
              >
                Edit
              </div>
              <div
                onClick={handleDelete}
                className="w-full flex items-center justify-center p-2 cursor-pointer opacity-80 hover:opacity-100 delete"
              >
                <img width={12} src={DeleteIcon} alt="Delete Icon" />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="actions-grid justify-between flex px-4 py-2 items-center editMode">
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
        className={`${editMode ? "edit-mode" : ""
          } main body w-full flex flex-col my-auto gap-6 items-center justify-center`}
      >
        <div className="head items-center">
          <img className="image" width={55} src={RobotImage} alt="Add Image" />
          <div className="main w-full flex flex-col items-center gap-2 px-4">
            {!editMode ? (
              <p className="text-base min-w-max md:text-md font-secondary-medium text-blue">
                {titleVal}
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
                {textVal}
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
            <div
              onClick={openEditTab}
              className="icon cursor-pointer w-[35px] h-[35px] flex justify-center absolute top-3"
            >
              <img width={2} src={OptionImage} alt="Option Image" />
            </div>
            {editTabIsOpen && (
              <div className="options z-[99] bg-white absolute top-7 right-3 flex flex-col p-[3px] border border-gray-100 rounded-[5px] transition-all">
                <div
                  onClick={handleEditMode}
                  className="text-xs font-secondary-regular tracking-[-2%] text-gray-300 px-4 py-2 bg-gray-200 cursor-pointer hover:opacity-80"
                >
                  Edit
                </div>
                <div
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete();
                  }}
                  className="w-full flex items-center justify-center p-2 cursor-pointer opacity-80 hover:opacity-100 delete"
                >
                  <img width={12} src={DeleteIcon} alt="Delete Icon" />
                </div>
              </div>
            )}
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
    </div>
  );
}
export default ProjectsCard;