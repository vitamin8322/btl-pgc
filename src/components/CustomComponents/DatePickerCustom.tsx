import React, { ChangeEvent, forwardRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import "./Custom.scss";
import { FilledInput, IconButton, Input } from "@mui/material";
import { styled } from "@mui/material/styles";
import Calendar from "../../assets/image/Calendar.svg";
import Down from "../../assets/image/Down.svg";
import InputAdornment from "@mui/material/InputAdornment";

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

  const getWeekdayLabel = ({ day, date, options }: any) => {
    const weekday = new Intl.DateTimeFormat(options.locale, {
      weekday: "short",
    }).format(date);
    return weekday.slice(1); // Remove the first character (Sunday's label)
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
            <img src={Calendar} className="h-9" />
          </InputAdornment>
        }
        endAdornment={
          <>
            <InputAdornment position="start" sx={{ color: "blue" }}>
              <div
                className="pointer"
                onClick={(e) => {
                  setStartDate(null);
                  e.stopPropagation();
                }}
              >
                x
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
        onChange={(date: any) => setStartDate(date)}
        // isClearable
        calendarStartDay={1}
        fixedHeight
        customInput={<ExampleCustomInput />}
        dayClassName={() => "example-datepicker-day-class"}
        popperClassName="example-datepicker-class"
      />
    </div>
  );
};

export default DatePickerCustom;
