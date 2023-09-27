import { TooltipProps } from "@/types/imports";
import { Icon } from "../imports";

function Tooltip({ className='', text, type }: TooltipProps) {
  return (
    <div className="relative tooltip group">
      {type === "info" ? 
      <Icon icon="info-round" className="stroke" width={19} height={19}/> : <></>}
      <div className={`${className} invisible group-hover:visible delay-100 bg-white z-[99] tooltip-text absolute top-[calc(100%+7px)] left-[-50px] sm:left-[0px] min-w-[215px] max-w-[215px] rounded-[10px] px-2 pt-2 pb-3 border border-gray-100 text-gray-300 transition-all`}>
        <p className="text-xs font-secondary-regular text-gray-300">{text}</p>
      </div>
    </div>
  );
}
export default Tooltip;
