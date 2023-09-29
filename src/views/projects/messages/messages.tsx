import { Btn, Icon, Input, PageLayout, Table } from "@/components/imports";
import { RoutesPath } from "@/types/router";
import { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";

function ProjectMessages() {
  const [filterActive, setFilterActive] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchVal, setSearchVal] = useState("");
  const tags = ["tag", "message", "tag1", "message1", "tag2", "tag3"];

  const handleFilter = (selectedOption: any) => {
    setSelectedTags(selectedOption);
  };

  const toggleFilter = () => {
    let currentVal = !filterActive;
    setFilterActive(currentVal);
  };
  const clearFilter = () => {
    setSelectedTags([]);
    setFilterActive(false);
  };
  console.log(selectedTags);
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
  const data = [
    {
      id: "192.168.0.1",
      detail: "this detail for this row and this is detail for this section.",
      tags: ["first", "message"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "this detail for this row and this is detail for this section.",
      tags: ["Tag", "message"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "this detail for this row and this is detail for this section.",
      tags: ["Tag", "english"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "this detail for this row and this is detail for this section.",
      tags: ["Tag", "english"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "this detail for this row and this is detail for this section.",
      tags: ["First", "english"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "this detail for this row and this is detail for this section.",
      tags: ["first", "message"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "this detail for this row and this is detail for this section.",
      tags: ["Tag", "message"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "this detail for this row and this is detail for this section.",
      tags: ["Tag", "english"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "this detail for this row and this is detail for this section.",
      tags: ["Tag", "english"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "this detail for this row and this is detail for this section.",
      tags: ["First", "english"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "this detail for this row and this is detail for this section.",
      tags: ["Tag", "english"],
      date: "15 sept 2023",
      delete: "",
    },
    {
      id: "192.168.0.1",
      detail: "this detail for this row and this is detail for this section.",
      tags: ["First", "english"],
      date: "15 sept 2023",
      delete: "",
    },
  ];
  return (
    <PageLayout>
      <div
        className={`${
          selectedTags.length > 0 ? "items-start" : "items-center"
        } flex justify-between gap-4 flex  gap-4 pt-7 pb-7 sticky top-0 bg-milk z-[9999]`}
      >
        <div className="hidden sm:flex items-center gap-4 ">
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
        <h2 className="block sm:hidden font-secondary-medium text-xl text-black tracking-[-2%]">
          Messages
        </h2>
        <div className="relative w-max">
          <Select
            options={tags.map((tag) => ({ value: tag, label: tag }))}
            value={selectedTags}
            onChange={handleFilter}
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
      <Table data={data} />
    </PageLayout>
  );
}
export default ProjectMessages;

// import { Btn, Icon, Input, PageLayout, Table } from "@/components/imports";
// import { RoutesPath } from "@/types/router";
// import { useState, ChangeEvent } from "react";
// import { Link } from "react-router-dom";

// function ProjectMessages() {
//   const [filterActive, setFilterActive] = useState(false);
//   const data = [
//     {
//       id: "192.168.0.1",
//       detail: "this detail for this row and this is detail for this section.",
//       tags: ["first", "message"],
//       date: "15 sept 2023",
//       delete: "",
//     },
//     {
//       id: "192.168.0.1",
//       detail: "this detail for this row and this is detail for this section.",
//       tags: ["Tag", "message"],
//       date: "15 sept 2023",
//       delete: "",
//     },
//     {
//       id: "192.168.0.1",
//       detail: "this detail for this row and this is detail for this section.",
//       tags: ["Tag", "english"],
//       date: "15 sept 2023",
//       delete: "",
//     },
//     {
//       id: "192.168.0.1",
//       detail: "this detail for this row and this is detail for this section.",
//       tags: ["Tag", "english"],
//       date: "15 sept 2023",
//       delete: "",
//     },
//     {
//       id: "192.168.0.1",
//       detail: "this detail for this row and this is detail for this section.",
//       tags: ["First", "english"],
//       date: "15 sept 2023",
//       delete: "",
//     },
//     {
//       id: "192.168.0.1",
//       detail: "this detail for this row and this is detail for this section.",
//       tags: ["first", "message"],
//       date: "15 sept 2023",
//       delete: "",
//     },
//     {
//       id: "192.168.0.1",
//       detail: "this detail for this row and this is detail for this section.",
//       tags: ["Tag", "message"],
//       date: "15 sept 2023",
//       delete: "",
//     },
//     {
//       id: "192.168.0.1",
//       detail: "this detail for this row and this is detail for this section.",
//       tags: ["Tag", "english"],
//       date: "15 sept 2023",
//       delete: "",
//     },
//     {
//       id: "192.168.0.1",
//       detail: "this detail for this row and this is detail for this section.",
//       tags: ["Tag", "english"],
//       date: "15 sept 2023",
//       delete: "",
//     },
//     {
//       id: "192.168.0.1",
//       detail: "this detail for this row and this is detail for this section.",
//       tags: ["First", "english"],
//       date: "15 sept 2023",
//       delete: "",
//     },
//     {
//       id: "192.168.0.1",
//       detail: "this detail for this row and this is detail for this section.",
//       tags: ["Tag", "english"],
//       date: "15 sept 2023",
//       delete: "",
//     },
//     {
//       id: "192.168.0.1",
//       detail: "this detail for this row and this is detail for this section.",
//       tags: ["First", "english"],
//       date: "15 sept 2023",
//       delete: "",
//     },
//   ];
//   const tags = ["tag", "message", "tag1", "message1", "tag2", "tag3"];
//   const [selectedTags, setSelectedTags] = useState<string[]>([]);
//   const [searchVal, setSearchVal] = useState("")
//   const handleSearch = (e:  ChangeEvent<HTMLInputElement>)=> {
//     setSearchVal(e.target.value)
//   }
//   const openFilter = () => {
//     if(!filterActive) {
//       setFilterActive(true);
//     }
//   };
//   const closeFilter = () => {
//     setFilterActive(false);
//     setSelectedTags([]);
//   };
//   const handleFilter = (index: number) => {
//     const selectedTag = tags[index];
//     setSelectedTags((prevSelectedTags) => [...prevSelectedTags, selectedTag]);
//   };
//   return (
//     <PageLayout>
//       <div className={`${filterActive && selectedTags.length !== 0 ? 'items-start' : 'items-center'} flex justify-between gap-4 flex  gap-4 pt-7 pb-7 sticky top-0 bg-milk z-[9999]`}>
//         <div className="hidden sm:flex items-center gap-4 ">
//           <h2 className="font-secondary-medium text-2xl text-black tracking-[-2%]">
//             Project Name
//           </h2>
//           <Link to={RoutesPath.PROJECTS}>
//             <Btn
//               text="switch"
//               className="switch-btn"
//               icon={true}
//               iconNext={true}
//               name="switch"
//               width={14}
//               height={14}
//             />
//           </Link>
//         </div>
//         <h2 className="block sm:hidden font-secondary-medium text-xl text-black tracking-[-2%]">
//           Messages
//         </h2>
//         <div
//           onClick={openFilter}
//           className={`${
//             filterActive ? "rounded-t-[10px]" : "rounded-[10px]"
//           } relative w-max bg-white flex gap-6 shadow-sm p-1 min-w-[231px] max-w-[231px] w-[231px]`}
//         >
//           <div className={`${filterActive ? 'items-start' : 'items-center'} w-full flex justify-between pl-3`}>
//             {selectedTags.length !== 0 ? (
//               <div className="flex items-center flex-wrap gap-3 max-w-[70%]">
//                 {selectedTags.map((item, index) => (
//                   <div
//                     className="py-1 px-2 bg-milkLight border rounded-full border border-blue text-xs text-gray-300 cursor-pointer"
//                     key={index}
//                   >
//                     {item}
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <Input
//                 type="text"
//                 value={searchVal}
//                 onInput={handleSearch}
//                 placeholder={filterActive ? 'Search tag' : 'Filter using tag'}
//                 className={`${searchVal.length > 0 ? '!pr-4' : ''} !py-2 border-none !px-0`}
//               />
//             )}
//             {filterActive ? (
//               <div
//                 onClick={closeFilter}
//                 className="min-w-[41px] min-h-[41px] ml-auto rounded-[10px] bg-redLight flex items-center pt-1 justify-center cursor-pointer"
//               >
//                 <Icon
//                   icon="close"
//                   className="icon text-white stroke"
//                   width={14}
//                   height={14}
//                 />
//               </div>
//             ) : (
//               <Btn
//                 text="Filter"
//                 icon={true}
//                 name="add"
//                 iconNext={true}
//                 width={14}
//                 height={14}
//                 className="primary-btn fill stroke-icon"
//               />
//             )}
//           </div>
//           {filterActive && (
//             <div className="absolute w-full top-full py-3 px-3 bg-white shadow-sm rounded-b-[10px] left-0 z-[99]">
//               <div className="w-full flex flex-wrap gap-3">
//                 {tags.map((item: string, index: number) => (
//                   <div
//                     onClick={() => handleFilter(index)}
//                     className={`${
//                       selectedTags.includes(item) ? "hidden" : ""
//                     } py-1 px-2 bg-milkLight border rounded-full border border-blue text-xs text-gray-300 cursor-pointer`}
//                     key={index}
//                   >
//                     {item}
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <Table data={data} />
//     </PageLayout>
//   );
// }
// export default ProjectMessages;
