import React from "react";
import TableEmpoyee from "../components/Table/TableEmpoyee";
import Breadcrumbs from "../components/Breadcrumbs";
import ActionTable from "../components/ActionTable";

type Props = {};

const Employee = (props: Props) => {
  return (
    <div className=" bg-white p-2.5 rounded-lg">
      <ActionTable />
      <hr
        style={{
          marginTop: "10px",
          flexShrink: "0",
          borderWidth: "0px 0px thin",
          borderStyle: "solid",
          borderColor: "rgba(193, 200, 205, 0.24)",
        }}
      />
      <TableEmpoyee />
    </div>
  );
};

export default Employee;
