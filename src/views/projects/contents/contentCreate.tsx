import {
  Btn,
  CheckBox,
  Input,
  PageLayout,
  Tooltip,
} from "@/components/imports";
import { RoutesPath } from "@/types/router";
import { Link, useParams } from "react-router-dom";
import React, { useState, ChangeEvent, useEffect, useCallback } from "react";
import { DocsImage } from "@/assets/imports";
import axios from "axios";
import { ProjectTpye } from "@/store/types";

function ContentCreatePage() {

  const { id } = useParams();

  const [projectInfo, setProjectInfo] = useState<ProjectTpye | null>(null);
  const [websiteVal, setWebsteVal] = useState("");
  const [linkType, setLinkType] = useState<"crawl" | "single">("crawl");
  const handleAddWebsite = (e: ChangeEvent<HTMLInputElement>) => {
    setWebsteVal(e.target.value);
  };
  const handleCheckboxes = (linkType: "crawl" | "single") => {
    setLinkType(linkType);
  };
  const [isDrag, setIsDrag] = useState(false);

  const accessToken = localStorage.getItem("access_token");

  const updateProjectInfo = async (data: any) => {
    console.log("data:", data);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.patch(
        `${import.meta.env.VITE_API_ENDPOINT}/projects/${id}`,
        {
          ...data
        },
        config
      );

      if (response.data) {
        console.log("Updated Successfully!");
      }

    } catch (error: any) {
      console.log(error);
    }
  };

  const uploadDocument = async (data: any) => {

    const files = new FormData();
    files.append('files', data);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.post(
        `${import.meta.env.VITE_API_ENDPOINT}/projects/${id}/upload`,
        files,
        config
      );

      if (response.data) {
        console.log("Updated Successfully!");
      }

    } catch (error: any) {
      console.log(error);
    }
  }

  const handleKeyDown = useCallback(async (keyBoard: any) => {

    if (keyBoard.code == "Enter" || keyBoard.code == "NumpadEnter") {

      let _projectInfo: ProjectTpye = Object.create(projectInfo);

      if (linkType == "crawl") {
        const data = {
          domain: websiteVal
        }
        updateProjectInfo(data);
      } else {
        const data = {
          links: [websiteVal]
        }
        updateProjectInfo(data);
      }

    }

  }, [websiteVal, linkType]);

  const handleUploadedDoc = (e: any, type: "drag" | "select") => {
    e.preventDefault();
    if (type == "drag") setIsDrag(false);

    // Access the dropped files from the event
    const files = (type == "drag" ? e.dataTransfer.files : e.target.files);

    console.log("files:", files[0]);

    // Handle the dropped files (e.g., display the image)
    if (files.length > 0) {

      uploadDocument(files[0]);

    }
  };

  const getProjectInfo = async (projectId: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/projects/${projectId}`,
        config
      );

      setProjectInfo(response.data);


    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (id) getProjectInfo(id);
  }, [id]);

  return (
    <PageLayout>
      {isDrag && (
        <div className="transtion-all w-full h-screen fixed top-0 left-0 bg-blue-10 z-[99999] pt-7 pb-5 pl-5 md:pl-14 pr-5">
          <div className="md:w-[calc(100%-200px)] ml-auto h-full md:h-full rounded-[10px] border-2 border-dashed border-black2"></div>
        </div>
      )}
      <div className="flex flex-col items-start justify-between">
        <div className="w-full flex items-center gap-4 pt-7 pb-7 sticky top-0 bg-milk z-[9999]">
          <Link to={RoutesPath.PROJECTCONTENTS + "/" + id}>
            <Btn
              text="Contents"
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
                onKeyDown={handleKeyDown}
                placeholder=""
              />
            </div>
            <div className="flex items-center gap-3">
              <CheckBox
                onCheckChange={() => handleCheckboxes("crawl")}
                checked={linkType == 'crawl'}
                className="checkbox-primary !gap-2"
                name="link_type"
                label="<p class='text-black text-xs font-secondary-medium'>Crawl</p>"
              />
              <CheckBox
                onCheckChange={() => handleCheckboxes("single")}
                checked={linkType == 'single'}
                className="checkbox-primary !gap-2"
                name="link_type"
                label="<p class='text-black text-xs font-secondary-medium'>Single Page</p>"
              />
            </div>
          </div>

          <div className="w-full max-w-[80%] mx-auto pb-[116px]">
            <div className="flex items-center gap-4 mt-[60px] mb-[60px]">
              <div className="w-full h-[1px] bg-gray-100"></div>
              <p className="text-md text-gray-100">or</p>
              <div className="w-full h-[1px] bg-gray-100"></div>
            </div>
            <div className="relative overflow-hidden w-full mx-auto mt-10 max-w-[350px] bg-white rounded-[10px] flex flex-col items-center gap-10 p-6">
              <div
                onDragEnter={() => setIsDrag(true)}
                onDragLeave={() => setIsDrag(false)}
                onDrop={(e) => handleUploadedDoc(e, "drag")}
                onDragOver={(e) => e.preventDefault()}
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
                    className="z-[9999999] relative text-blue overflow-hidden w-max"
                  >
                    <Input
                      type="file"
                      accept=".pdf, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .odt, .epub, .csv, .txt"
                      onChange={(e) => handleUploadedDoc(e, "select")}
                      className="absolute top-0 left-0 opacity-0 cursor-pointer"
                    />
                    Browse
                  </div>
                </div>
                <div>

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
