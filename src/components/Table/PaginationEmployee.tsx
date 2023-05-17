import { Pagination, PaginationItem } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import React from "react";
import { getEmployee } from "../../redux/slice/employeeSlice";
import { IEmployeeListResponse } from "../../models/Employee";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { ReactComponent as First } from "../../assets/image/First.svg";
import { ReactComponent as Next } from "../../assets/image/Next.svg";
import { ReactComponent as Previous } from "../../assets/image/Previous.svg";
import { ReactComponent as Last } from "../../assets/image/Last.svg";
import { useLocation, useNavigate } from "react-router-dom";

type Props = {};

const PaginationEmployee = (dataEmployee: any) => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  console.log(location.search.includes('search'));
  const searchParams = new URLSearchParams(location.search.split("?")[1]);
  const searchValue = searchParams.get("search");
  
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log(page);
    if(location.search.includes('search') ===false){
      navigate(`/employee?page=${page}`);
      dispatch(getEmployee({page}));
    }else{
      navigate(`/employee?search=${searchValue}?page=${page}`);
      dispatch(getEmployee({page:page, query: searchValue})); 
    }
  };
  return (
    <div className="flex items-center h-55 gap-2.5">
      <Pagination
        onChange={handleChangePage}
        count={dataEmployee.dataEmployee.last_page}
        // rowsPerPage={rowsPerPage}
        // rowsPerPageOptions={[]}

        shape="rounded"
        showFirstButton
        showLastButton
        onClick={() => handleChangePage}
        renderItem={(item) => (
          <PaginationItem
            slots={{
              first: () => <First />,
              previous: () => <Previous />,
              next: () => <Next />,
              last: () => <Last />,
            }}
            sx={{
              height: "35px",
              width: "48px",
              "&.MuiPaginationItem-root:not(.MuiPaginationItem-firstLast, .MuiPaginationItem-previousNext, .MuiPaginationItem-ellipsis)":
                {
                  backgroundColor: "rgb(241, 243, 245)",
                  color: "rgb(104, 112, 118)",
                },
              "&.MuiPaginationItem-root.Mui-selected": {
                background: "rgb(230, 232, 235)",
                color: "rgb(17, 24, 28)",
                fontWeight: "600",
              },
            }}
            {...item}
          />
        )}
      />
      <div className="h-9 bg-gray2 py-2 px-3 rounded-md text-sm text-gray">
        {dataEmployee.dataEmployee.from} - {dataEmployee.dataEmployee.to} of{" "}
        {dataEmployee.dataEmployee.total}
      </div>
    </div>
  );
};

export default PaginationEmployee;
