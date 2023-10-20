import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import { Btn, Icon, Input, PageLayout, Textarea, Tooltip } from "@/components/imports";
import { RoutesPath } from "@/types/router";
import { RobotImage } from "@/assets/imports";
import { ProjectType } from "@/store/types";

import { PROJECTS_ROOT_URL } from "@/apis/endpoint";

const ProjectInfo = () => {
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [agentName, setAgentName] = useState("");
  const [themeColor, setThemeColor] = useState("transparent");
  const [message, setMessage] = useState("");
  const [inputFields, setInputFields] = useState([""]);
  const [chatActive, setChatActive] = useState("");
  const [embedActive, setEmbedActive] = useState(false);
  const [projectInfo, setProjectInfo] = useState<ProjectType | null>(null);
  const [updateStatus, setUpdateStatus] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [formsData, setFormsData] = useState({
    name: "",
    email: "",
  });
  
  const { id } = useParams();

  const handleMessageInput = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };
  const handleMessageSend = () => {
    alert("send message");
  };
  const openChat = (type: string) => {
    setChatActive(type);
    setEmbedActive(false);
  };
  const openEmbed = () => {
    setChatActive("");
    setEmbedActive(true);
  };
  const handleAddField = () => {
    setInputFields([...inputFields, ""]);
  };
  const handleRemoveField = useCallback(async (index: number) => {

    const newInputFields = [...inputFields];
    newInputFields.splice(index, 1);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.patch(
        `${ PROJECTS_ROOT_URL }/${projectInfo?.id}`,
        {
          formFields: newInputFields
        },
        config
      );
      if (response.data) console.log("Sucessfully deleted!");
      setInputFields(newInputFields);
    } catch (error: any) {
      console.log(error);
    }

  }, [projectInfo, inputFields]);

  const handleDynamicFormsDataChange = (index: number, value: string) => {
    const newInputFields = [...inputFields];
    newInputFields[index] = value;
    setInputFields(newInputFields);
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

  const updateProjectInfo = async (data: ProjectType) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const response = await axios.patch(
        `${ PROJECTS_ROOT_URL }/${id}`,
        {
          agentName: data.agentName,
          description: data.description,
          domain: data.domain,
          name: data.name,
          welcomeMessage: data.welcomeMessage,
          formFields: data.formFields,
          themeColor: data.themeColor
        },
        config
      );

      if (response.data) {
        console.log("Updated Successfully!");
        setUpdateStatus(fieldType);

        //Reset the status after 2s
        setTimeout(() => {
            setUpdateStatus(null);
        }, 1000);
      }

    } catch (error: any) {
      console.log(error);
    }
  }

  const handleKeyDown = useCallback((keyBoard: any, fieldType: string) => {
    const _projectInfo = projectInfo;
    if (!_projectInfo) return;
    switch (fieldType) {
      case "welcomeMessage":
        _projectInfo.welcomeMessage = welcomeMessage
        break;
      case "agentName":
        _projectInfo.agentName = agentName
        break;
      case "formFields":
        _projectInfo.formFields = inputFields
        break;
      default:
        break;
    }
    if (keyBoard.code == "Enter" || keyBoard.code == "NumpadEnter") {
      updateProjectInfo(_projectInfo, fieldType);
    }
  }, [projectInfo, welcomeMessage, agentName, inputFields]);

  const handleWelcomeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setWelcomeMessage(e.target.value);
  };
  const handleAgentNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setAgentName(e.target.value);
  };
  const handleThemeColor = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setThemeColor(e.target.value);
    const _projectInfo = projectInfo;
    if (!_projectInfo) return;
    _projectInfo.themeColor = e.target.value
    updateProjectInfo(_projectInfo);
  }, [projectInfo]);

  const accessToken = localStorage.getItem('access_token');

  const getProjectInfo = async (projectId: string) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${ PROJECTS_ROOT_URL }/${projectId}`,
        config
      );

      setProjectInfo(response.data);

      setWelcomeMessage(response.data.welcomeMessage);
      if (response.data.agentName) setAgentName(response.data.agentName);
      setInputFields(response.data.formFields);
      setThemeColor(response.data.themeColor);


    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (id) getProjectInfo(id);
  }, [id]);

  return (
    <PageLayout>
      <div className="flex items-center gap-4 pt-7 pb-7 sticky top-0 bg-milk z-[9999]">
        <h2 className="font-secondary-medium text-2xl text-black tracking-[-2%]">
          {projectInfo?.name}
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

      <div className="w-full grid lg:grid-cols-2 gap-5">
        <div className="w-full flex flex-col gap-5">
          <div
            onClick={() => openChat("welcomeMessage")}
            className="w-full flex flex-col gap-5 bg-white px-5 py-4 rounded-[10px]"
          >
            <div className="flex items-center gap-4">
              <label htmlFor="welcome_message">Welcome Message</label>
              <Tooltip
                type="info"
                text="A greeting message when a user first opens the chatbot"
              />
            </div>
            <Input
              onInput={handleWelcomeInput}
              type="text"
              value={welcomeMessage}
              onKeyDown={(e) => handleKeyDown(e, "welcomeMessage")}
              updateStatus={ updateStatus }
              inputName="welcomeMessage"
              placeholder=""
            />
          </div>
          <div
            onClick={() => openChat("agentName")}
            className="w-full flex flex-col gap-5 bg-white px-5 py-4 rounded-[10px]"
          >
            <div className="flex items-center gap-4">
              <label htmlFor="welcome_message">Agent Name</label>
              <Tooltip
                type="info"
                text="This will be displayed to users if they ask for the name of the chatbot."
              />
            </div>
            <Input
              onInput={handleAgentNameInput}
              type="text"
              value={agentName}
              onKeyDown={(e) => handleKeyDown(e, "agentName")}
              updateStatus={ updateStatus }
              inputName="agentName"
              placeholder=""
            />
          </div>
          <div className="w-full flex flex-col gap-5 bg-white pr-2 py-4 rounded-[10px]" onClick={() => openChat("formFields")}>
            <div className="flex items-center gap-4 px-5">
              <label htmlFor="welcome_message">Forms</label>
              <Tooltip
                type="info"
                text="For lead generation, you can add forms to collect user information"
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
                className="ml-auto action-btn success stroke hover-green !pr-0"
                text="Add Field"
                icon={true}
                name="add"
                width={16}
                height={16}
              />
            </div>
            <div className="h-[50px] overflow-auto custom-scrollbar pl-5 pr-2 ">
              {inputFields.map((value, index) => (
                <div
                  key={index}
                  className="relative"
                  style={{ marginBottom: "10px" }}
                >
                  <Input
                    type="text"
                    value={value}
                    onKeyDown={(e) => handleKeyDown(e, "formFields")}
                    onChange={(e) =>
                      handleDynamicFormsDataChange(index, e.target.value)
                    }
                    updateStatus={ updateStatus }
                    inputName="formField"
                  />
                  <div
                    onClick={() => handleRemoveField(index)}
                    className="absolute top-[50%] translate-y-[-50%] right-5 cursor-pointer delete"
                  >
                    <Icon
                      icon="delete"
                      className="danger-icon"
                      width={18}
                      height={18}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="w-full flex flex-col gap-5 bg-white px-5 py-4 rounded-[10px]"
          >
            <div className="flex items-center gap-4">
              <label htmlFor="welcome_message">Form Guidline</label>
              <Tooltip
                type="info"
                text="This will be displayed to users if they ask for how to use this."
              />
            </div>
            <Textarea
              // onInput={handleAgentNameInput}
              defaultValue="Please fill out the form below to start chatting with the
              next agent available."
              onKeyDown={(e) => handleKeyDown(e, "guidLine")}
              placeholder=""
            />
          </div>
          <div className="w-full flex flex-col gap-5 bg-white px-5 py-4 rounded-[10px]" onClick={() => openChat("formFields")}>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-4">
                <label htmlFor="welcome_message">Theme Color</label>
                <Tooltip
                  type="info"
                  text="Perhaps a colour that compliments your brands colour scheme?"
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
          <div className="w-full flex flex-row items-center justify-between gap-5 bg-white px-5 py-4 rounded-[10px]">
          <div className="flex flex-row items-center gap-4">
              <label htmlFor="welcome_message">Embed Code</label>
              <Tooltip
                type="info"
                text="Copy and paste this code into your website to embed the chatbot"
              />
            </div>
            <Btn
              onClick={openEmbed}
              text="Copy Code"
              icon={true}
              name="code"
              width={20}
              height={20}
              className="primary-btn bg-blue fill items-center w-3/5 justify-center !py-3"
            />
          </div>
        </div>
        <div
          className={`${chatActive ? "h-[calc(100vh-131px)]" : "h-[calc(100vh-171px)]"
            } sticky top-[95px] w-full hidden lg:flex pb-10 md:pb-0 bg-white rounded-[10px]`}
        >
          {chatActive && chatActive != "formFields" ? (
            <div className="w-full h-full rounded-[10px]">
              <div className="grid grid-rows-[1fr,auto] h-full flex flex-col mt-4">
                <div className="flex flex-col gap-4 px-6 w-full pt-6">
                  <div className="flex items-start gap-4">
                    <img src={RobotImage} alt="Robot" width={46} />
                    <div className="flex flex-col gap-2 max-w-[75%]">
                      <div className="p-4 pr-6 bg-gray-500 rounded-[12px] break-word w-full">
                        <p className="text-black2 leading-[20px]">
                          {chatActive == "agentName"
                            ? "Hi, my name is " + agentName + "!"
                            : welcomeMessage
                              ? welcomeMessage
                              : ""}
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
                        updateStatus={ updateStatus }
                        inputName="formField"
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
                        id="{id}"{" "}
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
            <div className="w-full h-full rounded-[10px]" style={{ backgroundColor: themeColor }}>
              <div className="w-full flex justify-end pt-6 pr-6">
                <div className="cursor-pointer">
                  <Icon icon="close" width={16} height={16} />
                </div>
              </div>
              <div className="grid grid-rows-[1fr,auto] h-full flex flex-col mt-4">
                <div className="flex flex-col gap-4 px-6 w-full items-center">
                  <p className="text-md font-secondaty-medium text-white text-center tracking-[-2%] w-full  max-w-[356px]">
                    Please fill out the form below to start chatting with the
                    next agent available.
                  </p>
                  <div className="w-full flex flex-col gap-5 bg-white h-full px-5 py-4 rounded-t-[10px]">
                    {inputFields.map((fieldTitle: string, index: number) => <div key={index}>
                      {fieldTitle ? 
                      <Input
                        onInput={handleFormChange}
                        type="text"
                        name={fieldTitle}
                        placeholder={fieldTitle + " *"}
                        updateStatus={ updateStatus }
                        inputName="formField"
                      /> : <></>}
                    </div>)}
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