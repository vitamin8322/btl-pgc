import React, { ChangeEvent, memo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

type PropsInput = {
  label?: string;
  isRequired?: boolean;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  size?:boolean;
  disabled?: boolean;
};


const InputCustom = (props: PropsInput) => {
  const { label, onChange, value, name, isRequired, size,disabled } = props;
  
  // console.log(label, value);
  
  return (
    <>
      <div className="flex items-center h-12">
        <label htmlFor={label} className={`font-normal ${size ?`min-w-128` : `min-w-175`} flex`}>
          {label}
          {isRequired && (
            <span className="text-required font-normal text-lg">*</span>
          )}
        </label>
        <input
          onChange={onChange}
          value={value}
          disabled={disabled}
          name={name}
          className={`input h-12 w-full max-w-300  ${
            disabled ? "!bg-disabled" : ""
          }`}
        />
      </div>
    </>
  );
};

export default memo(InputCustom);
