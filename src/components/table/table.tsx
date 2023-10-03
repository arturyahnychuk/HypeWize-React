import React from "react";
import { Icon, PaginationComponent } from "../imports";
import { Link } from "react-router-dom";
import { RoutesPath } from "@/types/router";

interface TableProps {
  data: any[];
}

function Table({ data }: TableProps) {
  if (!data || data.length === 0) {
    return <div>No data available.</div>;
  }

  // Extract column headers from the first item in the data array
  const headCells = Object.keys(data[0]);

  return (
    <div className="table w-full sm:p-8 p-4 bg-white rounded-[10px] mb-8">
      <div className="relative w-full overflow-auto">
        <div className="w-full">
          <div
            className="grid border-gray-200 border-b "
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
            }}
          >
            {headCells.map((item, index) => (
              <div key={index} className={`${item} sm:min-w-max flex p-2`}>
                <div
                  className={`${
                    index !== 0 && index !== 1 ? "md:ml-[70px]" : ""
                  } font-secondary-medium text-sm text-black capitalize`}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
          {data.map((rowData, rowIndex) => (
            <Link to={RoutesPath.PROJECTMESSAGESSINGLE.replace(':id', rowIndex.toLocaleString())}
              key={rowIndex}
              className="grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
              }}
            >
              {Object.values(rowData).map((item: any, columnIndex) => (
                <div
                  key={columnIndex}
                  className={`${
                    headCells[columnIndex] + "-body"
                  } flex p-2 border-b border-gray-200 py-5 px-2`}
                >
                  <div>
                    <div
                      className={`
                        ${
                          columnIndex !== 0 && columnIndex !== 1
                            ? "md:ml-[70px] sm:min-w-max"
                            : ""
                        } font-secondary-regular text-xs sm:text-sm text-black
                      `}
                    >
                      {headCells[columnIndex] === "delete" ? (
                        <Icon
                          className="danger-icon ml-10 sm:ml-0 cursor-pointer"
                          icon="delete"
                          width={18}
                          height={18}
                        />
                      ) : headCells[columnIndex] === "tags" &&
                        Array.isArray(item) ? (
                        <ul className="flex flex-wrap gap-2">
                          {item.map((tag: string, tagIndex: number) => (
                            <li
                              className="px-2 py-1 capitalize rounded-full bg-milkLight text-[10px] sm:text-xs text-gray-300"
                              key={tagIndex}
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                      ) : headCells[columnIndex] === "detail" ? (
                        <div className="flex flex-col gap-2">
                          <p>{item}</p>
                          {rowData["tags"] && Array.isArray(rowData["tags"]) && (
                            <ul className="flex sm:hidden flex-wrap gap-2">
                              {rowData["tags"].map(
                                (tag: string, tagIndex: number) => (
                                  <li
                                    className="px-2 py-1 capitaliz rounded-full bg-milkLight text-[10px] sm:text-xs text-gray-300"
                                    key={tagIndex}
                                  >
                                    {tag}
                                  </li>
                                )
                              )}
                            </ul>
                          )}
                        </div>
                      ) : (
                        item
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-8 w-full flex justify-center">
      <PaginationComponent pageCount={10} />
      </div>
    </div>
  );
}

export default Table;
