import React, { ChangeEvent, ReactNode, memo } from "react";
import CustomInputSelect from "../CustomStyle/StyleSelect";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import MenuItem from "@mui/material/MenuItem";
import { PaperProps } from "@mui/material/Paper";

type PropsSelect = {
  label: string;
  placeholder?: string;
  isRequired?: boolean;
  value?: string;
  onChange?: (event: SelectChangeEvent) => void;
  name: string;
  isNa?: boolean;
  data: {}[];
};

const SelectMui = (props: PropsSelect) => {
  const { label, name, data, placeholder, isRequired, isNa, value, onChange } =
    props;
  console.log(label, isNa);

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

  console.log(value);

  return (
    <div className="flex items-center h-12">
      <label htmlFor={label} className="font-normal min-w-175 flex">
        {label}
        {isRequired && (
          <span className="text-required font-normal text-lg">* </span>
        )}
      </label>
      <Select
        displayEmpty
        className={`select h-12 min-w-290 max-w-300 mb-2.5`}
        id={name}
        input={<CustomInputSelect />}
        MenuProps={{
          PaperProps: customPaperProps,
        }}
        IconComponent={ExpandLessIcon}
        onChange={onChange}
        name="gender"
        // value={value =="" ?undefined:value }
        defaultValue={isNa ? "" : undefined}
        renderValue={() => placeholder || value}
      >
        {/* <InputLabel shrink={false} className="!hidden">
          {placeholder}
        </InputLabel> */}
        {isNa && <MenuItem value={"gender"}>N/A</MenuItem>}
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
