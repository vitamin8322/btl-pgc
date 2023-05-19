import React, { ChangeEvent } from "react";
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
import { IFormSalary } from "../../models/Employee";
import { SelectChangeEvent } from "@mui/material/Select";

type PropsSalary = {
  formSalary: IFormSalary;
  handleFormSalary?: (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | number>
  ) => void;
};

const TabSalary = (props: PropsSalary) => {
  const { formSalary, handleFormSalary } = props;
  return (
    <div className="flex flex-col gap-1 pb-5 px-5">
      <InputWithIcon
        label="Basic Salary"
        isRequired
        value={formSalary.basic_salary}
        onChange={handleFormSalary}
        name="basic_salary"
      />
      <InputWithIcon
        label="Basic Salary (Audit)"
        isRequired
        value={formSalary.audit_salary}
        onChange={handleFormSalary}
        name="audit_salary"
      />
      <InputWithIcon
        label="Safety Insurance Amount"
        isRequired
        value={formSalary.safety_insurance}
        onChange={handleFormSalary}
        name="safety_insurance"
      />
      <InputWithIcon
        label="Healthy Insurance Amount"
        isRequired
        value={formSalary.health_insurance}
        onChange={handleFormSalary}
        name="health_insurance"
      />
      <InputWithIcon
        label="Meal Allowance"
        isRequired
        value={formSalary.meal_allowance}
        onChange={handleFormSalary}
        name="meal_allowance"
      />
    </div>
  );
};

export default TabSalary;
