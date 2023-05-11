import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Input from "../CustomComponents/Input";
import SelectMui from "../CustomComponents/SelectMui";
import { IFormEmployee } from "../../models/Employee";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getCompany } from "../../redux/slice/authSlice";
import { SelectChangeEvent } from "@mui/material/Select";
import { addEmployee, getMarriage } from "../../redux/slice/employeeSlice";

type PropsTabEmployee = {
  formEmployee: IFormEmployee;
  handleFormEmployeeChange?: (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) => void;
};

const TabEmployee = (props: PropsTabEmployee) => {
  //redux
  const dispatch = useDispatch<AppDispatch>();
  const { company } = useSelector((state: RootState) => state.auth);
  const { dataMarriage, employee } = useSelector(
    (state: RootState) => state.employee
  );
  //funs
  const { formEmployee, handleFormEmployeeChange } = props;
  const { idEmployee } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getCompany());
      await dispatch(getMarriage());
    };

    fetchData();
  }, []);

  const dateGender = [
    {
      id:0,
      name: 'Male',
    },
    {
      id:1,
      name:'Female'
    }
  ]

  return (
    <div className="flex pb-5 flex-wrap gap-10">
      <div className="flex flex-col gap-2.5 px-2.5">
        {idEmployee ? (
          <>
            <Input
              value={formEmployee.nik}
              name="nik"
              onChange={handleFormEmployeeChange}
              label="NIK"
            />
          </>
        ) : (
          <></>
        )}
        <Input
          value={formEmployee.name}
          name="name"
          isRequired={true}
          onChange={handleFormEmployeeChange}
          label="Name"
        />
        <SelectMui
          data={dateGender}
          label="Gender"
          placeholder="Choose Gender"
          isRequired={true}
          value={formEmployee.gender}
          onChange={handleFormEmployeeChange}
          // isNa
          name="gender"
        />
        <Input
          value={formEmployee.mother_name}
          name="mother_name"
          onChange={handleFormEmployeeChange}
          label="Mother Name"
        />
        <Input
          value={formEmployee.dob}
          name="dob"
          onChange={handleFormEmployeeChange}
          label="Date of birth"
        />
        <Input
          value={formEmployee.pob}
          name="pob"
          onChange={handleFormEmployeeChange}
          label="Place of birth"
        />
        <Input
          value={formEmployee.ktp_no}
          name="ktp_no"
          isRequired={true}
          onChange={handleFormEmployeeChange}
          label="KTP No."
        />
        <Input
          value={formEmployee.nc_id}
          name="nc_id"
          isRequired={true}
          onChange={handleFormEmployeeChange}
          label="National Card ID"
        />
        <Input
          value={formEmployee.home_address_1}
          name="home_address_1"
          onChange={handleFormEmployeeChange}
          label="Home Address 1"
        />
        <Input
          value={formEmployee.home_address_2}
          name="home_address_2"
          onChange={handleFormEmployeeChange}
          label="Home Address 2"
        />
      </div>
      <div className="flex flex-col gap-2.5 px-2.5">
        <Input
          value={formEmployee.mobile_no}
          name="mobile_no"
          onChange={handleFormEmployeeChange}
          label="Mobile No."
        />
        <Input
          value={formEmployee.tel_no}
          name="tel_no"
          onChange={handleFormEmployeeChange}
          label="Tel No."
        />
        {/* <Input
        value={formEmployee.marriageStatus}
        name="marriageStatus"
        onChange={handleFormEmployeeChange}
        label="Marriage Status"
      /> */}
        <SelectMui
          data={dataMarriage}
          label="Marriage Status"
          placeholder="Choose Marriage Status"
          // isRe quired={true}
          value={formEmployee.marriage_id}
          onChange={handleFormEmployeeChange}
          isNa
          name="marriage_id"
        />
        <Input
          value={formEmployee.card_number}
          name="card_number"
          onChange={handleFormEmployeeChange}
          label="Bank Card No."
        />
        <Input
          value={formEmployee.bank_account_no}
          name="bank_account_no"
          onChange={handleFormEmployeeChange}
          label="Bank Account No."
        />
        <Input
          value={formEmployee.bank_name}
          name="bank_name"
          onChange={handleFormEmployeeChange}
          label="Bank Name"
        />
        <Input
          value={formEmployee.family_card_number}
          name="family_card_number"
          onChange={handleFormEmployeeChange}
          label="Family Card Number"
        />
        <Input
          value={formEmployee.safety_insurance_no}
          name="safety_insurance_no"
          onChange={handleFormEmployeeChange}
          label="Safety Insurance No."
        />
        <Input
          value={formEmployee.health_insurance_no}
          name="health_insurance_no"
          onChange={handleFormEmployeeChange}
          label="Health Insurance No."
        />
      </div>
    </div>
  );
};

export default TabEmployee;
