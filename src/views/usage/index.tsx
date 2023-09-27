import { PageLayout, ProgressCard } from "@/components/imports";

function UsagePage() {
  return (
    <PageLayout>
      <div className="flex items-center gap-4 pt-7 pb-7 sticky top-0 bg-milk z-[9999]">
        <h2 className="font-secondary-medium text-2xl text-black tracking-[-2%]">
          Remaining usage
        </h2>
      </div>
      <div className="w-full grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        <ProgressCard
          title="Questions"
          tooltipText="This is info section to elcome message, here! Detail goes here. This is info section to welcome message, here! Detail goes here."
          progress={78}
          text="You have used 78 questions out of 100."
        />
        <ProgressCard
          title="Projects"
          tooltipText="Projects This is section to elcome message, here! Detail goes here. This is info section to welcome message, here! Detail goes here."
          progress={51}
          text="You have used 26 projects out of 50."
        />
         <ProgressCard
          title="Documents"
          tooltipText="Projects This is section to elcome message, here! Detail goes here. This is info section to welcome message, here! Detail goes here."
          progress={41}
          text="You have uploaded 41 documents out of 100."
        />
      </div>
    </PageLayout>
  );
}
export default UsagePage;
