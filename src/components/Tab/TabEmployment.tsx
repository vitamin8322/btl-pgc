import { SelectChangeEvent } from "@mui/material/Select";
import React, { ChangeEvent, useEffect } from "react";
import { IFormEmploymentDetail } from "../../models/Employee";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { getDepartment, getPosition } from "../../redux/slice/employeeSlice";
import SelectMui from "../CustomComponents/SelectMui";

type PropsTabEmployment = {
  formEmploymentDetail: IFormEmploymentDetail;
  handleFormEmploymentDetailChange?: (
    event: ChangeEvent<HTMLInputElement> | SelectChangeEvent<string | number>
  ) => void;
};

const TabEmployment = (props: PropsTabEmployment) => {
  //redux
  const dispatch = useDispatch<AppDispatch>();
  const { dataDepartment, dataPosition } = useSelector((state: RootState) => state.employee);
  
  //funs
  const { formEmploymentDetail, handleFormEmploymentDetailChange } = props;

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getDepartment());
      await dispatch(getPosition());
    };
    fetchData();
  }, []);
  return (
    <div>
      <div className="flex flex-col gap-2.5 px-2.5">
        <SelectMui
          data={dataDepartment}
          label="Department"
          placeholder="Choose Department"
          value={formEmploymentDetail.department_id}
          onChange={handleFormEmploymentDetailChange}
          isNa
          name="department_id"
        />
         <SelectMui
          data={dataPosition}
          label="Position"
          placeholder="Choose Position"
          value={formEmploymentDetail.position_id}
          onChange={handleFormEmploymentDetailChange}
          isNa
          name="position_id"
        />
      </div>
    </div>
  );
};

export default TabEmployment;
