import { useState, ChangeEvent, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import Select from "react-select";
import axios from "axios";

import { Btn, Icon, Input, PageLayout, PaginationComponent, Table } from "@/components/imports";
import { DisplayMessageType, MessageType, ProjectType, TagType } from "@/store/types";
import { RoutesPath } from "@/types/router";

import { MESSAGES_URL, METADATA_URL, PROJECTS_ROOT_URL, PROJECT_TAGS_URL } from "@/apis/endpoint";

const ProjectMessages = () => {

  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [filterActive, setFilterActive] = useState(false);
  const [selectedTags, setSelectedTags] = useState<{ value: string; label: string }[]>([]);
  const [tags, setTags] = useState<TagType[]>([]);
  const templateMessages = JSON.parse(localStorage.getItem("temp_messages") || "[{}]");
  const [displayMessages, setDisplayMessages] = useState<DisplayMessageType[]>(templateMessages ? templateMessages : []);
  const [projectInfo, setProjectInfo] = useState<ProjectType | null>(null);
  const { id } = useParams();

  const handleFilter = useCallback((selectedOption: any) => {
    if (!id) return;
    setSelectedTags(selectedOption);
    getMessages(id, currentPage, selectedOption);
  }, [currentPage]);

  const toggleFilter = () => {
    let currentVal = !filterActive;
    setFilterActive(currentVal);
  };
  const clearFilter = useCallback(() => {
    if (!id) return;
    setSelectedTags([]);
    getMessages(id, currentPage);
    setFilterActive(false);
  }, [currentPage]);
  const customFilterIndicator = () => (
    <>
      {selectedTags.length !== 0 ? (
        <div
          className="min-w-[41px] min-h-[41px] ml-auto rounded-[10px] bg-redLight flex items-center pt-1 justify-center cursor-pointer"
          onClick={clearFilter}
        >
          <Icon
            icon="close"
            className="icon text-white stroke"
            width={14}
            height={14}
          />
        </div>
      ) : (
        <Btn
          text="Filter"
          icon={true}
          name="add"
          iconNext={true}
          width={14}
          height={14}
          className="primary-btn fill stroke-icon"
        />
      )}
    </>
  );
  const customStyles = {
    container: (provided: any) => ({
      ...provided,
      width: "231px",
      border: "1px solid transparent",
      borderRadius: filterActive ? "10px 10px 0 0" : "10px",
    }),
    singleValue: (provided: any) => ({
      ...provided,
      border: "1px solid #7189FE",
      backgroundColor: "#F7F7FD",
      fontSize: `13px`,
      color: "#8C8FA7",
      padding: "4px 6px",
      borderRadius: "40px",
      maxWidth: "max-content",
    }),
    multiValueRemove: (provided: any) => ({
      ...provided,
      backgroundColor: "transparent",
      ":hover": {
        background: "transparent",
        color: "red",
      },
    }),
    control: (provided: any) => ({
      ...provided,
      background: "white",
      border: "1px solid transparent",
      padding: "4px",
    }),
    placeholder: (provided: any) => ({
      ...provided,
      fontSize: "14px",
    }),
    option: (provided: any) => ({
      ...provided,
      cursor: "pointer",
      border: "1px solid #7189FE",
      backgroundColor: "#F7F7FD",
      fontSize: `12px`,
      color: "#8C8FA7",
      padding: "4px 14px",
      borderRadius: "40px",
      maxWidth: "max-content",
    }),
    menuList: (provided: any) => ({
      ...provided,
      display: "flex",
      flexWrap: "wrap",
      gap: "10px",
      alignItems: "center",
      padding: "15px 10px",
    }),
    indicatorSeparator: () => null,
    downChevron: () => null,
    dropdownIndicator: () => null, // Hide the default dropdown indicator
    clearIndicator: () => null, // Hide the default clear indicator
  };

  const accessToken = localStorage.getItem('access_token');

  const getMessages = async (projectId: string, page: number, filterTags: { value: string; label: string }[] = []) => {
    let tagStringList = filterTags[0]?.label || "";
    for (let i = 1; i < filterTags.length; i++) tagStringList += ("," + filterTags[i].label);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${ MESSAGES_URL }/${projectId}?page=${page + 1}&limit=25${tagStringList ? ('&tags=' + tagStringList) : ""}`,
        config
      );

      getMetaData(response.data.results);
      setTotalPages(response.data.totalPages);


    } catch (error: any) {
      console.log(error);
    }
  };

  const getTags = async (projectId: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${ PROJECT_TAGS_URL }?project=${projectId}`,
        config
      );

      setTags(response.data.results);

    } catch (error: any) {
      console.log(error);
    }
  }

  const getMetaData = async (messages: MessageType[]) => {
    const _displayMessages: DisplayMessageType[] = [];
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      let sessionsString = messages[0].session;

      for (let index = 0; index < messages.length; index++) {
        sessionsString = sessionsString.concat(`,${messages[index].session}`);
      }

      const metaDataRes = await axios.get(
        `${ METADATA_URL }?session=${sessionsString}`,
        config
      ).then((response) => response.data.results);

      for (let index = 0; index < messages.length; index++) {
        _displayMessages.push({
          ip: messages[index].ipAddress,
          detail: messages[index].question,
          tags: metaDataRes?.find((item: any) => item.project == messages[index].project)?.tags || [],
          date: messages[index].createdAt,
          project: messages[index].project,
          session: messages[index].session
        })
      }

      setDisplayMessages(_displayMessages);

      localStorage.setItem("temp_messages", JSON.stringify(_displayMessages));

    } catch (error: any) {
      setDisplayMessages([]);
      localStorage.setItem("temp_messages", JSON.stringify([]));
      console.log(error);
    }
  }


  const getProjectInfo = async (projectId: string, page: number) => {
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
      getMessages(projectId, page);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (id) {
      getProjectInfo(id, currentPage);
      getTags(id);
    }
  }, [id, currentPage]);

  return (
    <PageLayout>
      <div
        className={`${selectedTags.length > 0 ? "items-start" : "items-center"
          } flex justify-between gap-4 pt-7 pb-7 sticky top-0 bg-milk z-[9999]`}
      >
        <div className="hidden sm:flex items-center gap-4 ">
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
        <h2 className="block sm:hidden font-secondary-medium text-xl text-black tracking-[-2%]">
          Messages
        </h2>
        <div className="relative w-max">
          <Select
            // @ts-ignore
            options={tags.map((tag: TagType) => ({ value: tag.id, label: tag.name }))}
            isMulti
            value={selectedTags}
            onChange={handleFilter}
            // @ts-ignore
            styles={customStyles}
            placeholder={filterActive ? "Filter using tag" : "Search tag"}
            onFocus={toggleFilter}
            onBlur={toggleFilter}
            components={{
              ClearIndicator: () => "",
              DropdownIndicator: customFilterIndicator,
            }}
          />
        </div>
      </div>
      <Table data={displayMessages} />
      <div className="mt-8 w-full flex justify-center">
        {totalPages > 1 ? <PaginationComponent pageCount={totalPages} onPageChange={(value: number) => setCurrentPage(value)} /> : <></>}
      </div>
    </PageLayout>
  );
}
export default ProjectMessages;
