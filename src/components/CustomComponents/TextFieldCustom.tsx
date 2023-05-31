import React, { ChangeEvent, memo, useState } from "react";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { changeEmployee } from "../../redux/slice/employeeSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

type PropsTextFieldCustom = {
  label?: string;
  isRequired?: boolean;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | null;
  type?: string;
  isIcon?: boolean;
  length?: number;
  helpText?: string;
  disabled?: boolean;
  width?: number;
  pls?: boolean;
};

const StyledFilledInput = styled(TextField)({
  width: "100%",
  maxWidth: "308px",
  borderRadius: "6px",
  // backgroundColor: rgb(241, 243, 245),
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

const TextFieldCustom = (props: PropsTextFieldCustom) => {
  const {
    label,
    value,
    name,
    isRequired,
    onChange,
    type = "text",
    isIcon,
    length,
    disabled,
    width = 175,
  } = props;

  // const [value, setValue] = useState<string | number>();
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);
  // console.log();
  // console.log(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // setValue(inputValue);
    if (onChange) {
      onChange(e);
      if (inputValue !== "") {
        setError(false);
      } else {
        setError(true);
      }
    } else {
      if (type === "number") {
        setError(parseInt(inputValue) < 0);
      }
      if (length) {
        setError(inputValue.length > length);
      }
      if (name) {
        dispatch(changeEmployee({ name1: name, value: inputValue }));
      }
    }
  };
  const handleBlur = () => {
    setTouched(true);
    if ((value === "" || value === undefined) && isRequired) {
      setError(true);
    }
  };

  return (
    <div
      className={`flex items-center ${
        width === 211 ? `` : `input__number`
      } input__custom`}
    >
      <label
        htmlFor={label}
        className={`font-normal flex ${
          width === 211 ? `min-w-211` : `min-w-${width}`
        }`}
      >
        {label}
        {isRequired && (
          <span className="text-required font-normal text-lg">*</span>
        )}
      </label>
      <StyledFilledInput
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        error={error}
        onBlur={handleBlur}
        helperText={
          (touched && value === "" && error) || (value === "" && error) || error
            ? value === "" && !onChange
              ? `Please input ${label}`
              : onChange
              ? ""
              : `Maximum length is ${length} characters`
            : ""
        }
        InputProps={{
          startAdornment: isIcon && (
            <InputAdornment position="start" sx={{ color: "blue" }}>
              Rp
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default memo(TextFieldCustom);
