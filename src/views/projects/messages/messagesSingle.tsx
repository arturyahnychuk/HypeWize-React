import { RobotImage } from "@/assets/imports";
import {
  Btn,
  Filter,
  Icon,
  Input,
  PageLayout,
  Textarea,
} from "@/components/imports";
import { RoutesPath } from "@/types/router";
import { Link } from "react-router-dom";
import { ChangeEvent, useState, useEffect } from "react";
import { filterBtnConfigTypes } from "@/types/imports";

function MessagesSingle() {
  const tags = [
    "editable",
    "tags",
    "english",
    "english",
    "tags",
    "editable",
    "english",
    "editable",
    "tags",
    "english",
    "english",
    "tags",
    "editable",
    "english",
    "editable",
    "tags",
    "english",
    "english",
    "tags",
    "editable",
    "english",
  ];
  const [addTag, setAddTags] = useState(false);
  const [editNote, setEditNote] = useState(false);
  const [tagVal, setTagVal] = useState("");
  const [noteVal, setNoteVal] = useState(
    "These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes. These are editable notes."
  );
  const [isTabletSize, setTabletSize] = useState(false);
  const [filterVal, setFilterVal] = useState("messages");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setTabletSize(true);
        return;
      }
      setFilterVal('messages')
      setTabletSize(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleTagVal = (e: ChangeEvent<HTMLInputElement>) => {
    setTagVal(e.target.value);
  };
  const openAddTag = () => {
    setAddTags(true);
  };
  const closeAddTag = () => {
    setAddTags(false);
  };
  const handleAddTag = () => {
    setAddTags(false);
  };
  const openEditNote = () => {
    setEditNote(true);
  };
  const closeEditNote = () => {
    setEditNote(false);
  };
  const handleEditNote = () => {
    setEditNote(false);
  };
  const handleNoteVal = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNoteVal(e.target.value);
  };
  const removeTag = (item: string, index: number) => {
    alert(`remove ${item}, index is ${index}`);
  };
  const filter = [
    {
      value: "messages",
      text: " Messages",
    },
    {
      value: "tags",
      text: " Tags",
    },
    {
      value: "forms",
      text: "Forms",
    },
    {
      value: "notes",
      text: "Notes",
    },
  ] as filterBtnConfigTypes[];
  const handleFilter = (value: filterBtnConfigTypes["value"]) => {
    setFilterVal(value);
  };
  return (
    <PageLayout>
      <div className="flex items-center justify-between gap-4 flex items-center gap-4 pt-7 pb-7 sticky top-0 bg-milk z-[9999]">
        <div className="flex items-center gap-4">
          <Link to={RoutesPath.PROJECTMESSAGES}>
            <Btn
              text="Back"
              className="primary-btn fill stroke-icon"
              icon={true}
              name="arrow-left"
              width={14}
              height={14}
            />
          </Link>
        </div>
      </div>
      <div className="w-full grid lg:grid-cols-2 lg:gap-5 items-baseline">
        <div className="sticky top-[97px] w-full h-max rounded-[10px] lg:rounded-[0px]">
          {isTabletSize && (
            <div className="px-[8px] bg-white rounded-t-[10px]">
              <div className="border-b pb-2">
                <Filter
                  className="pt-2"
                  filterBtnConfig={filter}
                  active="messages"
                  classNameParent="filter-messages"
                  onFilter={handleFilter}
                />
              </div>
            </div>
          )}
          <div
            className={`${
              isTabletSize && filterVal !== "messages"
                ? "hidden opacity-0 invisible"
                : ""
            } rounded-[10px]`}
          >
            <div className="w-full h-full h-[calc(100vh-300px)] lg:h-[calc(100vh-120px)] bg-white rounded-b-[10px] lg:rounded-[10px] pr-1">
              <div className="w-full px-5 pt-4 hidden lg:flex">
                <p className="border-b w-full pb-4 text-md text-black">
                  Messages
                </p>
              </div>
              <div className="h-[calc(100vh-268px)] px-2 lg:h-[calc(100vh-180px)] overflow-auto custom-scrollbar">
                <div className="flex flex-col lg:mt-4 lg:rounded-[10px] py-4">
                  <div className="flex flex-col gap-4 px-6 h-full w-full">
                    <div className="flex items-start gap-4 h-full">
                      <img
                        src={RobotImage}
                        alt="Robot"
                        className="mt-[11px] w-[30px] sm:w-[46px]"
                      />
                      <div className="flex flex-col gap-2 max-w-[75%]">
                        <div className="p-4 pr-6 bg-gray-500 rounded-[12px] w-full">
                          <p className="text-xs lg:text-sm text-black2 leading-[20px] ">
                            Hello, This is welcome message!
                          </p>
                        </div>
                        <p className="text-black2 text-[10px]">10:40PM</p>
                      </div>
                    </div>

                    <div className="flex items-start justify-end gap-4 h-full">
                      <div className="flex flex-col gap-2 max-w-[75%]">
                        <div className="p-4 pr-6 bg-blue rounded-[12px] w-full">
                          <p className="text-white text-xs lg:text-sm leading-[20px]">
                            Do you offer teeth whitening?{" "}
                          </p>
                        </div>
                        <p className="text-black2 text-[10px] text-end">
                          10:40PM
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 h-full">
                      <img
                        src={RobotImage}
                        alt="Robot"
                        className="mt-[11px] w-[30px] sm:w-[46px]"
                      />
                      <div className="flex flex-col gap-2 max-w-[75%]">
                        <div className="p-4 pr-6 bg-gray-500 rounded-[12px] w-full">
                          <p className="text-xs lg:text-sm text-black2 leading-[20px] ">
                            Yes, we offer professional teeth whitening
                            treatments at our dental practice. Our experienced
                            dentists can help you achieve a whiter and brighter
                            smile. Contact us to book an appointment or to learn
                            more about our teeth whitening services.
                          </p>
                        </div>
                        <p className="text-black2 text-[10px]">10:40PM</p>
                      </div>
                    </div>

                    <div className="flex items-start justify-end gap-4 h-full">
                      <div className="flex flex-col gap-2 max-w-[75%]">
                        <div className="p-4 pr-6 bg-blue rounded-[12px] w-full">
                          <p className="text-white text-xs lg:text-sm leading-[20px]">
                            Do you offer teeth whitening?{" "}
                          </p>
                        </div>
                        <p className="text-black2 text-[10px] text-end">
                          10:40PM
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 h-full">
                      <img
                        src={RobotImage}
                        alt="Robot"
                        className="mt-[11px] w-[30px] sm:w-[46px]"
                      />
                      <div className="flex flex-col gap-2 max-w-[75%]">
                        <div className="p-4 pr-6 bg-gray-500 rounded-[12px] w-full">
                          <p className="text-xs lg:text-sm text-black2 leading-[20px] ">
                            Yes, we offer professional teeth whitening
                            treatments at our dental practice. Our experienced
                            dentists can help you achieve a whiter and brighter
                            smile. Contact us to book an appointment or to learn
                            more about our teeth whitening services.
                          </p>
                        </div>
                        <p className="text-black2 text-[10px]">10:40PM</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full grid grid-cols-1 gap-[10px] pb-7">
          <div
            className={`${
              isTabletSize && filterVal !== "tags"
                ? "hidden opacity-0 invisible"
                : ""
            } bg-white rounded-b-[10px] lg:rounded-[10px]`}
          >
            <div className="w-full flex justify-between items-center">
              <div className="w-full flex items-center px-5 lg:pt-2">
                <div className="w-full lg:border-b flex pb-1 lg:pb-2 pt-2 lg:pt-1 items-center justify-between">
                  <p className="text-md text-black hidden lg:block">Tags</p>
                  {!addTag ? (
                    <>
                      <div className="lg:flex hidden">
                        <Btn
                          onClick={openAddTag}
                          text="Add Tags"
                          icon={true}
                          name="add"
                          width={16}
                          height={16}
                          className="action-btn success stroke hover-green !px-0 lg:!pl-5"
                        />
                      </div>
                      <div className="lg:hidden flex">
                        <Btn
                          onClick={openAddTag}
                          text="Add new tag"
                          icon={true}
                          name="add"
                          width={16}
                          height={16}
                          className="action-btn success stroke hover-green !px-0 lg:!pl-5"
                        />
                      </div>
                    </>
                  ) : (
                    <>
                    <p className="font-secondary-regular lg:hidden flex text-black2 text-base">Name</p>
                      <div className="flex gap-4 py-2 items-center">
                        <Btn
                          onClick={closeAddTag}
                          text="Cancel"
                          className="action-btn danger !p-0"
                        />
                        <Btn
                          onClick={handleAddTag}
                          text="Add"
                          className="action-btn border border-green px-3 !py-1 hover:bg-green success transition-all"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="lg:pt-3 pb-5 lg:py-5 pr-2">
              <div className={`${addTag ? 'h-[calc(100vh-349px)]' : 'h-[calc(100vh-349px)]'} lg:max-h-[125px] px-5 overflow-auto custom-scrollbar pr-[7px]`}>
                {!addTag ? (
                  <div className="flex flex-wrap gap-[10px]">
                    {tags.map((tag: string, tagIndex: number) => (
                      <div
                        className="flex items-center gap-1 px-3 py-[7px] capitalize rounded-full bg-milkLight text-xs text-gray-300"
                        key={tagIndex}
                      >
                        {tag}
                        <div onClick={() => removeTag(tag, tagIndex)}>
                          <Icon
                            icon="close"
                            width={16}
                            height={16}
                            className="danger-icon stroke pt-[3px] cursor-pointer"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-start gap-2 mt-1 lg:mt-2">
                    <label htmlFor="welcome_message" className="text-sm lg:flex hidden">
                      Embed Code
                    </label>
                    <Input
                      type="text"
                      onChange={handleTagVal}
                      value={tagVal}
                      placeholder=""
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div
            className={`${
              isTabletSize && filterVal !== "forms"
                ? "hidden opacity-0 invisible"
                : ""
            } bg-white rounded-b-[10px] lg:rounded-[10px]`}
          >
            <div className="w-full flex justify-between items-center">
              <div className="w-full flex items-center px-5 pt-3">
                <div className="w-full border-b hidden lg:flex pb-4 lg:pt-1 items-center justify-between">
                  <p className="text-md text-black">Data Collected</p>
                </div>
              </div>
            </div>
            <div className="pt-2 pb-5 lg:pb-5 lg:pt-4 px-5 pr-[5px]">
              <div className="flex flex-col h-[calc(100vh-310px)] lg:max-h-[140px] overflow-auto custom-scrollbar pr-[7px]">
                <div className="pb-[17px] flex items-center gap-[44px] border-b border-gray-200">
                  <p className="text-sm text-black2 font-secondary-regular leading-[24px]">
                    Name
                  </p>
                  <p className="text-sm text-blue leading-[24px]">
                    Max Philips
                  </p>
                </div>
                <div className="py-[17px] flex items-center gap-[44px] border-b border-gray-200">
                  <p className="text-sm text-black2 font-secondary-regular leading-[24px]">
                    Phone
                  </p>
                  <p className="text-sm text-blue leading-[24px]">
                    +32 1651 546516
                  </p>
                </div>
                <div className="py-[17px] flex items-center gap-[44px] border-b border-gray-200">
                  <p className="text-sm text-black2 font-secondary-regular leading-[24px]">
                    Email
                  </p>
                  <p className="text-sm text-blue leading-[24px]">
                    wishlist@gmail.com
                  </p>
                </div>
                <div className="py-[17px] flex items-center gap-[44px] border-b border-gray-200">
                  <p className="text-sm text-black2 font-secondary-regular leading-[24px]">
                    Email
                  </p>
                  <p className="text-sm text-blue leading-[24px]">
                    wishlist@gmail.com
                  </p>
                </div>
                <div className="py-[17px] flex items-center gap-[44px] border-b border-gray-200">
                  <p className="text-sm text-black2 font-secondary-regular leading-[24px]">
                    Email
                  </p>
                  <p className="text-sm text-blue leading-[24px]">
                    wishlist@gmail.com
                  </p>
                </div>
                <div className="pt-[17px] flex items-center gap-[44px]">
                  <p className="text-sm text-black2 font-secondary-regular leading-[24px]">
                    Email
                  </p>
                  <p className="text-sm text-blue leading-[24px]">
                    wishlist@gmail.com
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            className={`${
              isTabletSize && filterVal !== "notes"
                ? "hidden opacity-0 invisible"
                : ""
            } bg-white rounded-b-[10px] lg:rounded-[10px]`}
          >
            <div className="w-full flex justify-between items-center">
              <div className="w-full flex items-center px-5 pt-2">
                <div className="w-full  lg:border-b flex lg:pb-2 lg:pt-1 items-center justify-between">
                  <p className="text-md text-black hidden lg:flex">Notes</p>
                  {!editNote ? (
                    <Btn
                      onClick={openEditNote}
                      className="border border-gray-100 mt-1"
                      text="Edit"
                    />
                  ) : (
                    <>
                      <div className="flex gap-4  pb-0 lg:pb-2 py-2 items-center ml-auto">
                        <Btn
                          onClick={closeEditNote}
                          text="Cancel"
                          className="action-btn danger !p-0"
                        />
                        <Btn
                          onClick={handleEditNote}
                          text="Save"
                          className="action-btn border border-green px-3 !py-1 hover:bg-green success transition-all"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="py-5 px-5">
              <div className={`${!editNote ? 'h-[calc(100vh-362px)]' : 'h-[calc(100vh-355px)]'} lg:max-h-[120px] overflow-auto custom-scrollbar pr-[7px]`}>
                {!editNote ? (
                  <p className="text-sm leading-[24px]">{noteVal}</p>
                ) : (
                  <div className="flex flex-col items-start gap-2">
                    <Textarea
                      onChange={handleNoteVal}
                      value={noteVal}
                      placeholder=""
                      className="overflow-hidden resize-none  h-[calc(100vh-360px)] lg:h-auto lg:min-h-[140px] border-dashed !p-2"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
export default MessagesSingle;
