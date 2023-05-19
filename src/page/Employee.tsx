import React, { useEffect } from "react";
import TableEmpoyee from "../components/Table/TableEmpoyee";
import Breadcrumbs from "../components/Breadcrumbs";
import ActionTable from "../components/Table/ActionTable";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { dataDeletes, getEmployee } from "../redux/slice/employeeSlice";
import { useLocation } from "react-router-dom";

type Props = {};

const Employee = (props: Props) => {
  
  const location = useLocation(); 
  const Params = new URLSearchParams(location.search.split("?")[1]);
  // console.log(location);
  
  const searchValue = Params.get("search");
  const pageValue = Params.get("page");
  // console.log(searchValue);
  // console.log(pageValue);
  

  const dispatch = useDispatch<AppDispatch>();
  const { dataDelete } = useSelector((state: RootState) => state.employee);
  useEffect(() => {
    if(location.search.includes('search') ===false){
      dispatch(getEmployee({page:Number(pageValue)}));
      // navigate(`/employee?page=${page}`);
    }else{
      dispatch(getEmployee({page:Number(pageValue), query: searchValue})); 
      // navigate(`/employee?search=${searchValue}&page=${page}`);
    }
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
