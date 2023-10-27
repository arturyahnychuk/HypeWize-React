import React, { InputHTMLAttributes, useState, useEffect } from "react";

interface CheckBoxProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  onCheckChange?: (isChecked: boolean) => void; // Callback to handle state changes
  className?: string;
}

function CheckBox({ checked, className, onCheckChange, disabled, ...props }: CheckBoxProps) {
  const [internalChecked, setInternalChecked] = useState(checked || false);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setInternalChecked(checked || false);
    setIsDisabled(disabled);
  }, [checked, disabled]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newChecked = event.target.checked;
    setInternalChecked(newChecked);

    if (onCheckChange) {
      onCheckChange(newChecked); // Call the callback with the updated state
    }

    if (props.onChange) {
      props.onChange(event);
    }
  };

  return (
    <label
      className={`${
        className ? className : ""
      } select-none checkbox cursor-pointer flex items-center gap-3`}
    >
      <input
        className="sr-only peer"
        type="checkbox"
        {...props}
        checked={internalChecked}
        onChange={handleChange}
        disabled={ isDisabled }
      />
      <div className="peer-checked:bg-redLight w-[17px] h-[17px] rounded-[2px] border border-gray-100 peer-checked:border-transparent flex items-center justify-center">
        {internalChecked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span
        className="checkbox-label"
        dangerouslySetInnerHTML={{ __html: props.label || "" }}
      />
    </label>
  );
}

export default CheckBox;
