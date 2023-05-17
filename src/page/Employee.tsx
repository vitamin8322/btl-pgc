import React, { useEffect } from "react";
import TableEmpoyee from "../components/Table/TableEmpoyee";
import Breadcrumbs from "../components/Breadcrumbs";
import ActionTable from "../components/Table/ActionTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { dataDeletes } from "../redux/slice/employeeSlice";

type Props = {};

const Employee = (props: Props) => {
  
  const dispatch = useDispatch<AppDispatch>();
  const { dataDelete } = useSelector((state: RootState) => state.employee);
  useEffect(() => {
    dispatch(dataDeletes([]));
  },[])


  return (
    <div className=" bg-white p-2.5 rounded-lg shadow-table">
      {/* <ActionTable /> */}
      {/* <hr
        style={{
          margin: "10px 0",
          flexShrink: "0",
          borderWidth: "0px 0px thin",
          borderStyle: "solid",
          borderColor: "rgba(193, 200, 205, 0.24)",
        }}
      /> */}
      <TableEmpoyee />
    </div>
  );
};

export default Employee;
