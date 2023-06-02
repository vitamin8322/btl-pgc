import React, { memo, useState } from "react";
import CustomInputSelect from "../CustomStyle/StyleSelect";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { PaperProps } from "@mui/material/Paper";
import { IMarriageStatus } from "@/models/Employee";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { changeEmployee } from "@/redux/slice/employeeSlice";
import { ReactComponent as Language } from "@/assets/image/Language.svg";

type PropsSelect = {
  label?: string;
  placeholder?: string;
  isRequired?: boolean;
  value?: string | number;
  onChange?: (event: SelectChangeEvent<string | number>) => void;
  name?: string;
  isNa?: boolean;
  data: {}[];
  disabled?: boolean;
  width?: number;
  icon?: boolean
};

const SelectMui = (props: PropsSelect) => {
  const {
    label,
    name,
    data,
    placeholder,
    isRequired,
    isNa,
    value,
    onChange,
    disabled,
    width,
    icon
  } = props;

  const customPaperProps: PaperProps = {
    sx: {
      marginTop: "2px",
      boxShadow: "none",
      fontWeight: "400",
      fontSize: "16px",
      border: " 1px solid rgb(223, 227, 230)",
      padding: "0 10px",
      "& .MuiMenuItem-root": {
        marginBottom: "2px",
      },
      "& .Mui-focusVisible": {
        ...(isNa && {
          color: "rgb(48, 164, 108)",
          borderRadius: "8px",
          backgroundColor: "rgb(233, 249, 238)",
        }),
        ...(!isNa && {
          backgroundColor: "#fff !important",
        }),
      },
      "& .MuiMenuItem-root:hover": {
        color: "rgb(48, 164, 108)",
        borderRadius: "8px",
      },
      "& .MuiMenuItem-root.Mui-selected": {
        backgroundColor: "rgb(233, 249, 238)",
        borderRadius: "8px",
        color: "rgb(48, 164, 108)",
      },
    },
  };
  const [error, setError] = useState(false);
  const [touched, setTouched] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleBlur = () => {
    setTouched(true);
    if ((value === "" || value === undefined) && isRequired) {
      setError(true);
    }
  };

  const handleChangeSelect = (e: SelectChangeEvent<string | number>) => {
    const selectValue = e.target.value;
    if (name) {
      dispatch(changeEmployee({ name1: name, value: selectValue }));
    }
    if ((value !== "" || value !== undefined) && isRequired) {
      setError(false);
    }
  }
  const backgroundColor = 'blue'

  return (
    <div className="flex items-center select__icon">
     {label && (<label htmlFor={label} className="font-normal min-w-175 flex">
        {label}
        {isRequired && (
          <span className="text-required font-normal text-lg">*</span>
        )}
      </label>)}
      <div>
        <Select
          displayEmpty
          disabled={disabled}
          className={`select  ${label ? 'min-w-290 h-12': ''} ${
            disabled ? "!bg-disabled" : ""
          }  w-${width}`}
          id={name}
          error={!!error}
          input={<CustomInputSelect />}
          onBlur={handleBlur}
          MenuProps={{
            PaperProps: customPaperProps,
          }}
          IconComponent={ExpandMoreIcon}
          onChange={handleChangeSelect}
          name={name}
          value={value}
          defaultValue={isNa ? "" : value}
        >
          {isNa && <MenuItem value={""} className="text-blue1">N/A</MenuItem>}
          <MenuItem value={""}  className="!hidden text-blue1">
            {placeholder}
          </MenuItem>
          {data.map((item: any) => (
            <MenuItem value={item.id}  key={item.id} className="flex items-center">
              {icon && <Language />}
              {item.name}
            </MenuItem>
          ))}
        </Select>
        {error && touched && isRequired  && <FormHelperText className="pl-3.5">{`Please input ${label}`}</FormHelperText>}
      </div>
    </div>
  );
};

export default memo(SelectMui);
