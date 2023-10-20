import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Link, json, useParams } from "react-router-dom";
import axios from "axios";

import {
  Btn,
  CheckBox,
  Icon,
  Input,
  PageLayout,
  PaginationComponent,
  Textarea,
} from "@/components/imports";
import { ContentType, ProjectType, ContentSearchParamsType } from "@/store/types";
import { RoutesPath } from "@/types/router";

import { CONTENTS_URL, PROJECTS_ROOT_URL } from "@/apis/endpoint";

const ContentsPage = () => {
  const [contentCurrentPage, setContentCurrentPage] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  const [contentSearchValue, setContentSearchValue] = useState("");
  const [dropdownActive, setDropdownActive] = useState(false);
  const [startRemovingDuplicates, setStartRemovingDuplicates] = useState(false);
  const { id } = useParams();
  const [isContentEdit, setIsContentEdit] = useState(false);
  const [projectInfo, setProjectInfo] = useState<ProjectType | null>(null);
  const [contents, setContents] = useState<ContentType[]>([]);
  const [selectedContent, setSelectedContent] = useState<ContentType[]>([]);
  const [contentValues, setContentValues] = useState<ContentType[]>([]);
  const [searchType, setSearchType] = useState<string>("");
  const [totalResults, setTotalResults] = useState<number>(0);

  const accessToken = localStorage.getItem("access_token");

  const deleteItem = useCallback(async (content: ContentType) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      await axios.delete(
        `${ CONTENTS_URL }/${content.contentType.includes("document") ? "documents/" : ""}${content.documentId || content._id}`,
        config
      );

      const _contents = content.contentType.includes("document") ? contents.filter((item) => item.documentId != content.documentId) : contents.filter((item) => item._id != content._id);

      setContents(_contents);
      setTotalResults(p => p - 1);
      if (_contents.length) setSelectedContent([_contents[0]]);
      else setSelectedContent([]);

    } catch (error: any) {
      console.log(error);
    }

  }, [contents]);

  const openEditContent = useCallback(() => {
    setIsContentEdit(true);
    setContentValues(selectedContent);
  }, [selectedContent]);

  const closeEditContent = useCallback(() => {
    setIsContentEdit(false);
    setContentValues(selectedContent);
  }, [selectedContent]);

  const handleEditContentValue = useCallback((value: string, index: number) => {

    const _contentValues = contentValues.slice(0);

    _contentValues[index].content = value;

    setContentValues(_contentValues);

  }, [contentValues]);

  useEffect(() => {
    if (!isContentEdit) return;
    contentValues.map((item, index) => {
      const _element = document.getElementById(`textarea-${index}`);
      if (_element) {
        _element.style.height = '0px';
        _element.style.height = `${_element.scrollHeight}px`;
      }
    });
  }, [isContentEdit, contentValues]);

  const handleSaveEditedContentValues = () => {
    setIsContentEdit(false);
  };
  const handleDropdown = () => {
    let toggleVal = !dropdownActive;
    setDropdownActive(toggleVal);
  };
  const handleContentSearchValue = (e: ChangeEvent<HTMLInputElement>) => {
    setContentSearchValue(e.target.value);
  };

  const handleSearchContents = useCallback(async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const jsonData: ContentSearchParamsType = {
        project: id,
        ...(contentSearchValue !== '' && { search: contentSearchValue }),
        ...(searchType !== '' && { contentType: searchType }),
        page: (currentPage + 1).toString(),
        limit: "25",
        sortBy: "createdAt:desc"
      };

      const params = new URLSearchParams(jsonData);
      const searchURL = `${CONTENTS_URL}/?${params.toString()}`;

      axios.get(
        searchURL,        
        config
      ).then(response => {
        const { results, totalResults, totalPages } = response.data;
        setContents(results);
        
        if (results.length) 
          setSelectedContent(results[0]);        
        else 
          setSelectedContent([]);
        setTotalResults(totalResults);
        openAddContent(results[0]);
        setTotalPages(totalPages);
      }).catch(error => {
        console.log(error)
      });     
      
    } catch (error: any) {
      console.log(error);
    }
  }, [searchType, contentSearchValue, id, currentPage])

  const handleKeyDown = async (keyBoard: any) => {
    if (keyBoard.code == "Enter" || keyBoard.code == "NumpadEnter") handleSearchContents();
  };

  const handleCheckboxes = (value: string) => {
    setSearchType(value);
  };
  const handleDuplicateResult = () => {
    setStartRemovingDuplicates(true);
    setTimeout(() => {
      setStartRemovingDuplicates(false);
    }, 2000);
  };

  const getContents = async (projectId: string, page: number) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${ CONTENTS_URL }/?project=${projectId}&page=${page + 1}&limit=25&sortBy=createdAt:desc`,
        config
      );

      setContents(response.data.results);
      setTotalResults(response.data.totalResults);
      openAddContent(response.data.results[0]);
      setTotalPages(response.data.totalPages);
    } catch (error: any) {
      console.log(error);
    }
  }

  const getProjectInfo = async (projectId: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${ PROJECTS_ROOT_URL }/${projectId}`,
        config
      );

      setProjectInfo(response.data);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (id) {
      getProjectInfo(id);
      getContents(id, currentPage);
    }
  }, [id, currentPage]);

  useEffect(() => {
    const threshold = 230;
    const cont = document.getElementById("scroll-container");
    let _previousOffset = 0;
    let _nextOffset = 0;
    let _currentPage = 1;

    if (cont) {
      cont.addEventListener("scroll", () => {

        const _next = document.getElementById(`page${_currentPage + 1}`);
        const _previous = document.getElementById(`page${_currentPage - 1}`);

        if (!!_next) {

          console.log("_next.offsetHeight:", _next.offsetHeight, _next);
          _nextOffset = _next.offsetTop;

          if (cont.scrollTop + (_next.offsetHeight / 2 < threshold ? _next.offsetHeight / 2 : threshold) >= _nextOffset) {
            setContentCurrentPage(++_currentPage);
          }

        }

        if (!!_previous) {

          _previousOffset = _previous.offsetTop + _previous.offsetHeight;

          if (cont.scrollTop + (_previous.offsetHeight / 2 < threshold ? _previous.offsetHeight / 2 : threshold) <= _previousOffset) {
            setContentCurrentPage(--_currentPage);
          }

        }
      });
    }
  }, []);

  const [addContentModal, setAddContentModal] = useState(false);
  const openAddContent = async (item: ContentType) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    if (item.documentId) {

      const docContentsRes = await axios.get(
        `${ CONTENTS_URL }?documentId=${item.documentId}&project=${item.project}`,
        config
      );

      setSelectedContent(docContentsRes.data.results);
      setContentCurrentPage(1);
    } else {
      setSelectedContent([item]);
    }

    setAddContentModal(true);
    setIsContentEdit(false);

  };
  const closeAddContentModal = () => {
    setAddContentModal(false);
  };

  return (
    <PageLayout>
      <div className="flex items-center justify-between gap-4 h-full">
        <div className="w-full h-screen grid lg:grid-cols-2 gap-[10px]">
          <div className="w-full pb-4">
            <div className="pt-7 pb-[20px] lg:pb-[34px] sticky top-0 bg-milk z-[9999]">
              <div className="hidden lg:flex items-center gap-4">
                <h2 className="font-secondary-medium text-2xl text-black tracking-[-2%]">
                  {projectInfo?.name}
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
                  className={`${dropdownActive ? "active rounded-t-[10px] pb-[0px]" : " rounded-t-[10px] rounded-b-[10px]"
                    } w-full flex p-[1px] overflow-hidden border-gradient items-center gap-0 justify-between bg-white rounded-t-[10px]`}
                >
                  <div className={`${dropdownActive ? "rounded-t-[10px]" : " rounded-t-[10px] rounded-b-[10px]"} bg-white w-full h-full flex pl-5 pr-4`}>
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
                      onChange={handleContentSearchValue}
                      value={contentSearchValue}
                      className="!py-3 border-none !px-4"
                      onKeyDown={handleKeyDown}
                    />
                    <div className="flex items-center gap-3">
                      <CheckBox
                        onCheckChange={() => handleCheckboxes("website")}
                        className="checkbox-primary !gap-2"
                        name="website"
                        label="<p class='text-black text-xs'>Sites</p>"
                      />
                      <CheckBox
                        onCheckChange={() => handleCheckboxes("document/text")}
                        className="checkbox-primary !gap-2"
                        name="document/text"
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
                            Remove duplicate text from {totalResults} results
                          </p>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div
                              className="animate-spin inline-block w-3 h-3 border-[2px] border-orange border-current border-t-transparent rounded-full"
                              role="status"
                              aria-label="loading"
                            ></div>
                            <p className="text-sm font-secondary-medium text-orange">
                              1 of {totalResults} removing
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="w-full bg-white rounded-[10px] px-5 overflow-auto">
              {contents.map((item: ContentType, index: number) => (
                <div
                  key={index}
                  onClick={(e) => {
                    if ((e.target as Element).closest(".delete")) {
                      return;
                    }
                    openAddContent(item)
                  }}
                  className="w-full flex items-center justify-between text-ellipsis py-6 border-b border-b-gray-200 cursor-pointer"
                >
                  <p className="font-secondary-regular text-sm text-black truncate overflow-hidden">
                    {item.contentType?.includes("document/text") ? item.name : item.url}
                  </p>
                  <div
                    onClick={() => deleteItem(item)}
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
              <div className="py-5 flex w-full justify-center">
                {totalPages > 1 ? <PaginationComponent pageCount={totalPages} onPageChange={(value: number) => setCurrentPage(value)} /> : <></>}
              </div>
            </div>
          </div>
          <div className="relative w-full bg-milk z-[9999]">
            <div className="lg:flex hidden sticky top-[28px]">
              <div
                className={`${dropdownActive ? "active rounded-t-[10px] pb-[0px]" : " rounded-t-[10px] rounded-b-[10px]"
                  } w-full flex p-[1px] overflow-hidden border-gradient items-center gap-0 justify-between bg-white rounded-t-[10px]`}
              >
                <div className={`${dropdownActive ? "rounded-t-[10px]" : " rounded-t-[10px] rounded-b-[10px]"} bg-white w-full h-full flex pl-5 pr-4`}>
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
                    onChange={handleContentSearchValue}
                    value={contentSearchValue}
                    className="!py-3 border-none !px-4"
                    onKeyDown={handleKeyDown}
                  />
                  <div className="flex items-center gap-3">
                    <CheckBox
                      onCheckChange={() => handleCheckboxes("website")}
                      checked={searchType == "website"}
                      className="checkbox-primary !gap-2"
                      name="searchType"
                      label="<p class='text-black text-xs'>Sites</p>"
                    />
                    <CheckBox
                      onCheckChange={() => handleCheckboxes("document/text")}
                      checked={searchType == "document/text"}
                      className="checkbox-primary !gap-2"
                      name="searchType"
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
                          Remove duplicate text from {totalResults} results
                        </p>
                      ) : (
                        <div className="flex items-center gap-2">
                          <div
                            className="animate-spin inline-block w-3 h-3 border-[2px] border-orange border-current border-t-transparent rounded-full"
                            role="status"
                            aria-label="loading"
                          ></div>
                          <p className="text-sm font-secondary-medium text-orange">
                            1 of {totalResults} removing
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div
              className={`${addContentModal ? "active" : ""
                } addContent-modal z-[-1] lg:block sticky top-[102px] bg-white rounded-[10px] mb-6 lg:mb-0`}
            >
              <div className="w-full h-full flex justify-between items-center">
                <div className="w-full h-full flex items-center px-5 pt-2">
                  <div className="w-full h-full border-b flex pb-3 items-center justify-between">
                    <p className="text-md text-black flex">Content</p>
                    {!isContentEdit ? (
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
                                strokeWidth="2"
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
                            onClick={closeEditContent}
                            text="Cancel"
                            className="action-btn danger !p-0"
                          />
                          <Btn
                            onClick={handleSaveEditedContentValues}
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
                className="pt-5 px-5 h-[calc(67vh)] overflow-auto smooth"
                id="scroll-container"
              >
                {!isContentEdit ? (
                  <>
                    {selectedContent?.map((item: ContentType, index: number) => <div className="h-max border-b pt-4" id={`page${index + 1}`} key={index}>
                      <p
                        className="text-sm leading-[24px]"
                        style={{ whiteSpace: "pre-wrap" }}
                      >
                        {item.content}
                      </p>
                    </div>)}
                  </>
                ) : (
                  <>
                    {contentValues.map((item: ContentType, index: number) => <div className="w-full h-max" key={index} id={`page${index + 1}`}>
                      <Textarea
                        onChange={(e) => handleEditContentValue(e.target.value, index)}
                        value={item.content}
                        id={`textarea-${index}`}
                        placeholder=""
                        className="resize-none h-auto border-dashed !p-2 overflow-hidden text-[13px] leading-[23px]"
                        style={{ whiteSpace: "pre-wrap" }}
                      />
                    </div>
                    )}
                  </>
                )}
              </div>
              <div className="relative bg-white pb-4 px-5 pt-3 flex justify-center">
                <Btn text={"Page " + contentCurrentPage} className="primary-btn stroke"></Btn>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
export default ContentsPage;
