import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const ActionTable = (props: Props) => {


  return (
    <div className="h-9">
      <Link to="/employee/create-or-update">
        <button>Add</button>
      </Link>
      <button>Delete</button>
    </div>
  );
};

export default ActionTable;
