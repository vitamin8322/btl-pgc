import React, { ChangeEvent } from "react";
import TextFieldCustom from "../CustomComponents/TextFieldCustom";
import { Employee,  } from "@/models/Employee";

type PropsSalary = {
  employee:Employee
};

const TabSalary = (props: PropsSalary) => {
  const {   employee } = props;
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
