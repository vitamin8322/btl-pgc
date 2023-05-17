import React, { ChangeEvent, forwardRef, useState } from "react";
import DatePicker, { ReactDatePickerProps } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./Custom.scss";
import { FilledInput, IconButton, Input } from "@mui/material";
import { styled } from "@mui/material/styles";
// import Calendar from "../../assets/image/Calendar.svg";
import Down from "../../assets/image/Down.svg";
// import Clear from "../../assets/image/Clear.svg";
import InputAdornment from "@mui/material/InputAdornment";
import moment from "moment";
import { ReactComponent as Calendar } from "../../assets/image/Calendar.svg";
import { ReactComponent as Clear } from "../../assets/image/Clear.svg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { changeEmployee } from "../../redux/slice/employeeSlice";

const StyledFilledInput = styled(FilledInput)({
  // width: "308px",
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

type PropsInputDatePicker = {
  label?: string;
  isRequired?: boolean;
  name?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  size?: boolean;
};
const DatePickerCustom = (props: PropsInputDatePicker) => {
  const { label, onChange, value, name, isRequired, size } = props;
  const [startDate, setStartDate] = useState<Date | null>();
  const dispatch = useDispatch<AppDispatch>();

  const handleChangeDate = (date: Date, event: ChangeEvent<HTMLInputElement> ) => {
    setStartDate(date);
    // Format startDate to "YYYY-MM-DD"
    const formattedDate = moment(date).format("YYYY-MM-DD");
    console.log(name);
    
    if(name != undefined){
      dispatch(changeEmployee({ name1: name,value: formattedDate }));
    }
    // Thực hiện các xử lý khác khi ngày thay đổi
  };

  const ExampleCustomInput = forwardRef(
    ({ value, onClick, onChange }: any, ref: any) => (
      <StyledFilledInput
        onClick={onClick}
        onChange={onChange}
        disableUnderline={true}
        value={value}
        startAdornment={
          <InputAdornment position="start" sx={{ color: "blue" }}>
            {/* <img src={Calendar} /> */}
            <Calendar />
          </InputAdornment>
        }
        endAdornment={
          <>
            <InputAdornment
              position="start"
              sx={{
                color: "blue",
                cursor: "pointer",
                "&:hover": { backgroundColor: "rgba(215, 219, 223, 0.08)" },
              }}
            >
              <div
                className="pointer"
                onClick={(e) => {
                  setStartDate(null);
                  e.stopPropagation();
                }}
              >
                {startDate && (
                  // <img src={Clear} className="h-4" />
                  <Clear />
                )}
              </div>
            </InputAdornment>
            <InputAdornment position="start" sx={{ color: "blue" }}>
              <img src={Down} className="h-4" />
            </InputAdornment>
          </>
        }
      />
    )
  );
  return (
    <div className="flex items-center h-12">
      <label
        htmlFor={label}
        className={`font-normal ${size ? `min-w-128` : `min-w-175`} flex`}
      >
        {label}
        {isRequired && (
          <span className="text-required font-normal text-lg">*</span>
        )}
      </label>
      <DatePicker
        selected={startDate}
        onChange={handleChangeDate}
        // isClearable
        name={name}
        calendarStartDay={1}
        fixedHeight
        className="max-w-265"
        customInput={<ExampleCustomInput />}
        dayClassName={() => "example-datepicker-day-class"}
        popperClassName="example-datepicker-class"
      />
    </div>
  );
};

export default DatePickerCustom;
