import { Breadcrumbs as MUIBreadcrumbs } from "@mui/material";
import { NavLink, useParams } from "react-router-dom";

type Props = {
  crumbs: string[];
};

const Breadcrumbs = (props: Props) => {
  const { crumbs } = props;
  const { idEmployee } = useParams();

  return (
    <MUIBreadcrumbs separator="›" aria-label="breadcrumb">
      <NavLink to={`/${crumbs[0]}`}>General</NavLink>
      <NavLink
        to={`/employee`}
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-black " : ""
        }
        // activeClassName="text-black"
        end 
      >
        Employee Management
      </NavLink>
      {crumbs.length > 2 && (
      <NavLink
        to={idEmployee ? `/employee/create-or-update/${idEmployee}` : `/employee/create-or-update`}
        aria-current="page"
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "text-black " : ""
        }
        end 
      >
        {idEmployee ? <>Edit employee</> : <>Add new employee</>}
      </NavLink>
      )}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
