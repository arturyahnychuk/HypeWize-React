import { Input, CheckBox } from "@/components/imports";

const SearchBox = (
        dropDownActive: boolean,
        handleDropDown,
        handleContentSearchValue,
        contentSearchValue: string,
        handleKeyDown,
        handleCheckboxes,
        startRemovingDuplicates,
        handleDuplicateResult,
        totalResults: number
    ) => {
    return (
        <>
            <div
                className={`${
                    dropDownActive ?
                        "active rounded-t-[10px] pb-[0px]" :
                        " rounded-t-[10px] rounded-b-[10px]"
                } w-full flex p-[1px] overflow-hidden border-gradient items-center gap-0 justify-between bg-white rounded-t-[10px]`}>
                    <div className={`${
                        dropDownActive ?
                            "rounded-t-[10px]" :
                            " rounded-t-[10px] rounded-b-[10px]"
                    } bg-white w-full h-full flex pl-5 pr-4`}>
                        <div
                           onClick={handleDropDown}
                           className="flex items-center cursor-pointer">
                            <svg className={dropDownActive ? 'rotate-[90deg]' : ''}
                              width="7"
                              height="12"
                              viewBox="0 0 7 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M1 1L6.25 6L1 11"
                                stroke="#8C8FA7"
                                strokeWidth="1.4"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                        </div>
                        <Input
                          type="text"
                          placeholder="Search Content"
                          onChange={handleContentSearchValue}
                          value={contentSearchValue}
                          className="!py-3 border-none !px-4"
                          onKeyDown={handleKeyDown}
                          inputName="contentSearch"
                          updateStatus=""
                        />
                        <div className="flex items-center gap-3">
                          <CheckBox
                            onCheckChange={() => handleCheckboxes("website")}
                            className="checkbox-primary !gap-2"
                            name="website"
                            label="<p class='text-black text-xs'>Sites</p>"
                          />
                          <CheckBox
                            onCheckChange={() => handleCheckboxes("document/text")}
                            className="checkbox-primary !gap-2"
                            name="document/text"
                            label="<p class='text-black text-xs'>Docs</p>"
                          />
                        </div>
                    </div>
            </div>
            {
                dropDownActive && (
                  <div className="border-gradient w-full absolute top-full z-[999] bg-white  pt-0 p-[1px] border-b rounded-b-[10px] overflow-hidden">
                    <div className="bg-white w-full flex justify-center  px-5 rounded-b-[10px]">
                      <div className="w-full flex items-center justify-center py-6 border-t-2 border-dashed">
                        {!startRemovingDuplicates ? (
                          <p
                            onClick={handleDuplicateResult}
                            className="cursor-pointer text-sm font-secondary-medium text-orange"
                          >
                            Remove duplicate text from {totalResults} results
                          </p>
                        ) : (
                          <div className="flex items-center gap-2">
                            <div
                              className="animate-spin inline-block w-3 h-3 border-[2px] border-orange border-current border-t-transparent rounded-full"
                              role="status"
                              aria-label="loading"
                            ></div>
                            <p className="text-sm font-secondary-medium text-orange">
                              1 of {totalResults} removing
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )
            }
        </>
    )
}

export default SearchBox;