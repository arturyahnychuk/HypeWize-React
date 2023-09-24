import { ChangeEvent, useState } from "react";
import { Btn, Icon, Input, PageLayout, Tooltip } from "@/components/imports";
import { RoutesPath } from "@/types/router";
import { Link } from "react-router-dom";
import { RobotImage } from "@/assets/imports";
function ProjectInfo() {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [agentName, setAgentName] = useState("");
  const [themeColor, setThemeColor] = useState("#000000");
  const [message, setMessage] = useState("");
  const [emailAdded, setEmailAdded] = useState(false);
  const [chatActive, setChatActive] = useState(false);
  const [embedActive, setEmbedActive] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [formsData, setFormsData] = useState({
    name: "",
    email: "",
  });
  const handleMessageInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleMessageSend = () => {
    alert("send message");
  };
  const openChat = () => {
    setChatActive(true);
    setEmbedActive(false);
  };
  const openEmbed = () => {
    setChatActive(false);
    setEmbedActive(true);
  };
  const handleAddField = () => {
    setEmailAdded(true);
  };
  const handleEmailDelete = () => {
    setEmailAdded(false);
  };
  const handleFormsDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormsData({
      ...formsData,
      [name]: value,
    });
  };
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleWelcomeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setWelcomeMessage(e.target.value);
  };
  const handleAgentNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setAgentName(e.target.value);
  };
  const handleThemeColor = (e: ChangeEvent<HTMLInputElement>) => {
    setThemeColor(e.target.value);
  };
  return (
    <PageLayout>
      <div className="flex items-center gap-4 mb-7">
        <h2 className="font-secondary-medium text-2xl text-black tracking-[-2%]">
          Project Name
        </h2>
        <Link to={RoutesPath.PROJECTS}>
          <Btn
            text="switch"
            className="switch-btn"
            icon={true}
            iconNext={true}
            name="switch"
            width={14}
            height={14}
          />
        </Link>
      </div>

      <div className="w-full grid md:grid-cols-2 gap-5">
        <div className="w-full flex flex-col gap-5">
          <div
            onClick={openChat}
            className="w-full flex flex-col gap-5 bg-white px-5 py-4 rounded-[10px]"
          >
            <div className="flex items-center gap-4">
              <label htmlFor="welcome_message">Welcome Message</label>
              <Tooltip
                type="info"
                text="This is info section to elcome message, here! Detail goes here. This is info section to welcome message, here! Detail goes here. "
              />
            </div>
            <Input
              onInput={handleWelcomeInput}
              type="text"
              value={welcomeMessage}
              placeholder=""
            />
          </div>
          <div
            onClick={openChat}
            className="w-full flex flex-col gap-5 bg-white px-5 py-4 rounded-[10px]"
          >
            <div className="flex items-center gap-4">
              <label htmlFor="welcome_message">Agent Name</label>
              <Tooltip
                type="info"
                text="This is info section to Agent Name, here! Detail goes here. This is info section to welcome message, here! Detail goes here. "
              />
            </div>
            <Input
              onInput={handleAgentNameInput}
              type="text"
              value={agentName}
              placeholder=""
            />
          </div>
          <div className="w-full flex flex-col gap-5 bg-white px-5 py-4 rounded-[10px]">
            <div className="flex items-center gap-4">
              <label htmlFor="welcome_message">Forms</label>
              <Tooltip
                type="info"
                text="This is info section to Agent Name, here! Detail goes here. This is info section to welcome message, here! Detail goes here. "
              />
              <Btn
                text="Watch Tutorial"
                className="bg-blue !px-[10px] !py-2 !gap-2 primary-btn fill"
                icon={true}
                name="play"
                width={14}
                height={14}
              />
              <Btn
                onClick={handleAddField}
                className="ml-auto action-btn success stroke hover-green"
                text="Add Field"
                icon={true}
                name="add"
                width={16}
                height={16}
              />
            </div>
            <div className="relative">
              <Input
                onInput={handleFormsDataChange}
                type="text"
                name="name"
                value={formsData.name}
                placeholder="Name"
              />
            </div>
            {emailAdded && (
              <div className="relative ">
                <Input
                  onInput={handleFormsDataChange}
                  type="text"
                  name="email"
                  value={formsData.email}
                  placeholder="Email"
                />
                <div
                  onClick={handleEmailDelete}
                  className="absolute top-[50%] translate-y-[-50%] right-5 cursor-pointer"
                >
                  <Icon
                    icon="delete"
                    className="danger-icon"
                    width={18}
                    height={18}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="w-full flex flex-col gap-5 bg-white px-5 py-4 rounded-[10px]">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <label htmlFor="welcome_message">Theme Color</label>
                <Tooltip
                  type="info"
                  text="This is info section to Agent Name, here! Detail goes here. This is info section to welcome message, here! Detail goes here. "
                />
              </div>
              <div className="relative flex items-center gap-2 group">
                <p className="font-secondary-regular text-base text-gray-300 group-hover:text-black transition-all">
                  {" "}
                  select
                </p>
                <div
                  className="cursor-pointer w-[24px] h-[24px] shadow-sm rounded-[5px] border overflow-hidden"
                  style={{ background: themeColor }}
                ></div>
                <input
                  type="color"
                  onChange={handleThemeColor}
                  value={themeColor}
                  placeholder=""
                  className="absolute left-0 w-full h-full top-0 opacity-0 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col gap-5 bg-white px-5 py-4 rounded-[10px]">
            <div className="flex items-center gap-4">
              <label htmlFor="welcome_message">Embed Code</label>
              <Tooltip
                type="info"
                text="This is info section to Agent Name, here! Detail goes here. This is info section to welcome message, here! Detail goes here. "
              />
            </div>
            <Btn
              onClick={openEmbed}
              text="Copy Code"
              icon={true}
              name="code"
              width={20}
              height={20}
              className="primary-btn bg-blue fill justify-center !py-3"
            />
          </div>
        </div>
        <div className="w-full flex h-[81vh] pb-10 md:pb-0 bg-white rounded-[10px]">
          {chatActive ? (
            <div className="w-full h-full rounded-[10px]">
              <div className="grid grid-rows-[1fr,auto] h-full flex flex-col mt-4">
                <div className="flex flex-col gap-4 px-6 w-full pt-6">
                  <div className="flex items-start gap-4">
                    <img src={RobotImage} alt="Robot" width={46} />
                    <div className="flex flex-col gap-2 max-w-[75%]">
                      <div className="p-4 pr-6 bg-gray-500 rounded-[12px] w-full">
                        <p className="text-black2 leading-[20px]">
                          Hello, This is welcome message!
                        </p>
                      </div>
                      <p className="text-black2 text-[10px]">Bot 10:40PM</p>
                    </div>
                  </div>
                  <div className="w-full mt-auto px-4 mb-4">
                    <div className="relative ">
                      <Input
                        onInput={handleMessageInput}
                        type="text"
                        name="message"
                        value={message}
                        placeholder="Type your message here"
                        className="!py-5"
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
                  </div>
                </div>
                <div className="w-full bg-white rounded-b-[10px] px-10">
                  <div className=" border-t border-gray-100 py-4">
                    <div className="w-full flex items-center justify-center">
                      <Btn
                        text="Live Preview"
                        icon={true}
                        name="eye"
                        width={20}
                        height={20}
                        className="btn-main-text fill justify-center !py-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : embedActive ? (
            <div className="w-full h-full rounded-[10px]">
              <div className="w-full flex justify-end pt-6 pr-6">
                <div className="cursor-pointer">
                  <Icon icon="folders" width={16} height={16} />
                </div>
              </div>
              <div className="grid grid-rows-[1fr,auto] h-full flex flex-col mt-4">
                <div className="flex flex-col items-center justify-center gap-4 px-6 w-full pt-6">
                  <div className="w-full px-4 mb-4">
                    <div className="w-full h-full bg-white rounded-[10px]">
                      <div className="w-full break-all">
                        <span className="text-blue">&lt;script </span>
                        src="https://cdn.jsdelivr.net/gh/wisdomcsharp/hypewize-chatbot/chat.js"
                        id="64f32b78bbb9c780db148a1f"{" "}
                        <span className="text-blue">&gt;&lt;/script&gt;</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full bg-white rounded-b-[10px] px-10">
                  <div className=" border-t border-gray-100 py-4">
                    <div className="w-full flex items-center justify-center">
                      <Btn
                        text="Live Preview"
                        icon={true}
                        name="eye"
                        width={20}
                        height={20}
                        className="btn-main-text fill justify-center !py-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full bg-blue rounded-[10px]">
              <div className="w-full flex justify-end pt-6 pr-6">
                <div className="cursor-pointer">
                  <Icon icon="close" width={16} height={16} />
                </div>
              </div>
              <div className="grid grid-rows-[1fr,auto] h-full flex flex-col mt-4">
                <div className="flex flex-col gap-4 px-6 w-full items-center">
                  <p className="text-md font-secondaty-medium text-white tracking-[-2%] w-full  max-w-[356px]">
                    Please fill out the form below to start chatting with the
                    next agent available.
                  </p>
                  <div className="w-full flex flex-col gap-5 bg-white h-full px-5 py-4 rounded-t-[10px]">
                    <Input
                      onInput={handleFormChange}
                      type="text"
                      name="name"
                      value={formData.name}
                      placeholder="Name *"
                    />
                    <Input
                      onInput={handleFormChange}
                      type="text"
                      name="email"
                      value={formData.email}
                      placeholder="Email *"
                    />
                    <Input
                      onInput={handleFormChange}
                      type="number"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      placeholder="Phone Number *"
                    />
                  </div>
                </div>
                <div className="w-full bg-white rounded-b-[10px] px-10">
                  <div className=" border-t border-gray-100 py-4">
                    <div className="w-full flex items-center justify-center">
                      <Btn
                        text="Live Preview"
                        icon={true}
                        name="eye"
                        width={20}
                        height={20}
                        className="btn-main-text fill justify-center !py-3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
export default ProjectInfo;
