import { useEffect, useState } from "react";
import axios from "axios";

import { PageLayout, ProgressCard } from "@/components/imports";
import { BillingType, UsageType } from "@/store/types";

import { BILLING_URL, USAGE_STATS_URL } from "@/apis/endpoint";

const UsagePage = () => {
  const [usageInfo, setUsageInfo] = useState<UsageType | null>(null);
  const [billing, setBilling] = useState<BillingType | null>(null);
  
  const accessToken = localStorage.getItem("access_token");
  
  const getUsageInfo = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${ USAGE_STATS_URL }`,
        config
      );


      setUsageInfo(response.data);

    } catch (error: any) {
      console.log(error);
    }
  }

  const getBillingInfo = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${ BILLING_URL }`,
        config
      );

      setBilling(response.data);

    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUsageInfo();
    getBillingInfo();
  }, []);

  return (
    <PageLayout>
      <div className="flex items-center gap-4 pt-7 pb-7 sticky top-0 bg-milk z-[9999]">
        <h2 className="font-secondary-medium text-2xl text-black tracking-[-2%]">
          Remaining usage
        </h2>
      </div>
      {usageInfo && billing ? <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {usageInfo.messages ? <ProgressCard
          title="Questions"
          tooltipText="This is info section to elcome message, here! Detail goes here. This is info section to welcome message, here! Detail goes here."
          progress={usageInfo.messages.currentMonth ? Number((usageInfo.messages.currentMonth * 100 / billing.features.questionLimit).toFixed(2)) : 0}
          text={`You have used ${usageInfo.messages.currentMonth} questions out of ${billing.features.questionLimit}.`}
        /> : <></>}
        {usageInfo.projects ? <ProgressCard
          title="Projects"
          tooltipText="Projects This is section to elcome message, here! Detail goes here. This is info section to welcome message, here! Detail goes here."
          progress={usageInfo.projects.all ? Number((usageInfo.projects.all * 100 / billing.features.projectLimit).toFixed(2)) : 0}
          text={`You have used ${usageInfo.projects.all || 0} projects out of ${billing.features.projectLimit}.`}
        /> : <></>}
        {usageInfo.documentPages ? <ProgressCard
          title="Documents"
          tooltipText="Projects This is section to elcome message, here! Detail goes here. This is info section to welcome message, here! Detail goes here."
          progress={usageInfo.documentPages.all ? Number((usageInfo.documentPages.all * 100 / billing.features.documentPageLimit).toFixed(2)) : 0}
          text="You have uploaded 41 documents out of 100."
        /> : <></>}
      </div> : <></>}
    </PageLayout>
  );
}
export default UsagePage;
