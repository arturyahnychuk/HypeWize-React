import { GoogleImage, HubspotImage } from "@/assets/imports";
import { Btn, Icon, Input, PageLayout, Tooltip } from "@/components/imports";
import { ChangeEvent, useState } from "react";

function SettingsPage() {
  const [settingsData, setSettingsData] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });
  const [isVerified, setIsVerified] = useState(false);
  const apisArr = [
    {
      val: "Sample API",
      created_at: "2023-07-21 3:00pm",
    },
    {
      val: "Sample API2",
      created_at: "2023-07-21 3:00pm",
    },
    {
      val: "Sample API3",
      created_at: "2023-07-21 3:00pm",
    },
  ];
  const [editModes, setEditModes] = useState(Array(apisArr.length).fill(false));
  const [googleConntected, setGoogleConntected] = useState(true);
  const [hubspotConntected, setHubspotConntected] = useState(false);
  const [isCopied, setIsCopied] = useState(Array(apisArr.length).fill(false));
  const [apiValues, setApiValues] = useState(apisArr.map(api => api.val));

  const handleApiInputValues = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const { value } = e.target;
  
    // Create a copy of the current API values array
    const updatedApiValues = [...apiValues];
  
    // Update the value at the specified index
    updatedApiValues[index] = value;
  
    // Set the updated API values array in the state
    setApiValues(updatedApiValues);
  };

  const handleCopy = (index: number) => {
    // Create a new array with the updated value at the specified index
    const newIsCopied = [...isCopied];
    newIsCopied[index] = true; // Set it to true when copying

    setIsCopied(newIsCopied);

    setTimeout(() => {
      // Reset the value to false after 1000 milliseconds
      setIsCopied((prevState) => {
        const updatedIsCopied = [...prevState];
        updatedIsCopied[index] = false;
        return updatedIsCopied;
      });
    }, 1000);
  };

  const handleHubspotConntect = () => {
    setHubspotConntected(true);
  };
  const handleSentVerify = () => {
    setIsVerified(true);
  };
  const handleFormsDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettingsData({
      ...settingsData,
      [name]: value,
    });
  };
  const handleDelete = (index: number) => {
    alert(`Delete ${index}`);
  };
  const handleEditClick = (index: number) => {
    const newEditModes = [...editModes];
    newEditModes[index] = !newEditModes[index];
    setEditModes(newEditModes);
  };
  const handleCancel = (index: number) => {
    const newEditModes = [...editModes];
    newEditModes[index] = false;
    setEditModes(newEditModes);

    const updatedApiValues = [...apiValues];
    updatedApiValues[index] = apisArr[index].val;
    setApiValues(updatedApiValues);
  };
  const handleAdd = (index: number) => {
    const newEditModes = [...editModes];
    newEditModes[index] = false;
    setEditModes(newEditModes);
  };

  return (
    <PageLayout>
      <div className="flex items-center gap-4 pt-7 pb-7 sticky top-0 bg-milk z-[9999]">
        <h2 className="font-secondary-medium text-2xl text-black tracking-[-2%]">
          Settings
        </h2>
      </div>

      <div className="w-full grid md:grid-cols-2 gap-[10px] mb-6">
        <div className="w-full flex flex-col gap-5">
          <div className="w-full flex gap-5 bg-white px-5 py-4 rounded-[10px]">
            <div className="w-full flex flex-col gap-4 items-start gap-4">
              <label htmlFor="first_name">First Name</label>
              <Input
                type="text"
                name="first_name"
                id="first_name"
                className="w-full"
                placeholder=""
                value={settingsData.first_name}
                onChange={handleFormsDataChange}
              />
            </div>
            <div className="w-full flex flex-col gap-4 items-start gap-4">
              <label htmlFor="last_name">Last Name</label>
              <Input
                type="text"
                name="last_name"
                id="last_name"
                className="w-full"
                placeholder=""
                value={settingsData.last_name}
                onChange={handleFormsDataChange}
              />
            </div>
          </div>

          <div className="w-full flex gap-5 bg-white px-5 py-4 rounded-[10px]">
            <div className="w-full flex flex-col gap-4 items-start gap-4">
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
                value={settingsData.email}
                onChange={handleFormsDataChange}
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
                <p className="text-sm text-gray-600 hover:text-black2 transition-all font-secondary-regular tracking-[-2%] cursor-pointer">
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
                  onClick={handleHubspotConntect}
                  className="text-sm text-gray-600 hover:text-black2 transition-all font-secondary-regular tracking-[-2%] cursor-pointer"
                >
                  Conntect
                </p>
              )}
            </div>
          </div>
        </div>
        <div className="w-full w-full">
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
                text="Add Field"
                icon={true}
                name="add"
                width={16}
                height={16}
              />{" "}
            </div>
            {apisArr.map((api, index) => (
              <div className="w-full flex border-2 border-dashed border-gray-100 p-5 rounded-[10px]">
                <div className="w-full flex flex-col items-start">
                  <div className={`${editModes[index] ? 'flex-col-reverse' : 'flex-row'} md:flex-row w-full flex gap-4 items-center justify-between`}>
                    <div className="flex w-full items-center gap-3">
                      {!editModes[index] ? (
                        <p className="text-sm text-black font-secondary-medium tracking-[-2%]">
                          {api.val}
                        </p>
                      ) : (
                        <Input
                          type="text"
                          className="w-full"
                          placeholder=""
                          value={apiValues[index]}
                          onChange={(e)=> handleApiInputValues(e, index)}
                        />
                      )}
                      {!editModes[index] && (
                        <Btn
                          onClick={() => handleEditClick(index)}
                          className="border border-gray-100 !px-3 !py-1"
                          text="Edit"
                        />
                      )}
                    </div>
                    {!editModes[index] ? (
                      <div className="flex items-center">
                        <div
                          onClick={() => handleDelete(index)}
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
                      <div className="flex gap-4 px-4 py-2 items-center ml-auto">
                        <Btn
                          onClick={() => handleCancel(index)}
                          text="Cancel"
                          className="action-btn danger !p-0"
                        />
                        <Btn
                          onClick={() => handleAdd(index)}
                          text="Add"
                          className="action-btn border border-green px-3 !py-1 hover:bg-green success transition-all"
                        />
                      </div>
                    )}
                  </div>
                  <p className="text-black font-secondary-regular text-xs tracking-[-2%] my-5">
                    Created at {api.created_at}
                  </p>
                  {isCopied[index] ? (
                    <Btn
                      text="Copied"
                      className="primary-btn fill w-full text-center !py-4 justify-center"
                    />
                  ) : (
                    <Btn
                      onClick={() => handleCopy(index)}
                      text="Copy Key"
                      className="primary-btn fill w-full text-center !py-4 justify-center"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default SettingsPage;