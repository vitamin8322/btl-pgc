import { Pagination, PaginationItem } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { getEmployee } from "../../redux/slice/employeeSlice";
import { IEmployeeListResponse } from "../../models/Employee";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

type Props = {};

const PaginationEmployee = (dataEmployee: any) => {
  console.log(dataEmployee);

  const dispatch = useDispatch<AppDispatch>();
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log(page);
    dispatch(getEmployee(page));
  };
  return (
    <div className="flex items-center">
      <Pagination
        onChange={handleChangePage}
        count={dataEmployee.dataEmployee.last_page}
        // rowsPerPage={rowsPerPage}
        // rowsPerPageOptions={[]}
        showFirstButton
        showLastButton
        renderItem={(item) => (
          <PaginationItem
            slots={{
              previous: ArrowBackIcon,
              next: ArrowForwardIcon,
              last: ArrowForwardIcon,
            }}
            {...item}
          />
        )}
      />
      <div>
        {dataEmployee.dataEmployee.from} - {dataEmployee.dataEmployee.to} of{" "}
        {dataEmployee.dataEmployee.total + 1}
      </div>
    </div>
  );
};

export default PaginationEmployee;
