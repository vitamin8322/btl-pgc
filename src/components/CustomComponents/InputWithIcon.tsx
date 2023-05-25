import React, { ChangeEvent, memo, useState } from "react";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import { changeEmployee } from "../../redux/slice/employeeSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

type PropsInputWithIcon = {
  label?: string;
  isRequired?: boolean;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | null;
  type?: string;
  isIcon?: boolean;
  length?: number;
  helpText?: string;
};

const StyledFilledInput = styled(TextField)({
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
  const { label, name, isRequired, type, isIcon, length } = props;
  const [value, setValue] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    // length ? setError(inputValue.length < length) : setError(false);
    setError(inputValue.length < 3)
    console.log(name, inputValue);
    if (name) {
      dispatch(changeEmployee({ name1: name, value: inputValue }));
    }
  };
  const handleBlur = () => {
    setTouched(true);
  };
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
        // disableUnderline={true}
        // onChange={onChange}
        name={name}
        value={value}
        onChange={handleChange}
        error={error} // Xác định trạng thái lỗi
        onBlur={handleBlur}
        helperText={touched && (error && value !='' ? 'Value must have at least 5 characters' : value ? '' : 'Please input')}// Hiển thị thông báo lỗi
        // startAdornment={
        //   <InputAdornment position="start" sx={{ color: "blue" }}>
        //     Rp
        //   </InputAdornment>
        // }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start" sx={{ color: "blue" }}>
              Rp
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default InputWithIcon;
