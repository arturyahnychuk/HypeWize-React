import { Btn, Icon, PageLayout, Table } from "@/components/imports";
import { RoutesPath } from "@/types/router";
import { useState } from "react";
import { Link } from "react-router-dom";

function ProjectMessages() {
  const [filterActive, setFilterActive] = useState(false);
  const data = [
    {
      id: "192.168.0.1",
      detail: "is detail for this row and this is detail for this section.",
      tags: ["first", "message"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "is detail for this row and this is detail for this section.",
      tags: ["Tag", "message"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "is detail for this row and this is detail for this section.",
      tags: ["Tag", "english"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "is detail for this row and this is detail for this section.",
      tags: ["Tag", "english"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "is detail for this row and this is detail for this section.",
      tags: ["First", "english"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "is detail for this row and this is detail for this section.",
      tags: ["first", "message"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "is detail for this row and this is detail for this section.",
      tags: ["Tag", "message"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "is detail for this row and this is detail for this section.",
      tags: ["Tag", "english"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "is detail for this row and this is detail for this section.",
      tags: ["Tag", "english"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "is detail for this row and this is detail for this section.",
      tags: ["First", "english"],
      date: "15 sept 2023",
      delete: "",
    },
  ];
  const tags = ["tag", "message", "tag1", "message1", "tag2", "tag3"];
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const openFilter = () => {
    setFilterActive(true);
  };
  const closeFilter = () => {
    setFilterActive(false);
    setSelectedTags([])
  };
  const handleFilter = (index: number) => {
    const selectedTag = tags[index];
    setSelectedTags((prevSelectedTags) => [...prevSelectedTags, selectedTag]);
  };
  return (
    <PageLayout>
      <div className="flex items-center justify-between gap-4 mb-7">
        <div className="flex items-center gap-4">
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
        <div
          className={`${
            filterActive ? "rounded-t-[10px]" : "rounded-[10px]"
          } relative w-max bg-white flex gap-6 shadow-sm p-1 max-w-[250px]`}
        >
          <div className="w-full flex items-center justify-between gap-6 pl-3">
            {selectedTags.length !== 0 ? (
              <div className="flex items-center flex-wrap gap-3 max-w-[70%]">
                {selectedTags.map((item, index) => (
                  <div
                    className="py-1 px-2 bg-milkLight border rounded-full border border-blue text-xs text-gray-300 cursor-pointer"
                    key={index}
                  >
                    {item}
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-secondaty-regular text-gray-300 text-sm">
                Filter using tag
              </p>
            )}
            {filterActive ? (
              <div
                onClick={closeFilter}
                className="w-[41px] h-[41px] ml-auto rounded-[10px] bg-redLight flex items-center pt-1 justify-center cursor-pointer"
              >
                <Icon icon="close" width={14} height={14} />
              </div>
            ) : (
              <Btn
                onClick={openFilter}
                text="filter"
                icon={true}
                name="add"
                iconNext={true}
                width={14}
                height={14}
                className="primary-btn fill stroke"
              />
            )}
          </div>
          {filterActive && (
            <div className="absolute w-full top-full py-3 px-3 bg-white shadow-sm rounded-b-[10px] left-0 z-[99]">
              <div className="w-full flex flex-wrap gap-3">
                {tags.map((item: string, index: number) => (
                  <div
                    onClick={() => handleFilter(index)}
                    className={`${
                      selectedTags.includes(item) ? "hidden" : ""
                    } py-1 px-2 bg-milkLight border rounded-full border border-blue text-xs text-gray-300 cursor-pointer`}
                    key={index}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Table data={data} />
    </PageLayout>
  );
}
export default ProjectMessages;
