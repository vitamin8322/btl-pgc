import React, { ChangeEvent, memo } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

type PropsInput = {
  label: string;
  isRequired?: boolean;
  name: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const Input = (props: PropsInput) => {
  const { label, onChange, value, name, isRequired } = props;
  
  // console.log(label);
  
  return (
    <>
      <div className="flex items-center h-12">
        <label htmlFor={label} className="font-normal min-w-175 flex">
          {label}
          {isRequired && (
            <span className="text-required font-normal text-lg">*</span>
          )}
        </label>
        <input
          onChange={onChange}
          value={value}
          name={name}
          className="input h-12 min-w-290 max-w-300 "
        />
      </div>
    </>
  );
};

export default memo(Input);
