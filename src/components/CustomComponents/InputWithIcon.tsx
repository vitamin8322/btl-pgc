import React, { ChangeEvent, memo } from "react";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";

type PropsInputWithIcon = {
  label?: string;
  isRequired?: boolean;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | null;
};

const StyledFilledInput = styled(FilledInput)({
  width: "308px",
  borderRadius: "6px",
  backgroundColor: "rgb(241, 243, 245)",
  "& .MuiFilledInput-input": {
    padding: "12px",
    paddingLeft: "0",
  },
  "&.Mui-focused": {
    backgroundColor: "rgba(0, 0, 0, 0.06)",
  },
  "&.MuiFilledInput-root:hover": {
    backgroundColor: "rgb(241, 243, 245)",
  },
  "& .MuiTypography-root": {
    color: "rgb(0, 106, 220)",
  },
});

const InputWithIcon = (props: PropsInputWithIcon) => {
  const { label, onChange, value, name, isRequired } = props;

  return (
    <div className="flex items-center">
      <label htmlFor={label} className="font-normal min-w-211 flex">
        {label}
        {isRequired && (
          <span className="text-required font-normal text-lg">*</span>
        )}
      </label>
      <StyledFilledInput
        type="number"
        disableUnderline={true}
        onChange={onChange}
        name={name}
        value={value}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "blue" }}>
            Rp
          </InputAdornment>
        }
      />
    </div>
  );
};

export default InputWithIcon;
