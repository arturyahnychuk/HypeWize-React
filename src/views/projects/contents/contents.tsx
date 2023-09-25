import {
  Btn,
  CheckBox,
  Icon,
  Input,
  PageLayout,
  Textarea,
} from "@/components/imports";
import { RoutesPath } from "@/types/router";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";

function ContentsPage() {
  const deleteItem = (index: number) => {
    alert(`delete item, index is ${index}`);
  };
  const [contentVal, setContentVal] = useState("");
  const [dropdownActive, setDropdownActive] = useState(false);
  const [startRemovingDuplicates, setStartRemovingDuplicates] = useState(false);
  const [editVal, seteditVal] = useState(
    "These are editable. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes.                  These are editable. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes."
  );
  const [editContent, seteditContent] = useState(false);

  const openEditContent = () => {
    seteditContent(true);
  };
  const closEeditContent = () => {
    seteditContent(false);
  };
  const handleEditContent = () => {
    seteditContent(false);
  };
  const handleEditVal = (e: ChangeEvent<HTMLTextAreaElement>) => {
    seteditVal(e.target.value);
  };
  const handleDropdown = () => {
    let toggleVal = !dropdownActive;
    setDropdownActive(toggleVal);
  };
  const handleContentVal = (e: ChangeEvent<HTMLInputElement>) => {
    setContentVal(e.target.value);
  };
  const handleCheckboxes = (checked: boolean) => {
    console.log(checked);
  };
  const handleDuplicateResult = () => {
    setStartRemovingDuplicates(true);
    setTimeout(() => {
      setStartRemovingDuplicates(false);
    }, 2000);
  };
  const contentsArr = [
    "thesamplewebsite.com",
    "thesamplewebsite.com",
    "thesamplewebsite.com",
    "thesamplewebsite.com",
    "maxphilips.com",
    "maxphilips.com",
    "thesamplewebsite.com",
    "maxphilips.com",
    "maxphilips.com",
  ];
  return (
    <PageLayout>
      <div className="flex items-center justify-between gap-4 mb-7">
        <div className="w-full grid md:grid-cols-2 gap-[10px]">
          <div className="w-full">
            <div className="hidden md:flex items-center gap-4">
              <h2 className="font-secondary-medium text-2xl text-black tracking-[-2%]">
                Project Name
              </h2>
              <Link to={RoutesPath.PROJECTS}>
                <Btn
                  text="switch"
                  className="switch-btn"
                  icon={true}
                  iconNext={true}
                  name="switch"
                  width={14}
                  height={14}
                />
              </Link>
            </div>
            <div className="flex md:hidden items-center gap-4">
              <h2 className="font-secondary-medium text-2xl text-black tracking-[-2%]">
                Content
              </h2>
              <div className="w-[18px] h-[18px] rounded-full bg-blue flex items-center justify-center">
                <Icon
                  className="icon-white stroke transition-all"
                  icon="add"
                  width={10}
                  height={10}
                />
              </div>
            </div>
            <div className="relative md:hidden flex mt-4">
              <div
                className={`${
                  dropdownActive ? "rounded-t-[10px]" : " rounded-b-[10px]"
                } w-full flex pl-5 pr-4 items-center gap-0 justify-between bg-white rounded-t-[10px]`}
              >
                <div
                  onClick={handleDropdown}
                  className="flex items-center cursor-pointer"
                >
                  <svg
                    width="7"
                    height="12"
                    viewBox="0 0 7 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6.25 6L1 11"
                      stroke="#8C8FA7"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <Input
                  type="text"
                  placeholder="Search Content"
                  onChange={handleContentVal}
                  value={contentVal}
                  className="!py-3 border-none !px-4"
                />
                <div className="flex items-center gap-3">
                  <CheckBox
                    onCheckChange={() => handleCheckboxes}
                    className="checkbox-primary !gap-2"
                    name="sites"
                    label="<p class='text-black text-xs'>Sites</p>"
                  />
                  <CheckBox
                    onCheckChange={() => handleCheckboxes}
                    className="checkbox-primary !gap-2"
                    name="docs"
                    label="<p class='text-black text-xs'>Docs</p>"
                  />
                </div>
              </div>
              {dropdownActive && (
                <div className="w-full absolute top-full z-[999] bg-white pt-2 px-5 border-b">
                  <div className="w-full flex justify-center py-6 border-t border-dashed">
                    {!startRemovingDuplicates ? (
                      <p
                        onClick={handleDuplicateResult}
                        className="cursor-pointer text-sm font-secondary-medium text-orange"
                      >
                        Remove duplicate text from 14 results
                      </p>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div
                          className="animate-spin inline-block w-3 h-3 border-[2px] border-orange border-current border-t-transparent rounded-full"
                          role="status"
                          aria-label="loading"
                        ></div>
                        <p className="text-sm font-secondary-medium text-orange">
                          1 of 14 removing
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="w-full bg-white rounded-[10px] px-5 mt-4 md:mt-7">
              {contentsArr.map((item, index) => (
                <div
                  key={index}
                  className="w-full flex items-center justify-between py-6 border-b border-b-gray-200"
                >
                  <p className="font-secondary-regular text-sm text-black">
                    {item}
                  </p>
                  <div
                    onClick={() => deleteItem(index)}
                    className="cursor-pointer mr-4"
                  >
                    <Icon
                      icon="delete"
                      width={18}
                      height={18}
                      className="danger-icon"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative w-full">
            <div className="relative md:flex hidden">
              <div
                className={`${
                  dropdownActive ? "rounded-t-[10px]" : " rounded-b-[10px]"
                } w-full flex pl-5 pr-4 items-center gap-0 justify-between bg-white rounded-t-[10px]`}
              >
                <div
                  onClick={handleDropdown}
                  className="flex items-center cursor-pointer"
                >
                  <svg
                    width="7"
                    height="12"
                    viewBox="0 0 7 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L6.25 6L1 11"
                      stroke="#8C8FA7"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <Input
                  type="text"
                  placeholder="Search Content"
                  onChange={handleContentVal}
                  value={contentVal}
                  className="!py-3 border-none !px-4"
                />
                <div className="flex items-center gap-3">
                  <CheckBox
                    onCheckChange={() => handleCheckboxes}
                    className="checkbox-primary !gap-2"
                    name="sites"
                    label="<p class='text-black text-xs'>Sites</p>"
                  />
                  <CheckBox
                    onCheckChange={() => handleCheckboxes}
                    className="checkbox-primary !gap-2"
                    name="docs"
                    label="<p class='text-black text-xs'>Docs</p>"
                  />
                </div>
              </div>
              {dropdownActive && (
                <div className="w-full absolute z-[999] top-full bg-white pt-2 px-5 border-b">
                  <div className="w-full flex justify-center py-6 border-t border-dashed">
                    {!startRemovingDuplicates ? (
                      <p
                        onClick={handleDuplicateResult}
                        className="cursor-pointer text-sm font-secondary-medium text-orange"
                      >
                        Remove duplicate text from 14 results
                      </p>
                    ) : (
                      <div className="flex items-center gap-2">
                        <div
                          className="animate-spin inline-block w-3 h-3 border-[2px] border-orange border-current border-t-transparent rounded-full"
                          role="status"
                          aria-label="loading"
                        ></div>
                        <p className="text-sm font-secondary-medium text-orange">
                          1 of 14 removing
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="bg-white rounded-[10px] mt-[23px]">
              <div className="w-full h-full flex justify-between items-center">
                <div className="w-full h-full flex items-center px-5 pt-2">
                  <div className="w-full h-full  md:border-b flex pb-3 items-center justify-between">
                    <p className="text-md text-black hidden md:flex">Notes</p>
                    {!editContent ? (
                      <Btn
                        onClick={openEditContent}
                        className="border border-gray-100"
                        text="Edit"
                      />
                    ) : (
                      <>
                        <div className="flex gap-4 px-4 py-2 items-center ml-auto">
                          <Btn
                            onClick={closEeditContent}
                            text="Cancel"
                            className="action-btn danger !p-0"
                          />
                          <Btn
                            onClick={handleEditContent}
                            text="Add"
                            className="action-btn border border-green px-3 !py-1 hover:bg-green success transition-all"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="py-5 px-5 h-[calc(65vh)]">
                {!editContent ? (
                  <p className="text-sm leading-[24px]">{editVal}</p>
                ) : (
                  <div className="flex h-full flex-col items-start gap-2 h-full">
                    <Textarea
                      onChange={handleEditVal}
                      value={editVal}
                      placeholder=""
                      classNameForParent="h-full"
                      className="resize-none h-full border-dashed !p-2"
                    />
                  </div>
                )}
              </div>
              <div className="pb-4 px-5 pt-3 flex justify-center">
                <Btn text="Page 01" className="primary-btn stroke"></Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
export default ContentsPage;
