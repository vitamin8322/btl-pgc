import React, {
  ChangeEvent,
  forwardRef,
  memo,
  useEffect,
  useState,
} from "react";
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
  onChange?: (date: Date, event: ChangeEvent<HTMLInputElement>) => void;
  value?: string;
  size?: boolean;
  setValueDate?: React.Dispatch<React.SetStateAction<any>>;
};
const DatePickerCustom = (props: PropsInputDatePicker) => {
  const { label, onChange, value, name, isRequired, size, setValueDate } =
    props;
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const handleChangeDate = (
    date: Date,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setStartDate(date);
    const formattedDate = moment(date).format("YYYY-MM-DD");
    if (name != undefined) {
      dispatch(changeEmployee({ name1: name, value: formattedDate }));
    }
    if (formattedDate !== "") {
      setError(false);
    }
  };
  const handleBlur = () => {
    setTouched(true);
    if ((value === "" || value === undefined) && isRequired) {
      setError(true);
    }
  };

  const ExampleCustomInput = forwardRef(
    ({ value, onClick, onChange }: any) => (
      <StyledFilledInput
        onClick={onClick}
        onChange={onChange}
        disableUnderline={true}
        value={value}
        error={error}
        onBlur={handleBlur}
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
                  setError(true);
                  if (name != undefined && !setValueDate) {
                    dispatch(changeEmployee({ name1: name, value: null }));
                  }
                  if (onchange && setValueDate) {
                    setValueDate((prevValues: any) => ({
                      ...prevValues,
                      date: "",
                    }));
                  }
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
        selected={
          value != undefined && value != "" && value != null
            ? new Date(String(value))
            : startDate
        }
        onChange={onChange ? onChange : handleChangeDate}
        // isClearable
        name={name}
        calendarStartDay={1}
        fixedHeight
        dateFormat="yyyy/MM/dd"
        className="max-w-265"
        customInput={<ExampleCustomInput />}
        dayClassName={() => "example-datepicker-day-class"}
        popperClassName="example-datepicker-class"
      />
    </div>
  );
};

export default memo(DatePickerCustom);
