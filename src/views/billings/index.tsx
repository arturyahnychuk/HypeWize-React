import { PageLayout, PricingCard } from "@/components/imports";
import { BillingType } from "@/store/types";
import axios from "axios";
import { useEffect, useState } from "react";

function BillingsPage() {

  const [billing, setBilling] = useState<BillingType | null>(null);

  const accessToken = localStorage.getItem("access_token");

  const getBillingInfo = async () => {



    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/billing`,
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
