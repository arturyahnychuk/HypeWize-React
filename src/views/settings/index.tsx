import { ChangeEvent, useCallback, useEffect, useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from "axios";

import { GoogleImage, HubspotImage } from "@/assets/imports";
import { Btn, Icon, Input, PageLayout, Tooltip } from "@/components/imports";
import useAuthStore from "@/store/auth";
import { APIType } from "@/store/types";

import { APIS_URL, GOOGLE_AUTH_URL, HUBSPOT_AUTH_URL, SEND_VERIFICATION_EMAIL_URL, USERS_URL } from "@/apis/endpoint";

const SettingsPage = () => {
  const [settingsData, setSettingsData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isVerified, setIsVerified] = useState(false);

  const { profileInfo } = useAuthStore();
  const [googleConntected, setGoogleConntected] = useState(false);
  const [hubspotConntected, setHubspotConntected] = useState(false);
  const [apis, setApis] = useState<APIType[]>([]);
  const [isCopied, setIsCopied] = useState<string>("");
  const [selectedApi, setSelectedApi] = useState<APIType | null>(null);

  const accessToken = localStorage.getItem("access_token");

  const handleHubspotConnect = () => {
    // setHubspotConntected(true);
    location.replace(`${ HUBSPOT_AUTH_URL }`);
  };

  const handleGoogleConnect = () => {
    // setGoogleConntected(true);
    location.replace(`${ GOOGLE_AUTH_URL }`);
  };

  const handleKeyDown = async (keyBoard: any, fieldType: string) => {

    if (keyBoard.code == "Enter" || keyBoard.code == "NumpadEnter") handleUpdateUserName(fieldType);

  };

  const handleUpdateUserName = useCallback(async (fieldType: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    const data = fieldType == "firstname" ? {
      firstname: settingsData.first_name
    } : {
      lastname: settingsData.last_name
    }

    await axios.patch(
      `${ USERS_URL }/${profileInfo?.id}` || "",
      data,
      config
    ).then(() => {
      console.log("Verification Email Sent!");
    }).catch((err) => {
      console.log(err);
    });
  }, [settingsData])

  const handleSentVerify = useCallback(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };

    await axios.post(
      `${ SEND_VERIFICATION_EMAIL_URL }` || "",
      { email: settingsData.email },
      config
    ).then(() => {
      console.log("Verification Email Sent!");
    }).catch((err) => {
      console.log(err);
    });

  }, [settingsData]);

  const handleFormsDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettingsData({
      ...settingsData,
      [name]: value,
    });
  };

  const handleDelete = async (api: APIType) => {
    try {

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const res = await axios.delete(
        `${ APIS_URL }/${api.id}`, config
      );

      console.log("res:", res);
      getApis();
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = (api: APIType) => {
    setSelectedApi(api);
  };

  const handleCancel = () => {
    setSelectedApi(null);
  };

  const handleUpdateAPI = async (api: APIType) => {
    try {

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const res = await axios.patch(
        `${ APIS_URL }/${api.id}`,
        {
          name: api.name
        },
        config
      );

      console.log("res:", res);
      getApis();
      setSelectedApi(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateNewAPI = async () => {
    try {

      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };

      const res = await axios.post(
        `${ APIS_URL }`, {}, config
      );

      console.log("res:", res);
      getApis();
    } catch (error) {
      console.log(error);
    }
  }

  const getApis = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      };
      const response = await axios.get(
        `${ APIS_URL }`,
        config
      );

      setApis(response.data.results);
    } catch (error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!profileInfo) return;
    getApis();
    setSettingsData({
      email: profileInfo.email,
      first_name: profileInfo.firstname || "",
      last_name: profileInfo.lastname || "",
    });
    setGoogleConntected(profileInfo.google.activated);
    setHubspotConntected(profileInfo.hubspot.activated);
    setIsVerified(profileInfo.isEmailVerified);
  }, [profileInfo]);

  return (
    <PageLayout>
      <div className="flex items-center gap-4 pt-7 pb-7 sticky top-0 bg-milk z-[9999]">
        <h2 className="font-secondary-medium text-2xl text-black tracking-[-2%]">
          Settings
        </h2>
      </div>

      <div className="w-full grid lg:grid-cols-2 gap-[10px] mb-6">
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex gap-5 bg-white px-5 py-4 rounded-[10px]">
            <div className="w-full flex flex-col gap-4 items-start">
              <label htmlFor="first_name">First Name</label>
              <Input
                type="text"
                name="first_name"
                id="first_name"
                className="w-full"
                placeholder=""
                value={settingsData.first_name}
                onChange={handleFormsDataChange}
                onKeyDown={(e) => handleKeyDown(e, "firstname")}
              />
            </div>
            <div className="w-full flex flex-col gap-4 items-start">
              <label htmlFor="last_name">Last Name</label>
              <Input
                type="text"
                name="last_name"
                id="last_name"
                className="w-full"
                placeholder=""
                value={settingsData.last_name}
                onChange={handleFormsDataChange}
                onKeyDown={(e) => handleKeyDown(e, "lastname")}
              />
            </div>
          </div>

          <div className="w-full flex gap-5 bg-white px-5 py-4 rounded-[10px]">
            <div className="w-full flex flex-col gap-4 items-start">
              <div className="w-full flex items-center justify-between">
                <label htmlFor="email">Email</label>
                {isVerified ? (
                  <p className="text-sm text-green font-secondary-regular tracking-[-2%]">
                    verified
                  </p>
                ) : (
                  <p
                    onClick={handleSentVerify}
                    className="text-sm text-orange font-secondary-regular tracking-[-2%] cursor-pointer"
                  >
                    Send Verification Link
                  </p>
                )}
              </div>
              <Input
                type="text"
                name="email"
                id="email"
                className="w-full"
                placeholder=""
                disabled
                value={settingsData.email}
              />
            </div>
          </div>

          <div className="w-full flex flex-col gap-5 bg-white px-5 py-4 rounded-[10px]">
            <div className="flex items-center gap-4">
              <label htmlFor="welcome_message">Apps</label>
              <Tooltip
                type="info"
                text="This is info section to elcome message, here! Detail goes here. This is info section to welcome message, here! Detail goes here. "
              />
            </div>
            <div className="w-full flex items-center justify-between px-6 py-2 border border-gray-100 rounded-[10px]">
              <img
                src={GoogleImage}
                width={61}
                className="w-full max-w-[70px]"
              />
              {googleConntected ? (
                <p className="text-sm text-green font-secondary-regular tracking-[-2%]">
                  Conntected
                </p>
              ) : (
                <p
                  onClick={handleGoogleConnect}
                  className="text-sm text-gray-600 hover:text-black2 transition-all font-secondary-regular tracking-[-2%] cursor-pointer">
                  Conntect
                </p>
              )}
            </div>
            <div className="w-full flex items-center justify-between px-6 py-2 border border-gray-100 rounded-[10px]">
              <img
                src={HubspotImage}
                width={71}
                className="w-full max-w-[70px]"
              />
              {hubspotConntected ? (
                <p className="text-sm text-green font-secondary-regular tracking-[-2%]">
                  Conntected
                </p>
              ) : (
                <p
                  onClick={handleHubspotConnect}
                  className="text-sm text-gray-600 hover:text-black2 transition-all font-secondary-regular tracking-[-2%] cursor-pointer"
                >
                  Conntect
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full flex flex-col gap-5 bg-white px-5 py-4 rounded-[10px]">
            <div className="w-full justify-between flex items-center">
              <div className="flex items-center gap-4">
                <label htmlFor="welcome_message">Api</label>
                <Tooltip
                  type="info"
                  text="This is info section to elcome message, here! Detail goes here. This is info section to welcome message, here! Detail goes here. "
                />
              </div>
              <Btn
                className="ml-auto action-btn success stroke hover-green"
                onClick={handleCreateNewAPI}
                text="Create API"
                icon={true}
                name="add"
                width={16}
                height={16}
              />{" "}
            </div>
            <div className="w-full">
              <div className="flex flex-col gap-4 max-h-[calc(100vh-220px)] pr-3 overflow-auto custom-scrollbar">
                {apis.map((api: APIType, index) => (
                  <div className="w-full flex border-2 border-dashed border-gray-100 p-5 rounded-[10px]" key={index}>
                    <div className="w-full flex flex-col items-start">
                      <div
                        className={`${selectedApi?.id == api.id ? "flex-col-reverse" : "flex-row"
                          } md:flex-row w-full flex gap-4 items-center justify-between`}
                      >
                        <div className="flex w-full items-center gap-3">
                          {selectedApi?.id != api.id ? (
                            <p className="text-sm text-black font-secondary-medium tracking-[-2%]">
                              {api.name}
                            </p>
                          ) : (
                            <Input
                              type="text"
                              className="w-full"
                              placeholder=""
                              value={selectedApi.name}
                              onChange={(e) => setSelectedApi({ ...selectedApi, name: e.target.value })}
                            />
                          )}
                          {selectedApi?.id != api.id && (
                            <Btn
                              onClick={() => handleEditClick(api)}
                              className="border border-gray-100 !px-3 !py-1"
                              text="Edit"
                            />
                          )}
                        </div>
                        {selectedApi?.id != api.id ? (
                          <div className="flex items-center">
                            <div
                              onClick={() => handleDelete(api)}
                              className="cursor-pointer"
                            >
                              <Icon
                                icon="delete"
                                width={18}
                                height={18}
                                className="danger-icon"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex gap-4 pl-4 py-2 items-center ml-auto">
                            <Btn
                              onClick={handleCancel}
                              text="Cancel"
                              className="action-btn danger !p-0"
                            />
                            <Btn
                              onClick={() => handleUpdateAPI(selectedApi)}
                              text="Save"
                              className="action-btn border border-green px-3 !py-1 hover:bg-green success transition-all"
                            />
                          </div>
                        )}
                      </div>
                      <p className="text-black font-secondary-regular text-xs tracking-[-2%] my-5">
                        Created at {api.createdAt}
                      </p>
                      {isCopied == api.key ? (
                        <Btn
                          text="Copied"
                          className="primary-btn fill w-full text-center !py-4 justify-center"
                        />
                      ) : (
                        <CopyToClipboard text={api.key}>
                          <Btn
                            onClick={() => setIsCopied(api.key)}
                            text="Copy Key"
                            className="primary-btn fill w-full text-center !py-4 justify-center"
                          />
                        </CopyToClipboard>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default SettingsPage;
