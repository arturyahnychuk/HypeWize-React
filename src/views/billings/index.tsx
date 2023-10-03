import { PageLayout, PricingCard } from "@/components/imports";

function BillingsPage() {
    const proPlanOffers = [
        {
            text: "Active chatbots Unlimited"
        },
        {
            text: "Questions limit:",
            main: "100"
        },
        {
            text: "Projects Limit:",
            main: "50"
        },
        {
            text: "Documents Limit:",
            main: "100"
        },
        {
            text: "Words Limit:",
            main: "unlimited"
        }
    ]
  return (
    <PageLayout>
      <div className="flex items-center gap-4 pt-7 pb-7 sticky top-0 bg-milk z-[9999]">
        <h2 className="font-secondary-medium text-2xl text-black tracking-[-2%]">
          Billings
        </h2>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[10px]">
        <PricingCard title="You are currently subscribe to this package." planTitle="Professional Plan" offers={proPlanOffers}/>
      </div>
    </PageLayout>
  );
}

export default BillingsPage;
