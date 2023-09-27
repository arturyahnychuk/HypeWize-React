import {
  Btn,
  CheckBox,
  Input,
  PageLayout,
  Tooltip,
} from "@/components/imports";
import { RoutesPath } from "@/types/router";
import { Link } from "react-router-dom";
import { useState, ChangeEvent, useEffect } from "react";
import { DocsImage } from "@/assets/imports";

function ContentCreatePage() {
  const [websiteVal, setWebsteVal] = useState("");
  const handleAddWebsite = (e: ChangeEvent<HTMLInputElement>) => {
    setWebsteVal(e.target.value);
  };
  const handleCheckboxes = (checked: boolean) => {
    console.log(checked);
  };
  const [isDrag, setIsDrag] = useState(false);
  return (
    <PageLayout>
      {isDrag && (
        <div className="transtion-all w-full h-screen fixed top-0 left-0 bg-blue-10 z-[99999] pt-7 pb-5 pl-5 md:pl-14 pr-5">
          <div className="md:w-[calc(100%-200px)] ml-auto h-full md:h-full rounded-[10px] border-2 border-dashed border-black2"></div>
        </div>
      )}
      <div className="flex flex-col items-start justify-between">
        <div className="w-full flex items-center gap-4 pt-7 pb-7 sticky top-0 bg-milk z-[9999]">
          <Link to={RoutesPath.PROJECTCONTENTS}>
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
        <div className="w-full">
          <div className="w-full flex flex-col gap-5 bg-white px-5 py-4 rounded-[10px]">
            <div className="flex items-center gap-4">
              <label htmlFor="welcome_message">Add Website</label>
              <Tooltip
                type="info"
                text="This is info section to Agent Name, here! Detail goes here. This is info section to welcome message, here! Detail goes here. "
              />
              <Btn
                text="Watch Tutorial"
                className="bg-blue !px-[10px] !py-2 !gap-2 primary-btn fill"
                icon={true}
                name="play"
                width={14}
                height={14}
              />
            </div>
            <div className="relative">
              <Input
                type="text"
                name="name"
                value={websiteVal}
                onChange={handleAddWebsite}
                placeholder=""
              />
            </div>
            <div className="flex items-center gap-3">
              <CheckBox
                onCheckChange={() => handleCheckboxes}
                className="checkbox-primary !gap-2"
                name="crawl"
                label="<p class='text-black text-xs font-secondary-medium'>Crawl</p>"
              />
              <CheckBox
                onCheckChange={() => handleCheckboxes}
                className="checkbox-primary !gap-2"
                name="single_page"
                label="<p class='text-black text-xs font-secondary-medium'>Single Page</p>"
              />
            </div>
          </div>

          <div className="w-full max-w-[80%] mx-auto">
            <div className="flex items-center gap-4 mt-[60px]">
              <div className="w-full h-[1px] bg-gray-100"></div>
              <p className="text-md text-gray-100">or</p>
              <div className="w-full h-[1px] bg-gray-100"></div>
            </div>
            <div className="relative overflow-hidden w-full mx-auto mt-10 max-w-[350px] bg-white rounded-[10px] flex flex-col items-center gap-10 p-6">
              <div
                onDragEnter={() => setIsDrag(true)}
                onDragLeave={()=> setIsDrag(false)}
                className="absolute z-[9999999] top-0 left-0 w-full h-full"
              ></div>
              <h4 className="text-2xl font-main-medium tracking-[-2%] text-blue">
                Upload Content
              </h4>
              {/* Set the draggable attribute to false for the img element */}
              <img src={DocsImage} alt="Docs" draggable="false" />
              <div className="text-md text-black tracking-[-2%] text-center">
                Drag & Drop to upload documents
                <div className="flex items-center gap-1 justify-center">
                  or
                  <div
                    draggable // Make this element draggable
                    onDragStart={(e) => e.preventDefault()} // Prevent drag start, if needed
                    className=" relative text-blue overflow-hidden w-max"
                  >
                    <Input
                      type="file"
                      className="absolute top-0 left-0 opacity-0 cursor-pointer"
                    />
                    Browse
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
export default ContentCreatePage;
