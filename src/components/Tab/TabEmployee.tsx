import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InputCustom from "../CustomComponents/InputCustom";
import SelectMui from "../CustomComponents/SelectMui";
import { IEmployeeFrom, IFormEmployee } from "@/models/Employee";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getCompany } from "@/redux/slice/authSlice";
import { SelectChangeEvent } from "@mui/material/Select";
import { addEmployee, getMarriage } from "@/redux/slice/employeeSlice";
import DatePickerCustom from "../CustomComponents/DatePickerCustom";
import TextFieldCustom from "../CustomComponents/TextFieldCustom";

type PropsTabEmployee = {
  employee: IEmployeeFrom;
};

const TabEmployee = (props: PropsTabEmployee) => {
  //redux
  const dispatch = useDispatch<AppDispatch>();
  const { company } = useSelector((state: RootState) => state.auth);
  const { dataMarriage } = useSelector((state: RootState) => state.employee);

  //funs
  const { employee } = props;
  const { idEmployee } = useParams();

  const dateGender = [
    {
      id: 0,
      name: "Male",
    },
    {
      id: 1,
      name: "Female",
    },
  ];

  return (
    <div className="flex pb-5 flex-wrap gap-10">
      <div className="flex flex-col gap-2.5 px-2.5">
        {idEmployee ? (
          <>
            <TextFieldCustom
              value={employee?.staff_id}
              name="staff_id"
              label="NIK"
              disabled
            />
          </>
        ) : (
          <></>
        )}
        <TextFieldCustom
          value={employee?.name}
          name="name"
          isRequired={true}
          label="Name"
          length={50}
          />
        <SelectMui
          data={dateGender}
          label="Gender"
          placeholder="Choose Gender"
          isRequired={true}
          value={employee?.gender}
          // isNa
          name="gender"
        />
        <TextFieldCustom
          value={employee?.mother_name}
          name="mother_name"
          label="Mother Name"
          length={50}
        />
        <DatePickerCustom
          isRequired={true}
          label="Date of birth"
          name="dob"
          value={employee?.dob}
        />
        <TextFieldCustom
          value={employee?.pob}
          name="pob"
          label="Place of birth"
          length={50}
        />
        <TextFieldCustom
          value={employee?.ktp_no}
          name="ktp_no"
          isRequired={true}
          label="KTP No."
          length={20}
          type="number"
        />
        <TextFieldCustom
          value={employee?.nc_id}
          name="nc_id"
          isRequired={true}

          label="National Card ID"
          length={20}
        />
        <TextFieldCustom
          value={employee?.home_address_1}
          name="home_address_1"
          label="Home Address 1"
          length={100}
        />
        <TextFieldCustom
          value={employee?.home_address_2 ?? ""}
          name="home_address_2"
          label="Home Address 2"
          length={100}
        />
      </div>
      <div className="flex flex-col gap-2.5 px-2.5">
        <TextFieldCustom
          value={employee?.mobile_no ?? ""}
          name="mobile_no"
          label="Mobile No."
          length={20}
          type="number"
        />
        <TextFieldCustom
          value={employee?.tel_no}
          name="tel_no"
          label="Tel No."
          length={20}
          type="number"
        />
        <SelectMui
          data={dataMarriage}
          label="Marriage Status"
          placeholder="Choose Marriage Status"
          // isRe quired={true}
          value={employee?.marriage_id ?? ""}
          isNa
          name="marriage_id"
        />
        <TextFieldCustom
          value={employee?.card_number ?? ""}
          name="card_number"
          label="Bank Card No."
          length={30}
          type="number"
        />
        <TextFieldCustom
          value={employee?.bank_account_no}
          name="bank_account_no"
          label="Bank Account No."
          length={30}
          type="number"
        />
        <TextFieldCustom
          value={employee?.bank_name}
          name="bank_name"
          label="Bank Name"
          length={100}
        />
        <TextFieldCustom
          value={employee?.family_card_number}
          name="family_card_number"
          label="Family Card Number"
          length={30}
          type="number"
        />
        <TextFieldCustom
          value={employee?.safety_insurance_no}
          name="safety_insurance_no"
          label="Safety Insurance No."
          length={30}
          type="number"
        />
        <TextFieldCustom
          value={employee?.health_insurance_no}
          name="health_insurance_no"
          label="Health Insurance No."
          length={30}
          type="number"
        />
      </div>
    </div>
  );
};

export default TabEmployee;
