import React from "react";
import TableEmpoyee from "../components/TableEmpoyee";
import Breadcrumbs from "../components/Breadcrumbs";

type Props = {};

const Employee = (props: Props) => {
  return (
    <React.Fragment>
      <TableEmpoyee />
    </React.Fragment>
  );
};

export default Employee;
