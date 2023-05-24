import React, { memo } from "react";
import CustomInputSelect from "../CustomStyle/StyleSelect";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { PaperProps } from "@mui/material/Paper";
import { IMarriageStatus } from "../../models/Employee";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
type PropsSelect = {
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  value?: string | number;
  onChange?: (event: SelectChangeEvent<string | number>) => void;
  name: string;
  isNa?: boolean;
  data: {}[];
  disabled?: boolean;
  width?: number;
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
  } = props;
  // console.log(label, value); 

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

  return (
    <div className="flex items-center h-12">
      <label htmlFor={label} className="font-normal min-w-175 flex">
        {label}
        {isRequired && (
          <span className="text-required font-normal text-lg">*</span>
        )}
      </label>
      <Select
        displayEmpty
        disabled={disabled}
        className={`select h-12 min-w-290 mb-2.5 ${
          disabled ? "!bg-disabled" : ""
        }  w-${width}`}
        id={name}
        input={<CustomInputSelect />}
        MenuProps={{
          PaperProps: customPaperProps,
        }}
        IconComponent={ExpandMoreIcon}
        onChange={onChange}
        name={name}
        value={value}
        defaultValue={isNa ? "" : value}
      >
        {isNa && <MenuItem value={""} className="text-blue1">N/A</MenuItem>}
        <MenuItem value={""}  className="!hidden text-blue1">
          {placeholder}
        </MenuItem>
        {data.map((item: any) => (
          <MenuItem value={item.id} key={item.key}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default memo(SelectMui);
