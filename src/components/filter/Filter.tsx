import { useState } from "react";
import { Btn } from "@/components/imports";
import { filterBtnConfigTypes } from "@/types/imports";

interface FilterProps {
  filterBtnConfig: filterBtnConfigTypes[];
  active: string;
  onFilter: (value: filterBtnConfigTypes["value"]) => void;
  className?: string
  classNameParent? : string
}

function Filter({ filterBtnConfig, active, onFilter, className='', classNameParent='' }: FilterProps) {
  const handleFilter = (value: filterBtnConfigTypes["value"]) => {
    setActiveFilter(value.toLowerCase());
    onFilter(value.toLowerCase());
  };
  const [activeFilter, setActiveFilter] = useState(active);

  return (
    <div className={`${classNameParent} flex items-center p-1 bg-white rounded-[5px] w-max`}>
      {filterBtnConfig.map((button, index) => (
        <div className={className} onClick={() => handleFilter(button.value)} key={index}>
          <Btn
            className={`filter-btn ${
              button.value.toLowerCase() === activeFilter.toLowerCase()
                ? "active"
                : ""
            }`}
            text={button.text}
            icon={button.icon}
            name={button.name}
            width={button.width}
            height={button.height}
          />
        </div>
      ))}
    </div>
  );
}
export default Filter;

{
  /* <Btn
className="filter-btn"
text="Grid"
icon={true}
name="Category"
size={12}
/> */
}
