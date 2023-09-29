import { Btn, PageLayout } from "@/components/imports";
import { ProgressBar } from "@/components/imports";
import { useState } from "react";
function StarterPage() {
  const [step, setStep] = useState(0);
  const handleStepClick = () => {
    setStep(1);
  };

  return (
    <PageLayout>
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
              <div className={`${step === 0 ? '' : step > 0 ? 'success' : 'disabled'} step w-full flex items-center justify-between px-[15px] py-[14px] border border-gray-100 rounded-[10px]`}>
                <p className="text text-sm text-blue tracking-[-2%]">
                  Verify Your Email
                </p>
                <Btn onClick={handleStepClick} text={step > 0 ? 'Verified' : 'Verify'} className="btn !py-[6px]" />
              </div>
              <div className={`${step === 1 ? '' : step > 1 ? 'success' : 'disabled'} step w-full flex items-center justify-between px-[15px] py-[14px] border border-gray-100 rounded-[10px]`}>
                <p className="text text-sm text-blue tracking-[-2%]">
                  Create your first project
                </p>
                <Btn text="Create" className="btn !py-[6px]" />
              </div>
              <div className="step disabled w-full flex items-center justify-between px-[15px] py-[14px] border border-gray-100 rounded-[10px]">
                <p className="text text-sm text-blue tracking-[-2%]">
                  Add content
                </p>
                <Btn text="Add" className="btn !py-[6px]" />
              </div>
              <div className="step disabled w-full flex items-center justify-between px-[15px] py-[14px] border border-gray-100 rounded-[10px]">
                <p className="text text-sm text-blue tracking-[-2%]">
                  Send your first message
                </p>
                <Btn text="Send" className="btn !py-[6px]" />
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h6 className="font-secondary-semibold leading-[200%] text-xl text-blue">
              Leads
            </h6>
            <div className="flex flex-col gap-4">
              <div className="step disabled w-full flex items-center justify-between px-[15px] py-[14px] border border-gray-100 rounded-[10px]">
                <p className="text text-sm text-blue tracking-[-2%]">
                  Create form fields
                </p>
                <Btn text="Create" className="btn !py-[6px]" />
              </div>
              <div className="step disabled w-full flex items-center justify-between px-[15px] py-[14px] border border-gray-100 rounded-[10px]">
                <p className="text text-sm text-blue tracking-[-2%]">
                  Connect to CRM
                </p>
                <Btn text="Connect" className="btn !py-[6px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
        <p className="text-md text-blue font-seconday-medium trarcking-[-2%] mx-auto w-max mt-[58px] mb-[70px] cursor-pointer">Don’t show again</p>
    </PageLayout>
  );
}
export default StarterPage;
