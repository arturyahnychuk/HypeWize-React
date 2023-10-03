import { useState, ChangeEvent } from "react";
import { Icon, Input } from "@/components/imports";
import { RobotImage } from "@/assets/imports";

interface FormData {
  name: string;
  email: string;
  phone: string;
}
function Chatbot() {
  const [message, setMessage] = useState("");
  const [chatActive, setChatActive] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
  });
  const handleMessageSend = () => {
    alert("message submited");
  };
  const startChat = ()=> {
    setChatActive(true)
  }
  const handleMessageInput = (e: ChangeEvent<HTMLInputElement>): void => {
    setMessage(e.target.value);
  };
  const handleFormData = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = () => {
    alert("submited");
  };
  return (
    <div className="w-full h-screen">
      {!chatActive ? (
        <>
        <div className="w-full h-full bg-blue sm:px-5 sm:pb-5 sm:pt-[38px]">
          <div className="w-full h-full grid grid-rows-[180px,1fr] sm:grid-rows-[auto,1fr] sm:gap-[48px]">
            {/* */}
            <div className="relative w-full">
              <div className="w-full max-w-[316px] md:max-w-[500px] md:max-w-[648px] flex justify-center pb-[46px] sm:pb-[0px] items-end sm:block h-full mx-auto">
                <p className="font-secondary-medium text-white text-base sm:text-[22px] text-center">
                  Please fill out the form below to start chatting with the next
                  agent available.
                </p>
              </div>
            </div>
            {/* */}
            <div className="w-full h-full sm:rounded-[10px] bg-white">
              <div className="w-full h-full py-4 px-5">
                <form
                  onSubmit={handleSubmit}
                  className="w-full h-full flex flex-col items-center justify-between"
                >
                  <div className="w-full flex flex-col gap-5">
                    <Input
                      name="name"
                      placeholder="Name *"
                      value={formData.name}
                      onInput={handleFormData}
                    />
                    <Input
                      name="email"
                      placeholder="Email *"
                      value={formData.email}
                      onInput={handleFormData}
                    />
                    <Input
                      name="phone"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onInput={handleFormData}
                    />
                  </div>

                  <div className="w-full flex flex-col gap-4 sm:gap-[14px]">
                    <button onClick={startChat}
                      type="submit"
                      className="w-full items-center justify-center rounded-[5px] bg-blue py-[17px]"
                    >
                      <p className="font-secondary-regular text-white text-base tracking-[-2%]">
                        Start Chat
                      </p>
                    </button>
                    <div className="flex items-center gap-1 justify-center">
                      <p className="text-sm font-secondary-regular leading-[20px] text-blackLight">
                        Powered by
                      </p>
                      <svg
                        className="mt-1"
                        width="73"
                        height="16"
                        viewBox="0 0 73 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.3948 1.53V12H7.2948V7.545H2.8098V12H0.709805V1.53H2.8098V5.835H7.2948V1.53H9.3948ZM19.1118 3.69L13.9668 15.93H11.7318L13.5318 11.79L10.2018 3.69H12.5568L14.7018 9.495L16.8768 3.69H19.1118ZM22.0438 4.89C22.3138 4.51 22.6838 4.195 23.1538 3.945C23.6338 3.685 24.1788 3.555 24.7888 3.555C25.4988 3.555 26.1388 3.73 26.7088 4.08C27.2888 4.43 27.7438 4.93 28.0738 5.58C28.4138 6.22 28.5838 6.965 28.5838 7.815C28.5838 8.665 28.4138 9.42 28.0738 10.08C27.7438 10.73 27.2888 11.235 26.7088 11.595C26.1388 11.955 25.4988 12.135 24.7888 12.135C24.1788 12.135 23.6388 12.01 23.1688 11.76C22.7088 11.51 22.3338 11.195 22.0438 10.815V15.96H19.9438V3.69H22.0438V4.89ZM26.4388 7.815C26.4388 7.315 26.3338 6.885 26.1238 6.525C25.9238 6.155 25.6538 5.875 25.3138 5.685C24.9838 5.495 24.6238 5.4 24.2338 5.4C23.8538 5.4 23.4938 5.5 23.1538 5.7C22.8238 5.89 22.5538 6.17 22.3438 6.54C22.1438 6.91 22.0438 7.345 22.0438 7.845C22.0438 8.345 22.1438 8.78 22.3438 9.15C22.5538 9.52 22.8238 9.805 23.1538 10.005C23.4938 10.195 23.8538 10.29 24.2338 10.29C24.6238 10.29 24.9838 10.19 25.3138 9.99C25.6538 9.79 25.9238 9.505 26.1238 9.135C26.3338 8.765 26.4388 8.325 26.4388 7.815ZM37.5348 7.665C37.5348 7.965 37.5148 8.235 37.4748 8.475H31.3998C31.4498 9.075 31.6598 9.545 32.0298 9.885C32.3998 10.225 32.8548 10.395 33.3948 10.395C34.1748 10.395 34.7298 10.06 35.0598 9.39H37.3248C37.0848 10.19 36.6248 10.85 35.9448 11.37C35.2648 11.88 34.4298 12.135 33.4398 12.135C32.6398 12.135 31.9198 11.96 31.2798 11.61C30.6498 11.25 30.1548 10.745 29.7948 10.095C29.4448 9.445 29.2698 8.695 29.2698 7.845C29.2698 6.985 29.4448 6.23 29.7948 5.58C30.1448 4.93 30.6348 4.43 31.2648 4.08C31.8948 3.73 32.6198 3.555 33.4398 3.555C34.2298 3.555 34.9348 3.725 35.5548 4.065C36.1848 4.405 36.6698 4.89 37.0098 5.52C37.3598 6.14 37.5348 6.855 37.5348 7.665ZM35.3598 7.065C35.3498 6.525 35.1548 6.095 34.7748 5.775C34.3948 5.445 33.9298 5.28 33.3798 5.28C32.8598 5.28 32.4198 5.44 32.0598 5.76C31.7098 6.07 31.4948 6.505 31.4148 7.065H35.3598ZM52.7626 1.53L49.8376 12H47.3626L45.3976 4.545L43.3426 12L40.8826 12.015L38.0626 1.53H40.3126L42.1576 9.66L44.2876 1.53H46.6276L48.6376 9.615L50.4976 1.53H52.7626ZM54.8988 2.7C54.5288 2.7 54.2188 2.585 53.9688 2.355C53.7288 2.115 53.6088 1.82 53.6088 1.47C53.6088 1.12 53.7288 0.829999 53.9688 0.599999C54.2188 0.359999 54.5288 0.239999 54.8988 0.239999C55.2688 0.239999 55.5738 0.359999 55.8138 0.599999C56.0638 0.829999 56.1888 1.12 56.1888 1.47C56.1888 1.82 56.0638 2.115 55.8138 2.355C55.5738 2.585 55.2688 2.7 54.8988 2.7ZM55.9338 3.69V12H53.8338V3.69H55.9338ZM59.6286 10.275H63.3336V12H57.2436V10.305L60.8736 5.415H57.2586V3.69H63.2886V5.385L59.6286 10.275ZM72.3846 7.665C72.3846 7.965 72.3646 8.235 72.3246 8.475H66.2496C66.2996 9.075 66.5096 9.545 66.8796 9.885C67.2496 10.225 67.7046 10.395 68.2446 10.395C69.0246 10.395 69.5796 10.06 69.9096 9.39H72.1746C71.9346 10.19 71.4746 10.85 70.7946 11.37C70.1146 11.88 69.2796 12.135 68.2896 12.135C67.4896 12.135 66.7696 11.96 66.1296 11.61C65.4996 11.25 65.0046 10.745 64.6446 10.095C64.2946 9.445 64.1196 8.695 64.1196 7.845C64.1196 6.985 64.2946 6.23 64.6446 5.58C64.9946 4.93 65.4846 4.43 66.1146 4.08C66.7446 3.73 67.4696 3.555 68.2896 3.555C69.0796 3.555 69.7846 3.725 70.4046 4.065C71.0346 4.405 71.5196 4.89 71.8596 5.52C72.2096 6.14 72.3846 6.855 72.3846 7.665ZM70.2096 7.065C70.1996 6.525 70.0046 6.095 69.6246 5.775C69.2446 5.445 68.7796 5.28 68.2296 5.28C67.7096 5.28 67.2696 5.44 66.9096 5.76C66.5596 6.07 66.3446 6.505 66.2646 7.065H70.2096Z"
                          fill="url(#paint0_linear_150_137)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_150_137"
                            x1="0.580399"
                            y1="6.34667"
                            x2="74.5909"
                            y2="6.75605"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#4666FF" />
                            <stop offset="1" stopColor="#7433CC" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        </>
      ) : (
        <>
        <div className="w-full h-full">
          <div className="w-full h-full grid grid grid-rows-[auto,1fr] bg-white px-[19px] pr-[9px] sm:pr-[19px]">
            {/* */}
            <div className="w-full h-full">
              <div className="w-full h-full grid grid-rows-[1fr,auto] gap-1">
                <div className="w-full h-[calc(100vh-138px)] sm:h-[calc(100vh-138px)] pr-3 custom-scrollbar overflow-auto pt-4">
                  <div className="w-full h-full flex flex-col gap-[11px]">
                    <div className="flex items-start gap-4">
                      <img
                        src={RobotImage}
                        alt="Robot"
                        className="mt-[11px] sm:mt-[8px] w-[30px] sm:w-[38px]"
                      />
                      <div className="flex flex-col gap-2 max-w-[75%]">
                        <div className="p-4 pr-6 bg-gray-500 rounded-[12px] w-full">
                          <p className="text-xs sm:text-base text-black2 leading-[20px] ">
                            Hi! Ask me anything and I’ll search my sources for
                            an answer!
                          </p>
                        </div>
                        <p className="text-black2 text-[10px] flex items-center">
                          Bot{" "}
                          <span className="flex w-[2px] sm:w-[1px] mx-1 h-[2px] bg-black rounded-full"></span>{" "}
                          10:40 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-end gap-4 ">
                      <div className="flex flex-col items-end gap-2 max-w-[75%]">
                        <div className="p-4 pr-6 bg-blue rounded-[12px] w-full">
                          <p className="text-xs sm:text-base text-white leading-[20px] ">
                            Do you offer teeth whitening?
                          </p>
                        </div>
                        <p className="text-black2 text-[10px] flex items-center">
                          10:40 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <img
                        src={RobotImage}
                        alt="Robot"
                        className="mt-[11px] sm:mt-[8px] w-[30px] sm:w-[38px]"
                      />
                      <div className="flex flex-col gap-2 max-w-[664px]">
                        <div className="p-4 pr-6 bg-gray-500 rounded-[12px] w-full">
                          <p className="text-xs sm:text-base text-black2 leading-[20px] ">
                            Yes, we offer professional teeth whitening
                            treatments at our dental practice. Our experienced
                            dentists can help you achieve a whiter and brighter
                            smile.
                          </p>
                        </div>
                        <p className="text-black2 text-[10px] flex items-center">
                          Bot{" "}
                          <span className="flex w-[2px] sm:w-[1px] mx-1 h-[2px] bg-black rounded-full"></span>{" "}
                          10:40 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-end gap-4 ">
                      <div className="flex flex-col items-end gap-2 max-w-[75%]">
                        <div className="p-4 pr-6 bg-blue rounded-[12px] w-full">
                          <p className="text-xs sm:text-base text-white leading-[20px] ">
                            we offer professional teeth whitening treatments at
                            our dental practice.{" "}
                          </p>
                        </div>
                        <p className="text-black2 text-[10px] flex items-center">
                          10:40 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <img
                        src={RobotImage}
                        alt="Robot"
                        className="mt-[11px] sm:mt-[8px] w-[30px] sm:w-[38px]"
                      />
                      <div className="flex flex-col gap-2 max-w-[664px]">
                        <div className="p-4 pr-6 bg-gray-500 rounded-[12px] w-full">
                          <p className="text-xs sm:text-base text-black2 leading-[20px] ">
                            Yes, we offer professional teeth whitening
                            treatments at our dental practice. Our experienced
                            dentists can help you achieve a whiter and brighter
                            smile.
                          </p>
                        </div>
                        <p className="text-black2 text-[10px] flex items-center">
                          Bot{" "}
                          <span className="flex w-[2px] sm:w-[1px] mx-1 h-[2px] bg-black rounded-full"></span>{" "}
                          10:40 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-end gap-4 ">
                      <div className="flex flex-col items-end gap-2 max-w-[75%]">
                        <div className="p-4 pr-6 bg-blue rounded-[12px] w-full">
                          <p className="text-xs sm:text-base text-white leading-[20px] ">
                            we offer professional teeth whitening treatments at
                            our dental practice.{" "}
                          </p>
                        </div>
                        <p className="text-black2 text-[10px] flex items-center">
                          10:40 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <img
                        src={RobotImage}
                        alt="Robot"
                        className="mt-[11px] sm:mt-[8px] w-[30px] sm:w-[38px]"
                      />
                      <div className="flex flex-col gap-2 max-w-[664px]">
                        <div className="p-4 pr-6 bg-gray-500 rounded-[12px] w-full">
                          <p className="text-xs sm:text-base text-black2 leading-[20px] ">
                            Yes, we offer professional teeth whitening
                            treatments at our dental practice. Our experienced
                            dentists can help you achieve a whiter and brighter
                            smile.
                          </p>
                        </div>
                        <p className="text-black2 text-[10px] flex items-center">
                          Bot{" "}
                          <span className="flex w-[2px] sm:w-[1px] mx-1 h-[2px] bg-black rounded-full"></span>{" "}
                          10:40 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start justify-end gap-4 ">
                      <div className="flex flex-col items-end gap-2 max-w-[75%]">
                        <div className="p-4 pr-6 bg-blue rounded-[12px] w-full">
                          <p className="text-xs sm:text-base text-white leading-[20px] ">
                            we offer professional teeth whitening treatments at
                            our dental practice.{" "}
                          </p>
                        </div>
                        <p className="text-black2 text-[10px] flex items-center">
                          10:40 PM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <img
                        src={RobotImage}
                        alt="Robot"
                        className="mt-[11px] sm:mt-[8px] w-[30px] sm:w-[38px]"
                      />
                      <div className="flex flex-col gap-2 max-w-[664px]">
                        <div className="p-4 pr-6 bg-gray-500 rounded-[12px] w-full">
                          <p className="text-xs sm:text-base text-black2 leading-[20px] ">
                            Yes, we offer professional teeth whitening
                            treatments at our dental practice. Our experienced
                            dentists can help you achieve a whiter and brighter
                            smile.
                          </p>
                        </div>
                        <p className="text-black2 text-[10px] flex items-center">
                          Bot{" "}
                          <span className="flex w-[2px] sm:w-[1px] mx-1 h-[2px] bg-black rounded-full"></span>{" "}
                          10:40 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full h-full">
                  <div className="w-full flex flex-col gap-4 sm:gap-[14px]">
                    <div className="relative ">
                      <Input
                        onInput={handleMessageInput}
                        type="text"
                        name="message"
                        value={message}
                        className="!py-5 hidden sm:flex"
                      />
                      <Input
                        onInput={handleMessageInput}
                        type="text"
                        name="message"
                        placeholder="Type your message here"
                        value={message}
                        className="!py-5 sm:hidden flex text-xs"
                      />
                      <div
                        onClick={handleMessageSend}
                        className="absolute top-[50%] translate-y-[-50%] right-5 cursor-pointer"
                      >
                        <Icon
                          icon="send"
                          className="primary-icon"
                          width={18}
                          height={18}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-1 justify-center mt-[13px]">
                      <p className="text-sm font-secondary-regular leading-[20px] text-blackLight">
                        Powered by
                      </p>
                      <svg
                        className="mt-1"
                        width="74"
                        height="16"
                        viewBox="0 0 74 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M9.5298 1.53V12H7.41481V7.515H2.9148V12H0.799805V1.53H2.9148V5.895H7.41481V1.53H9.5298ZM12.8361 3.69L14.9511 9.6L17.1861 3.69H19.3911L14.2011 15.93H11.9961L13.7211 11.85L10.4661 3.69H12.8361ZM25.1118 3.57C25.8218 3.57 26.4718 3.75 27.0618 4.11C27.6518 4.47 28.1168 4.975 28.4568 5.625C28.7968 6.265 28.9668 7 28.9668 7.83C28.9668 8.66 28.7968 9.405 28.4568 10.065C28.1168 10.715 27.6518 11.22 27.0618 11.58C26.4718 11.94 25.8218 12.12 25.1118 12.12C24.5118 12.12 23.9868 11.985 23.5368 11.715C23.0968 11.445 22.7318 11.075 22.4418 10.605V15.96H20.3268V3.69H22.4418V4.98C22.7118 4.54 23.0718 4.195 23.5218 3.945C23.9818 3.695 24.5118 3.57 25.1118 3.57ZM24.6318 5.4C24.2518 5.4 23.8918 5.495 23.5518 5.685C23.2218 5.875 22.9518 6.155 22.7418 6.525C22.5418 6.895 22.4418 7.335 22.4418 7.845C22.4418 8.355 22.5418 8.795 22.7418 9.165C22.9518 9.535 23.2218 9.815 23.5518 10.005C23.8918 10.195 24.2518 10.29 24.6318 10.29C25.0118 10.29 25.3668 10.195 25.6968 10.005C26.0368 9.815 26.3068 9.535 26.5068 9.165C26.7168 8.785 26.8218 8.34 26.8218 7.83C26.8218 7.32 26.7168 6.88 26.5068 6.51C26.3068 6.14 26.0368 5.865 25.6968 5.685C25.3668 5.495 25.0118 5.4 24.6318 5.4ZM38.0196 7.725C38.0196 8.015 37.9996 8.285 37.9596 8.535H31.8996C31.9496 9.075 32.1496 9.51 32.4996 9.84C32.8496 10.17 33.2946 10.335 33.8346 10.335C34.2546 10.335 34.5896 10.255 34.8396 10.095C35.0896 9.935 35.2946 9.715 35.4546 9.435H37.7346C37.4946 10.225 37.0296 10.87 36.3396 11.37C35.6496 11.87 34.8146 12.12 33.8346 12.12C33.0446 12.12 32.3396 11.945 31.7196 11.595C31.0996 11.235 30.6146 10.735 30.2646 10.095C29.9146 9.445 29.7396 8.69 29.7396 7.83C29.7396 6.97 29.9146 6.22 30.2646 5.58C30.6146 4.94 31.0996 4.445 31.7196 4.095C32.3496 3.745 33.0646 3.57 33.8646 3.57C34.6646 3.57 35.3746 3.74 35.9946 4.08C36.6246 4.42 37.1196 4.905 37.4796 5.535C37.8396 6.155 38.0196 6.885 38.0196 7.725ZM35.8296 7.17C35.7996 6.62 35.5946 6.18 35.2146 5.85C34.8446 5.52 34.3846 5.355 33.8346 5.355C33.3246 5.355 32.8896 5.52 32.5296 5.85C32.1796 6.18 31.9696 6.62 31.8996 7.17H35.8296ZM53.365 1.53L50.335 12H47.935L45.91 4.695L43.825 12H41.425L38.455 1.53H40.705L42.715 9.615L44.83 1.53H47.215L49.21 9.54L51.1 1.53H53.365ZM54.1529 1.575C54.1529 1.215 54.2779 0.91 54.5279 0.659999C54.7779 0.41 55.0779 0.285 55.4279 0.285C55.7879 0.285 56.0929 0.41 56.3429 0.659999C56.5929 0.91 56.7179 1.215 56.7179 1.575C56.7179 1.935 56.5929 2.24 56.3429 2.49C56.0929 2.74 55.7879 2.865 55.4279 2.865C55.0779 2.865 54.7779 2.74 54.5279 2.49C54.2779 2.24 54.1529 1.935 54.1529 1.575ZM56.4929 3.69V12H54.3779V3.69H56.4929ZM60.4832 10.26H63.9782V12H58.0232V10.26L61.5332 5.415H58.0232V3.69H63.9782V5.415L60.4832 10.26ZM73.221 7.725C73.221 8.015 73.201 8.285 73.161 8.535H67.101C67.151 9.075 67.351 9.51 67.701 9.84C68.051 10.17 68.496 10.335 69.036 10.335C69.456 10.335 69.791 10.255 70.041 10.095C70.291 9.935 70.496 9.715 70.656 9.435H72.936C72.696 10.225 72.231 10.87 71.541 11.37C70.851 11.87 70.016 12.12 69.036 12.12C68.246 12.12 67.541 11.945 66.921 11.595C66.301 11.235 65.816 10.735 65.466 10.095C65.116 9.445 64.941 8.69 64.941 7.83C64.941 6.97 65.116 6.22 65.466 5.58C65.816 4.94 66.301 4.445 66.921 4.095C67.551 3.745 68.266 3.57 69.066 3.57C69.866 3.57 70.576 3.74 71.196 4.08C71.826 4.42 72.321 4.905 72.681 5.535C73.041 6.155 73.221 6.885 73.221 7.725ZM71.031 7.17C71.001 6.62 70.796 6.18 70.416 5.85C70.046 5.52 69.586 5.355 69.036 5.355C68.526 5.355 68.091 5.52 67.731 5.85C67.381 6.18 67.171 6.62 67.101 7.17H71.031Z"
                          fill="url(#paint0_linear_158_271)"
                        />
                        <defs>
                          <linearGradient
                            id="paint0_linear_158_271"
                            x1="0.592637"
                            y1="6.34667"
                            x2="75.6032"
                            y2="6.76719"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop stopColor="#4666FF" />
                            <stop offset="1" stopColor="#7433CC" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </>
      )}
    </div>
  );
}
export default Chatbot;
