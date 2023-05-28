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
import TextFieldCustom from "../CustomComponents/TextFieldCustom";
import { Employee, IFormSalary } from "../../models/Employee";
import { SelectChangeEvent } from "@mui/material/Select";

type PropsSalary = {
  formSalary: IFormSalary;
  
  employee:Employee
};

const TabSalary = (props: PropsSalary) => {
  const { formSalary,  employee } = props;
  return (
    <div className="flex flex-col gap-1 pb-5 px-5">
      <TextFieldCustom
        label="Basic Salary"
        isRequired
        value={employee.basic_salary}
        isIcon
        type='number'
        width={211}
        name="basic_salary"
      />
      <TextFieldCustom
        label="Basic Salary (Audit)"
        isRequired
        value={employee.audit_salary}
        isIcon
        type='number'
        width={211}
        name="audit_salary"
      />
      <TextFieldCustom
        label="Safety Insurance Amount"
        isRequired
        value={employee.safety_insurance}
        isIcon
        type='number'
        width={211}
        name="safety_insurance"
      />
      <TextFieldCustom
        label="Healthy Insurance Amount"
        isRequired
        value={employee.health_insurance}
        isIcon
        type='number'
        width={211}
        name="health_insurance"
      />
      <TextFieldCustom
        label="Meal Allowance"
        isRequired
        value={employee.meal_allowance}
        isIcon
        type='number'
        width={211}
        name="meal_allowance"
      />
    </div>
  );
};

export default TabSalary;
