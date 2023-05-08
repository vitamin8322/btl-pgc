import React, { ChangeEvent, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Input from '../CustomComponents/Input';
import SelectMui from '../CustomComponents/SelectMui';
import { FormEmployee } from '../../models/Employee';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store';
import { getCompany } from '../../redux/slice/authSlice';
import { SelectChangeEvent } from '@mui/material/Select';

type PropsTabEmployee = {
    formEmployee:FormEmployee
    handleFormEmployeeChange?: (event: ChangeEvent<HTMLInputElement> | SelectChangeEvent) => void;
}

const TabEmployee = (props: PropsTabEmployee) => {
  //redux
  const dispatch = useDispatch<AppDispatch>();
  const { dataAuth, company, login } = useSelector(
    (state: RootState) => state.auth
  );
  //funs
  const { formEmployee, handleFormEmployeeChange } = props;
  const { idEmployee } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getCompany());
    };

    fetchData();
  }, []);

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
        data={company}
        label="Gender"
        placeholder="Choose Gender"
        isRequired={true}
        value={formEmployee.gender}
        onChange={handleFormEmployeeChange}
        // isNa
        name="gender"
      />
      <Input
        value={formEmployee.motherName}
        name="motherName"
        onChange={handleFormEmployeeChange}
        label="Mother Name"
      />
      <Input
        value={formEmployee.dateOfBirth}
        name="dateOfBirth"
        onChange={handleFormEmployeeChange}
        label="Date of birth"
      />
      <Input
        value={formEmployee.placeOfBirth}
        name="placeOfBirth"
        onChange={handleFormEmployeeChange}
        label="Place of birth"
      />
      <Input
        value={formEmployee.ktpNo}
        name="ktpNo"
        isRequired={true}
        onChange={handleFormEmployeeChange}
        label="KTP No."
      />
      <Input
        value={formEmployee.nationalCardId}
        name="nationalCardId"
        isRequired={true}
        onChange={handleFormEmployeeChange}
        label="National Card ID"
      />
      <Input
        value={formEmployee.homeAddress1}
        name="homeAddress1"
        onChange={handleFormEmployeeChange}
        label="Home Address 1"
      />
      <Input
        value={formEmployee.homeAddress2}
        name="homeAddress2"
        onChange={handleFormEmployeeChange}
        label="Home Address 2"
      />
    </div>
    <div className="flex flex-col gap-2.5 px-2.5">
      <Input
        value={formEmployee.mobileNo}
        name="mobileNo"
        onChange={handleFormEmployeeChange}
        label="Mobile No."
      />
      <Input
        value={formEmployee.telNo}
        name="telNo"
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
        data={company}
        label="Marriage Status"
        placeholder="Choose Marriage Status"
        isRequired={true}
        value={formEmployee.marriageStatus}
        onChange={handleFormEmployeeChange}
        isNa
        name="marriageStatus"
      />
      <Input
        value={formEmployee.bankCardNo}
        name="bankCardNo"
        onChange={handleFormEmployeeChange}
        label="Bank Card No."
      />
      <Input
        value={formEmployee.bankAccountNo}
        name="bankAccountNo"
        onChange={handleFormEmployeeChange}
        label="Bank Account No."
      />
      <Input
        value={formEmployee.bankName}
        name="bankName"
        onChange={handleFormEmployeeChange}
        label="Bank Name"
      />
      <Input
        value={formEmployee.familyCardNumber}
        name="familyCardNumber"
        onChange={handleFormEmployeeChange}
        label="Family Card Number"
      />
      <Input
        value={formEmployee.safetyInsuranceNo}
        name="safetyInsuranceNo"
        onChange={handleFormEmployeeChange}
        label="Safety Insurance No."
      />
      <Input
        value={formEmployee.healthInsuranceNo}
        name="healthInsuranceNo"
        onChange={handleFormEmployeeChange}
        label="Health Insurance No."
      />
    </div>
  </div>
  )
}

export default TabEmployee