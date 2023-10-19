import { useEffect, useState } from "react";
import axios from "axios";

import { PageLayout, PricingCard } from "@/components/imports";
import { BillingType } from "@/store/types";

import { BILLING_URL } from "@/apis/endpoint";
import { BILLINGS_PAGE_TITLE } from "@/config/utils";

const BillingsPage = () => {
  const [billing, setBilling] = useState<BillingType | null>(null);
  const accessToken = localStorage.getItem("access_token");

  useEffect(() => {
    document.title = BILLINGS_PAGE_TITLE
  })

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
    getBillingInfo();
  }, []);

  return (
    <PageLayout>
      <div className="flex items-center gap-4 pt-7 pb-7 sticky top-0 bg-milk z-[9999]">
        <h2 className="font-secondary-medium text-2xl text-black tracking-[-2%]">
          Billings
        </h2>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
        {billing ? <PricingCard info={billing} /> : <></>}
      </div>
    </PageLayout>
  );
}

export default BillingsPage;
