import {
  Btn,
  CheckBox,
  Input,
  PageLayout,
  Tooltip,
} from "@/components/imports";
import { RoutesPath } from "@/types/router";
import { Link } from "react-router-dom";
import { useState, ChangeEvent } from "react";
import { DocsImage } from "@/assets/imports";

function ContentCreatePage() {
  const [websiteVal, setWebsteVal] = useState("");
  const handleAddWebsite = (e: ChangeEvent<HTMLInputElement>) => {
    setWebsteVal(e.target.value);
  };
  const handleCheckboxes = (checked: boolean) => {
    console.log(checked);
  };
  return (
    <PageLayout>
      <div className="flex flex-col items-start justify-between">
        <div className="flex items-center gap-4">
          <Link to={RoutesPath.PROJECTCONTENTS}>
            <Btn
              text="Back"
              className="primary-btn fill stroke"
              icon={true}
              name="arrow-left"
              width={14}
              height={14}
            />
          </Link>
        </div>
        <div className="w-full mt-6">
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
            <div className="w-full mx-auto mt-10 max-w-[350px] bg-white rounded-[10px] flex flex-col items-center gap-10 p-6">
              <h4 className="text-2xl font-main-medium tracking-[-2%] text-blue">
                Upload Content
              </h4>
              <img src={DocsImage} alt="Docs" />
              <div className="text-md text-black tracking-[-2%] text-center">
                Drag & Drop to upload documents
                <div className="flex items-center gap-1 justify-center">
                or
                <div className=" relative text-blue overflow-hidden w-max">
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
