import { PricingCardsProps } from "@/types/imports";
import { Btn } from "../imports";
function PricingCard({ title, planTitle, offers }: PricingCardsProps) {
  return (
    <div className="w-full rounded-[10px] bg-white">
      <div className="relative w-full h-[214px] bg-blue pt-6 rounded-[10px]">
        <div className="flex flex-col items-center gap-4 w-[80%] mx-auto">
          <svg
            width="51"
            height="45"
            viewBox="0 0 51 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M21.9767 24.0692C21.9767 22.3383 20.5681 20.9297 18.8372 20.9297C17.1062 20.9297 15.6976 22.3383 15.6976 24.0692C15.6976 25.8002 17.1062 27.2088 18.8372 27.2088C20.5681 27.2088 21.9767 25.8002 21.9767 24.0692ZM18.8372 25.1157C18.2605 25.1157 17.7907 24.6469 17.7907 24.0692C17.7907 23.4915 18.2605 23.0227 18.8372 23.0227C19.4138 23.0227 19.8837 23.4926 19.8837 24.0692C19.8837 24.6458 19.4138 25.1157 18.8372 25.1157Z"
              fill="white"
            />
            <path
              d="M31.3949 20.9297C29.664 20.9297 28.2554 22.3383 28.2554 24.0692C28.2554 25.8002 29.664 27.2088 31.3949 27.2088C33.1258 27.2088 34.5344 25.8002 34.5344 24.0692C34.5344 22.3383 33.1258 20.9297 31.3949 20.9297ZM31.3949 25.1157C30.8183 25.1157 30.3484 24.6469 30.3484 24.0692C30.3484 23.4915 30.8183 23.0227 31.3949 23.0227C31.9715 23.0227 32.4414 23.4926 32.4414 24.0692C32.4414 24.6459 31.9715 25.1157 31.3949 25.1157Z"
              fill="white"
            />
            <path
              d="M29.8705 33.3938C26.9246 34.9081 23.3078 34.9081 20.3619 33.3938C19.847 33.129 19.217 33.332 18.9523 33.8469C18.6875 34.3618 18.8905 34.9918 19.4054 35.2566C21.152 36.1534 23.1268 36.6286 25.1162 36.6286C27.1056 36.6286 29.0804 36.1545 30.827 35.2566C31.3409 34.9918 31.5439 34.3618 31.2802 33.8469C31.0164 33.332 30.3854 33.129 29.8705 33.3938Z"
              fill="white"
            />
            <path
              d="M47.093 20.9302H43.9535V17.7907C43.9535 14.9055 41.6062 12.5581 38.7209 12.5581H26.1628V8.22349C27.9628 7.7557 29.3023 6.13047 29.3023 4.18605C29.3023 1.87744 27.4249 0 25.1163 0C22.8077 0 20.9302 1.87744 20.9302 4.18605C20.9302 6.13047 22.2698 7.7557 24.0698 8.22349V12.5581H11.5116C8.62639 12.5581 6.27907 14.9055 6.27907 17.7907V20.9302H3.13953C1.4086 20.9302 0 22.3388 0 24.0698V33.4884C0 35.2193 1.4086 36.6279 3.13953 36.6279H6.27907V39.7674C6.27907 42.6527 8.62639 45 11.5116 45H38.7209C41.6062 45 43.9535 42.6527 43.9535 39.7674V36.6279H47.093C48.8239 36.6279 50.2326 35.2193 50.2326 33.4884V24.0698C50.2326 22.3388 48.8239 20.9302 47.093 20.9302ZM23.0233 4.18605C23.0233 3.03174 23.962 2.09302 25.1163 2.09302C26.2706 2.09302 27.2093 3.03174 27.2093 4.18605C27.2093 5.34035 26.2706 6.27907 25.1163 6.27907C23.962 6.27907 23.0233 5.34035 23.0233 4.18605ZM3.13953 34.5349C2.56291 34.5349 2.09302 34.066 2.09302 33.4884V24.0698C2.09302 23.4931 2.56291 23.0233 3.13953 23.0233H6.27907V34.5349H3.13953ZM41.8605 39.7674C41.8605 41.4984 40.4519 42.907 38.7209 42.907H11.5116C9.7807 42.907 8.37209 41.4984 8.37209 39.7674V17.7907C8.37209 16.0598 9.7807 14.6512 11.5116 14.6512H38.7209C40.4519 14.6512 41.8605 16.0598 41.8605 17.7907V39.7674ZM48.1395 33.4884C48.1395 34.066 47.6696 34.5349 47.093 34.5349H43.9535V23.0233H47.093C47.6696 23.0233 48.1395 23.4931 48.1395 24.0698V33.4884Z"
              fill="white"
            />
          </svg>
          <p className="text-sm md:text-md font-secondary-medium text-white tracking-[-2%] text-center">
            {title}
          </p>
        </div>
        <div className="absolute w-[80%] left-[50%] translate-x-[-50%] bottom-[-25px] py-8 rounded-[12px] bg-white border border-dashed border-gray-100">
          <p className="text-sm font-secondary-medium text-black text-center">
            {planTitle}
          </p>
        </div>
      </div>
      <div className="w-full py-5">
        <div className="w-full flex justify-center mt-6">
          <div className="flex flex-col gap-[22px]">
            {offers.map((item, index) => (
              <div key={index} className="flex items-center gap-3">
                <svg
                  width="10"
                  height="8"
                  viewBox="0 0 10 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1 4.07692L4.07692 6.53846L9 1"
                    stroke="#7A89FE"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <p className="text-sm text-black2 trakcing-[-2%]">
                  {item.text} {item.main ? (<span className="font-secondary-medium text-black">{item.main}</span>) : ''}
                </p>
              </div>
            ))}
          </div>
        </div>
        <Btn text="Manage Plan" className="primary-btn plan-btn fill w-[88%] mt-[52px] py-[18px] mx-auto flex justify-center"/>
      </div>
    </div>
  );
}
export default PricingCard;
