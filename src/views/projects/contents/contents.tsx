import {
  Btn,
  CheckBox,
  Icon,
  Input,
  PageLayout,
  Textarea,
} from "@/components/imports";
import { RoutesPath } from "@/types/router";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ContentsPage() {
  const deleteItem = (index: number) => {
    alert(`delete item, index is ${index}`);
  };
  const [contentVal, setContentVal] = useState("");
  const [dropdownActive, setDropdownActive] = useState(false);
  const [startRemovingDuplicates, setStartRemovingDuplicates] = useState(false);
  const [editVal, seteditVal] = useState(
    `This is Page 1 These are editable. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes.                  

These are editable. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes.`
  );
  const [editVal2, seteditVal2] = useState(
    `This is Page 2 These are editable. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes.                  

These are editable. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes.`
  );
  const [editContent, seteditContent] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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
  const handleEditVal2 = (e: ChangeEvent<HTMLTextAreaElement>) => {
    seteditVal2(e.target.value);
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
  const scrollToPage2 = () => {
    const cont = document.getElementById("scroll-container");
    const target = document.getElementById("page2");
    if (target && cont) {
      cont?.scrollTo(0, target?.offsetTop);
      setCurrentPage(2);
    }
  };
  useEffect(() => {
    const cont = document.getElementById("scroll-container");
    const target = document.getElementById("page2");
    if (cont && target) {
      cont.addEventListener("scroll", () => {
        // Calculate the distance between the top of the "scroll-container" and the top of the "page2" element
        const distanceToTarget = target.offsetTop - cont.scrollTop;

        // You can adjust the threshold value as needed
        const threshold = 100; // Adjust this value to define how close you want to be to the target element

        if (distanceToTarget < threshold) {
          // The target element is within the threshold
          setCurrentPage(2);
        }
        if (cont.scrollTop === 0) {
          setCurrentPage(1);
        }
      });
    }
  }, []);
  const [addContentModal, setAddContentModal] = useState(false);
  const openAddContent = (e: React.MouseEvent) => {
    if ((e.target as Element).closest(".delete")) {
      return;
    }
    setAddContentModal(true);
  };
  const closeAddContentModal = () => {
    setAddContentModal(false);
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
    "thesamplewebsite.com",
    "maxphilips.com",
    "maxphilips.com",
  ];
  return (
    <PageLayout>
      <div className="flex items-center justify-between gap-4 h-full">
        <div className="w-full grid lg:grid-cols-2 gap-[10px]">
          <div className="w-full pb-4">
            <div className="pt-7 pb-[20px] lg:pb-[34px] sticky top-0 bg-milk z-[9999]">
              <div className="hidden lg:flex items-center gap-4">
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
              <div className="flex lg:hidden items-center gap-4">
                <h2 className="font-secondary-medium text-2xl text-black tracking-[-2%]">
                  Content
                </h2>
                <div className="cursor-pointer w-[18px] h-[18px] rounded-full bg-blue flex items-center justify-center">
                  <Link
                    to={RoutesPath.PROJECTCONTENTS_CREATE}
                    className="hover:scale-[1.1] ml-auto transition-all w-[18px] h-[18px] rounded-full bg-blue flex items-center justify-center"
                  >
                    <Icon
                      className="nav-icon additional text-white stroke transition-all"
                      icon="add"
                      width={10}
                      height={10}
                    />
                  </Link>
                </div>
              </div>
              <div className="relative lg:hidden flex mt-4">
                <div
                  className={`${
                    dropdownActive ? "active rounded-t-[10px] pb-[0px]" : " rounded-t-[10px] rounded-b-[10px]"
                  } w-full flex p-[1px] overflow-hidden border-gradient items-center gap-0 justify-between bg-white rounded-t-[10px]`}
                >
                  <div className={`${dropdownActive ? "rounded-t-[10px]" : " rounded-t-[10px] rounded-b-[10px]"} w-full bg-white w-full h-full flex pl-5 pr-4`}>
                  <div
                    onClick={handleDropdown}
                    className="flex items-center cursor-pointer"
                  >
                    <svg className={dropdownActive ? 'rotate-[90deg]' : ''}
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
                </div>
                {dropdownActive && (
                  <div className="border-gradient w-full absolute top-full z-[999] bg-white  pt-0 p-[1px] border-b rounded-b-[10px] overflow-hidden">
                    <div className="bg-white w-full flex justify-center  px-5 rounded-b-[10px]">
                      <div className="w-full flex items-center justify-center py-6 border-t-2 border-dashed">
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
                  </div>
                )}
              </div>
            </div>
            <div className="w-full bg-white rounded-[10px] px-5">
              {contentsArr.map((item, index) => (
                <div
                  key={index}
                  onClick={openAddContent}
                  className="w-full flex items-center justify-between py-6 border-b border-b-gray-200"
                >
                  <p className="font-secondary-regular text-sm text-black">
                    {item}
                  </p>
                  <div
                    onClick={() => deleteItem(index)}
                    className="delete cursor-pointer mr-4"
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
          <div className="relative w-full bg-milk z-[9999]">
            <div className="relative lg:flex hidden sticky top-[28px]">
            <div
                  className={`${
                    dropdownActive ? "active rounded-t-[10px] pb-[0px]" : " rounded-t-[10px] rounded-b-[10px]"
                  } w-full flex p-[1px] overflow-hidden border-gradient items-center gap-0 justify-between bg-white rounded-t-[10px]`}
                >
                  <div className={`${dropdownActive ? "rounded-t-[10px]" : " rounded-t-[10px] rounded-b-[10px]"} w-full bg-white w-full h-full flex pl-5 pr-4`}>
                  <div
                    onClick={handleDropdown}
                    className="flex items-center cursor-pointer"
                  >
                    <svg className={dropdownActive ? 'rotate-[90deg]' : ''}
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
                </div>
                {dropdownActive && (
                  <div className="border-gradient w-full absolute top-full z-[999] bg-white  pt-0 p-[1px] border-b rounded-b-[10px] overflow-hidden">
                    <div className="bg-white w-full flex justify-center  px-5 rounded-b-[10px]">
                      <div className="w-full flex items-center justify-center py-6 border-t-2 border-dashed">
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
                  </div>
                )}
            </div>

            <div
              className={`${
                addContentModal ? "active" : ""
              } addContent-modal z-[-1] lg:block sticky top-[102px] bg-white rounded-[10px] mb-6 lg:mb-0`}
            >
              <div className="w-full h-full flex justify-between items-center">
                <div className="w-full h-full flex items-center px-5 pt-2">
                  <div className="w-full h-full border-b flex pb-3 items-center justify-between">
                    <p className="text-md text-black flex">Content</p>
                    {!editContent ? (
                      <>
                      <Btn
                        onClick={openEditContent}
                        className="border border-gray-100 ml-auto mr-4"
                        text="Edit"
                      />
                      <div
                      onClick={closeAddContentModal}
                      className="flex lg:hidden cursor-pointer pt-2"
                    >
                      <svg
                        width="22"
                        height="22"
                        viewBox="0 0 22 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g filter="url(#filter0_d_253_474)">
                          <path
                            d="M5 1L11 7M11 7L17 13M11 7L17 1M11 7L5 13"
                            stroke="#8C8FA7"
                            stroke-width="2"
                            stroke-linecap="round"
                          />
                        </g>
                        <defs>
                          <filter
                            id="filter0_d_253_474"
                            x="0"
                            y="0"
                            width="22"
                            height="22"
                            filterUnits="userSpaceOnUse"
                            color-interpolation-filters="sRGB"
                          >
                            <feFlood
                              flood-opacity="0"
                              result="BackgroundImageFix"
                            />
                            <feColorMatrix
                              in="SourceAlpha"
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                              result="hardAlpha"
                            />
                            <feOffset dy="4" />
                            <feGaussianBlur stdDeviation="2" />
                            <feComposite in2="hardAlpha" operator="out" />
                            <feColorMatrix
                              type="matrix"
                              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
                            />
                            <feBlend
                              mode="normal"
                              in2="BackgroundImageFix"
                              result="effect1_dropShadow_253_474"
                            />
                            <feBlend
                              mode="normal"
                              in="SourceGraphic"
                              in2="effect1_dropShadow_253_474"
                              result="shape"
                            />
                          </filter>
                        </defs>
                      </svg>
                    </div>
                      </>
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
                            text="Save"
                            className="action-btn border border-green px-3 !py-1 hover:bg-green success transition-all"
                          />
                        </div>
                      </>
                    )}
                   
                  </div>
                </div>
              </div>
              <div
                className="pt-5 px-5 h-[calc(65vh)] overflow-auto smooth"
                id="scroll-container"
              >
                {!editContent ? (
                  <>
                    <div className="h-full border-b pt-4">
                      <p
                        className="text-sm leading-[24px]"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {editVal}
                      </p>
                    </div>
                    <div className="h-full pt-4" id="page2">
                      <p
                        className="text-sm leading-[24px]"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {editVal2}
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="flex h-full flex-col items-start gap-2 h-max">
                    <div className="w-full h-[62vh]">
                      <Textarea
                        onChange={handleEditVal}
                        value={editVal}
                        placeholder=""
                        classNameForParent="h-full"
                        className="resize-none h-full border-dashed !p-2"
                        style={{ whiteSpace: "pre-wrap" }}
                      />
                    </div>

                    <div className="w-full h-[62vh]" id="page2">
                      <Textarea
                        onChange={handleEditVal2}
                        value={editVal2}
                        placeholder=""
                        classNameForParent="h-full"
                        className="resize-none h-full border-dashed !p-2"
                        style={{ whiteSpace: "pre-wrap" }}
                      />
                    </div>
                  </div>
                )}
              </div>
              <div className="relative bg-white pb-4 px-5 pt-3 flex justify-center">
                {currentPage === 1 ? (
                  <Btn
                    onClick={scrollToPage2}
                    text="Page 01"
                    className="primary-btn stroke"
                  ></Btn>
                ) : (
                  <Btn text="Page 02" className="primary-btn stroke"></Btn>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
export default ContentsPage;
