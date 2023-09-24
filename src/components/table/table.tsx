// Table.tsx
import React from "react";
import { Icon } from "../imports";

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
    <div className="w-full p-8 bg-white rounded-[10px]">
      <div className="relative w-full overflow-auto">
        <div className="w-full min-w-[800px]">
          <div
            className="grid"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
            }}
          >
            {headCells.map((item, index) => (
              <div
                key={index}
                className="min-w-max flex p-2 border-b border-gray-200"
              >
                <div
                  className={`${index !== 0 && index !== 1 ? "ml-[70px]" : ""}`}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>
          {data.map((rowData, rowIndex) => (
            <div
              key={rowIndex}
              className="grid"
              style={{
                gridTemplateColumns: "repeat(auto-fit, minmax(50px, 1fr))",
              }}
            >
              {Object.values(rowData).map((item: any, columnIndex) => (
                <div
                  key={columnIndex}
                  className="flex p-2 border-b border-gray-200 py-5 px-2"
                >
                  <div>
                    <div
                      className={
                        columnIndex !== 0 && columnIndex !== 1
                          ? "ml-[70px] min-w-max"
                          : ""
                      }
                    >
                      {headCells[columnIndex] === "delete" ? (
                        <Icon
                          className="danger-icon cursor-pointer"
                          icon="delete"
                          width={18}
                          height={18}
                        />
                      ) : (
                        item
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Table;
