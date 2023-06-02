import React, { ChangeEvent, useEffect } from "react";
import InputCustom from "../CustomComponents/InputCustom";
import { Employee, IFormContract } from "@/models/employee";
import { SelectChangeEvent } from "@mui/material/Select";
import SelectMui from "../CustomComponents/SelectMui";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { getDepartment } from "@/redux/slice/employeeSlice";
import ContractUploadFile from "./ComponentsTab/ContractUploadFile";
import DatePickerCustom from "../CustomComponents/DatePickerCustom";
import { useParams } from "react-router-dom";

type PropsTabContract = {
  employee: Employee;
};

const TabContract = (props: PropsTabContract) => {
  //redux
  const dispatch = useDispatch<AppDispatch>();
  const { dataDepartment } = useSelector((state: RootState) => state.employee);
  const { idEmployee } = useParams();

  const {employee } = props;

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await dispatch(getDepartment());
  //   };

  //   fetchData();
  // }, []);

  const data = [
    {
      id: "0",
      name: "Parmanent",
      code: "MK01",
      company_id: 1,
      created_at: "2023-04-27T09:41:28.000000Z",
      updated_at: null,
    },
    {
      id: "1",
      name: "Part-time",
      code: "S01",
      company_id: 1,
      created_at: "2023-04-27T09:41:28.000000Z",
      updated_at: null,
    },
    {
      id: "2",
      name: "Contract",
      code: "M01",
      company_id: 1,
      created_at: "2023-04-27T09:41:28.000000Z",
      updated_at: null,
    },
  ];

  return (
    <div>
      <div className="flex flex-col gap-2.5 px-2.5">
        <DatePickerCustom
          isRequired={true}
          value={employee.contract_start_date}
          label="Date Start"
          name="contract_start_date"
        />

        <SelectMui
          data={data}
          label="Employee Type"
          placeholder="Choose Type"
          isRequired={true}
          value={employee.type ?? ""}
          name="type"
          disabled={idEmployee? true : false}
        />
        <ContractUploadFile />
      </div>
    </div>
  );
};

export default TabContract;
