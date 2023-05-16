import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { styled } from "@mui/material/styles";
import InputWithIcon from "../CustomComponents/InputWithIcon";

type Props = {};

const TabSalary = (props: Props) => {
  return (
    <div className="flex flex-col gap-1 pb-5 px-5">
      <InputWithIcon label="Basic Salary" isRequired />
      <InputWithIcon label="Basic Salary (Audit)" isRequired />
      <InputWithIcon label="Safety Insurance Amount" isRequired />
      <InputWithIcon label="Healthy Insurance Amount" isRequired />
      <InputWithIcon label="Meal Allowance" isRequired />
    </div>
  );
};

export default TabSalary;
