import React, { ChangeEvent, memo, useState } from "react";
import FilledInput from "@mui/material/FilledInput";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";

type PropsInputWithIcon = {
  label?: string;
  isRequired?: boolean;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string | number | null;
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
  const { label, onChange,  name, isRequired } = props;
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
    setError(inputValue.length < 5); // Kiểm tra lỗi khi độ dài nhỏ hơn 5 ký tự
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
        helperText={error ? 'Value must have at least 5 characters' : ''} // Hiển thị thông báo lỗi
      
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
