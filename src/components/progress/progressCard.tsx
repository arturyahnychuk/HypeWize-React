import { ProgressCardProps } from "@/types/imports";
import { Tooltip } from "../imports";
import { CircularProgressbar} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ProgressCard({ title, tooltipText, text, progress }: ProgressCardProps) {
  return (
    <div className="w-full rounded-[10px] bg-white px-4 md:px-[18px] py-4 md:pt-[18px] pb-4 md:pb-10">
      <div className="flex items-center gap-3">
        <div className="w-full flex flex-col gap-5 bg-white rounded-[10px]">
          <div className="flex items-center gap-4">
            <label
              htmlFor="welcome_message"
              className="text-base md:text-md text-black tracking-[-2%]"
            >
              {title}
            </label>
            <Tooltip type="info" text={tooltipText} />
          </div>
          <div className="flex justify-center md:mt-9 md:mb-4">
            <CircularProgressbar
              strokeWidth={12}
              value={progress}
              text={`${progress}%`}
            />
          </div>
          <p className="text-xs text-black font-secondary-regular tracking-[-2%] mx-auto text-center md:max-w-[60%]">{text}</p>
        </div>
      </div>
    </div>
  );
}

export default ProgressCard;
