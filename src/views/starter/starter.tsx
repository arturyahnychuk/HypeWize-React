import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Btn, PageLayout } from "@/components/imports";
import { ProgressBar } from "@/components/imports";
import { ProjectType, StarterGuideType } from "@/store/types";
import { RoutesPath } from "@/types/imports";
import useAuthStore from "@/store/auth";

import { PROJECTS_ROOT_URL, STARTER_GUID_URL, USERS_URL } from "@/apis/endpoint";
import { STARTER_GUIDE_PAGE_TITLE } from "@/config/utils";

const StarterPage = () => {
  const [starterGuideInfo, setStarterGuideInfo] = useState<StarterGuideType | null>(null);
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [step, setStep] = useState(0);
  
  const navigate = useNavigate();
  const { profileInfo, setProfileInfo } = useAuthStore();
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    document.title = STARTER_GUIDE_PAGE_TITLE;
}, []);

  const getStarterGuideInfo = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${ STARTER_GUID_URL }`,
        config
      );

      setStarterGuideInfo(response.data);

      setStep(Object.entries(response.data).filter((item) => item[1] == true).length);

    } catch (error: any) {
      console.log(error);
    }
  }

  const handlehideStarterGuideVisible = async () => {

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.patch(
        `${ USERS_URL }/${profileInfo?.id}`,
        {
          hideStarterGuide: true
        },
        config
      );

      if (response.data.id) setProfileInfo(response.data);

    } catch (error: any) {
      console.log(error);
    }
  }

  const getProjects = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${ PROJECTS_ROOT_URL }`,
        config
      );

      setProjects(response.data.results);

    } catch (error: any) {
      console.log(error);
    }
  }



  useEffect(() => {
    getStarterGuideInfo();
    getProjects();
  }, []);

  return (
    <PageLayout>
      {starterGuideInfo ? <>
        <div className="flex items-center gap-4 pt-6 pb-7 sticky top-0 bg-milk z-[9999]">
          <h2 className="min-w-max font-secondary-medium text-2xl text-black tracking-[-2%]">
            Starter Guide
          </h2>
          <div className="flex justify-center w-full h-[15px]">
            <div className="w-full max-w-[257px] sm:mr-40">
              <ProgressBar totalSteps={6} completedSteps={step} />
            </div>
          </div>
        </div>
        <div className="w-full mx-auto max-w-[515px] bg-white rounded-[12px]">
          <div className="w-full flex flex-col gap-3 px-5 pt-3 pb-5">
            <div className="flex flex-col gap-3">
              <h6 className="font-secondary-semibold leading-[200%] text-xl text-blue">
                Setup
              </h6>
              <div className="flex flex-col gap-4">
                <div className={`${starterGuideInfo.email === false ? '' : starterGuideInfo.email == true ? 'success' : 'disabled'} step w-full flex items-center justify-between px-[15px] py-[14px] border border-gray-100 rounded-[10px]`}>
                  <p className="text text-sm text-blue tracking-[-2%]">
                    Verify Your Email
                  </p>
                  <Btn text={starterGuideInfo.email ? 'Verified' : 'Verify'} onClick={() => { if (!starterGuideInfo.email) navigate(RoutesPath.SETTINGS) }} className="btn !py-[6px]" />
                </div>
                <div className={`${starterGuideInfo.project === false ? '' : starterGuideInfo.project == true ? 'success' : 'disabled'} step w-full flex items-center justify-between px-[15px] py-[14px] border border-gray-100 rounded-[10px]`}>
                  <p className="text text-sm text-blue tracking-[-2%]">
                    Create your first project
                  </p>
                  <Btn text={starterGuideInfo.project ? 'Created' : 'Create'} onClick={() => { if (!starterGuideInfo.project) navigate(RoutesPath.PROJECTS) }} className="btn !py-[6px]" />
                </div>
                <div className={`${starterGuideInfo.content === false ? '' : starterGuideInfo.content == true ? 'success' : 'disabled'} step w-full flex items-center justify-between px-[15px] py-[14px] border border-gray-100 rounded-[10px]`}>
                  <p className="text text-sm text-blue tracking-[-2%]">
                    Add content
                  </p>
                  <Btn text={starterGuideInfo.content ? 'Added' : 'Add'} onClick={() => { if (!starterGuideInfo.content && projects.length) navigate(RoutesPath.PROJECTCONTENTS_CREATE + "/" + projects[0].id) }} className="btn !py-[6px]" />
                </div>
                <div className={`${starterGuideInfo.message === false ? '' : starterGuideInfo.message == true ? 'success' : 'disabled'} step w-full flex items-center justify-between px-[15px] py-[14px] border border-gray-100 rounded-[10px]`}>
                  <p className="text text-sm text-blue tracking-[-2%]">
                    Send your first message
                  </p>
                  <Btn text={starterGuideInfo.message ? 'Sent' : 'Send'} onClick={() => { if (!starterGuideInfo.message && projects.length) navigate(RoutesPath.PROJECTCONTENTS + "/" + projects[0].id) }} className="btn !py-[6px]" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <h6 className="font-secondary-semibold leading-[200%] text-xl text-blue">
                Leads
              </h6>
              <div className="flex flex-col gap-4">
                <div className={`${starterGuideInfo.forms === false ? '' : starterGuideInfo.forms == true ? 'success' : 'disabled'} step w-full flex items-center justify-between px-[15px] py-[14px] border border-gray-100 rounded-[10px]`}>
                  <p className="text text-sm text-blue tracking-[-2%]">
                    Create form fields
                  </p>
                  <Btn text={starterGuideInfo.forms ? 'Created' : 'Create'} onClick={() => { if (!starterGuideInfo.forms) navigate(RoutesPath.PROJECTINFO + "/" + projects[0].id) }} className="btn !py-[6px]" />
                </div>
                <div className={`${starterGuideInfo.hubspot === false ? '' : starterGuideInfo.hubspot == true ? 'success' : 'disabled'} step w-full flex items-center justify-between px-[15px] py-[14px] border border-gray-100 rounded-[10px]`}>
                  <p className="text text-sm text-blue tracking-[-2%]">
                    Connect to CRM
                  </p>
                  <Btn text={starterGuideInfo.email ? 'Connected' : 'Connect'} onClick={() => { if (!starterGuideInfo.hubspot) navigate(RoutesPath.SETTINGS) }} className="btn !py-[6px]" />
                </div>
              </div>
            </div>
          </div>
        </div>
        { !starterGuideInfo.hideStarterGuide ? <p onClick={handlehideStarterGuideVisible} className="text-md text-blue font-seconday-medium trarcking-[-2%] mx-auto w-max mt-[58px] mb-[70px] cursor-pointer">Don’t show again</p> : ""} 
      </> : <></>}

    </PageLayout>
  );
}
export default StarterPage;
