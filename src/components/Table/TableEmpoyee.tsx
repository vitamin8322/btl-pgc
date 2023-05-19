import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { dataDeletes, getEmployee, getIdEmployee } from "../../redux/slice/employeeSlice";
import { Checkbox, Pagination, PaginationItem } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import PaginationEmployee from "./PaginationEmployee";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import ActionTable from "./ActionTable";
import "./Table.scss";
import CircularProgress from "@mui/material/CircularProgress";
import { ReactComponent as NoData } from "../../assets/image/NoData.svg";

const TableEmpoyee = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { dataEmployee, status } = useSelector(
    (state: RootState) => state.employee
  );
  const [selected, setSelected] = useState<number[]>([]);
  
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search.split("?")[1]);

  const searchValue = searchParams.get("search");
  const pageValue = Number(searchParams.get("page"));

  // useEffect(() => {
  //   if (searchParams != null && pageValue != null) {
  //     dispatch(getEmployee({ page: pageValue, query: searchValue }));
  //   } else if (pageValue != null) {
  //     dispatch(getEmployee({ page: pageValue }));
  //   } else if (searchParams != null) {
  //     dispatch(getEmployee({ query: searchValue }));
  //   }else{
  //     dispatch(getEmployee({}));
  //   }
  // }, []);

  useEffect(() => {
    const queryParams = {
      page: pageValue,
      query: searchValue,
    };

    dispatch(getEmployee(queryParams));
  }, []);

  const columns = [
    { field: "NIK", headerName: "NIK", width: 95 },
    { field: "Name", headerName: "Name", width: 150 },
    { field: "Gender", headerName: "Gender", width: 70 },
    { field: "BankCardNo", headerName: "Bank Card No.", width: 130 },
    { field: "BankAccountNo", headerName: "Bank Account No.", width: 150 },
    { field: "FamilyCardNo", headerName: "Family Card No.", width: 150 },
    { field: "MarriageStatus", headerName: "Marriage Status", width: 130 },
    { field: "MotherName", headerName: "Mother Name", width: 150 },
    { field: "Placeofbirth", headerName: "Place of birth", width: 115 },
    { field: "Dateofbirth", headerName: "Date of birth", width: 115 },
    { field: "HomeAddress", headerName: "Home Address", width: 700 },
    {
      field: "NationalCardIDNo",
      headerName: "National Card ID No.",
      width: 170,
    },
    { field: "DateStart", headerName: "Date Start", width: 90 },
    { field: "FirstContract", headerName: "First Contract", width: 110 },
    { field: "SecondContract", headerName: "Second Contract", width: 130 },
    { field: "EndContract", headerName: "End Contract", width: 110 },
    { field: "Department", headerName: "Department", width: 150 },
    { field: "EmployeeType", headerName: "Employee Type", width: 120 },
    { field: "SalaryRp", headerName: "Salary Rp.", width: 90 },
    { field: "Position", headerName: "Position", width: 150 },
    { field: "OTPaid", headerName: "O/T Paid", width: 80 },
    { field: "Mealpaid", headerName: "Meal paid", width: 90 },
    { field: "MealRp", headerName: "Meal Rp.", width: 80 },
    { field: "Grading", headerName: "Grading", width: 83 },
  ];
  const [lastClickTime, setLastClickTime] = useState(0);

  // checkbox
  const isSelected = (id: number) => selected.indexOf(id) !== -1;
  const handleClick = (event: React.MouseEvent, id: number) => {
    const currentTime = new Date().getTime();
    console.log(id);
    
    if (currentTime - lastClickTime < 300) {
      // Xử lý logic cho sự kiện onDoubleClick
      // console.log("Double click event");
      dispatch(getIdEmployee(id))
      navigate(`/employee/create-or-update/${id}`);
    } else {
      // Xử lý logic cho sự kiện onClick
      const selectedIndex = selected.indexOf(id);
      let newSelected: number[] = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
      dispatch(dataDeletes(newSelected));
      // console.log("Single click event");
      setLastClickTime(currentTime);
    }
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = dataEmployee.data.map((n) => n.id);
      setSelected(newSelected);
      dispatch(dataDeletes(newSelected));
      return;
    }
    setSelected([]);
    dispatch(dataDeletes([]));
  };

  // console.log('selected', selected);
  //custom tablecell

  const TableCellCustom = styled(TableCell)(({}) => ({
    // backgroundColor: "rgb(248, 249, 250)",
    border: "1px solid white",
    color: "rgb(104, 112, 118)",
    fontSize: "12px",
    padding: "0 10px",

    // "&.MuiTableCell-root":{
    // color:'transparent'
    // }
  }));

  const CustomTableRow = styled(TableRow)(({ theme, selected }) => ({
    cursor: "pointer",
    backgroundColor: selected
      ? "rgb(237 246 255) !important"
      : "rgb(248, 249, 250)",

    color: selected ? "black !important" : "red !important",
    "&:hover": {
      backgroundColor: "rgb(248, 249, 250)",
    },
    "&.MuiTableCell-root": {
      color: "transparent",
    },
  }));

  return (
    <div>
      <ActionTable
        dataDelete={selected}
        setSelected={setSelected}
        lastPage={dataEmployee.last_page}
        lengthData={dataEmployee.data.length}
      />
      <hr
        style={{
          margin: "10px 0",
          flexShrink: "0",
          borderWidth: "0px 0px thin",
          borderStyle: "solid",
          borderColor: "rgba(193, 200, 205, 0.24)",
        }}
      />
      <div className="relative">
        <TableContainer className="w-full max-w-1170  h-525 ">
          <Table stickyHeader size="small" aria-label="sticky table">
            <TableHead sx={{ height: "30px" }}>
              <TableRow>
                <TableCell
                  sx={{
                    borderTopLeftRadius: "8px",
                    backgroundColor: "rgb(236, 238, 240) !important",
                    height: "31px",
                    border: "1px solid white",
                  }}
                  padding="checkbox"
                >
                  <Checkbox
                    color="primary"
                    sx={{
                      // color: "rgb(48 164 108)",
                      "&.Mui-checked": {
                        color: "rgb(48 164 108)",
                      },
                      "&.MuiSvgIcon-root": {
                        fill: "rgb(48 164 108)",
                      },
                    }}
                    indeterminate={
                      selected.length > 0 &&
                      selected.length < dataEmployee.data.length
                    }
                    checked={
                      dataEmployee.data.length > 0 &&
                      selected.length === dataEmployee.data.length
                    }
                    onChange={handleSelectAllClick}
                    inputProps={{
                      "aria-label": "select all desserts",
                    }}
                    indeterminateIcon={
                      <IndeterminateCheckBoxIcon
                        sx={{ color: "rgb(48 164 108)" }}
                      />
                    }
                  />
                </TableCell>
                {columns.map((column, index) => (
                  <TableCell
                    sx={{
                      backgroundColor: "rgb(236, 238, 240) !important",
                      padding: "6px 10px",
                      border: "1px solid white",
                      fontWeight: "600",
                      fontSize: "13px",
                      ...(index === columns.length - 1 && {
                        borderTopRightRadius: "8px",
                      }),
                    }}
                    key={index}
                    style={{ minWidth: `${column.width}px` }}
                  >
                    {column.headerName}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="">
              {dataEmployee &&
                dataEmployee.data.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <CustomTableRow
                      hover
                      onClick={(event) => handleClick(event, row.id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{
                        cursor: "pointer",
                      }}
                      onDoubleClick={() => {
                        console.log(row.id);
                        navigate(`/employee/create-or-update/${row.id}`);
                      }}
                    >
                      <TableCellCustom padding="checkbox">
                        <Checkbox
                          color="primary"
                          sx={{
                            borderTopLeftRadius: "8px",
                            "&.Mui-checked": {
                              color: "rgb(48 164 108)",
                            },
                          }}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                        />
                      </TableCellCustom>
                      <TableCellCustom width={300}>
                        {row.staff_id}
                      </TableCellCustom>
                      <TableCellCustom>{row.name}</TableCellCustom>
                      <TableCellCustom>
                        {row.gender ? "Male" : "Female"}
                      </TableCellCustom>
                      <TableCellCustom>{row.card_number}</TableCellCustom>
                      <TableCellCustom>{row.bank_account_no}</TableCellCustom>
                      <TableCellCustom>
                        {row.family_card_number}
                      </TableCellCustom>
                      <TableCellCustom>{row.marriage_code}</TableCellCustom>
                      <TableCellCustom>{row.mother_name}</TableCellCustom>
                      <TableCellCustom>{row.pob}</TableCellCustom>
                      <TableCellCustom>{row.dob}</TableCellCustom>
                      <TableCellCustom>{row.home_address_1}</TableCellCustom>
                      <TableCellCustom>{row.nc_id}</TableCellCustom>
                      <TableCellCustom>
                        {row.contract_start_date}
                      </TableCellCustom>
                      {row?.contracts.length > 0 ? (
                        <TableCellCustom>
                          {row.contracts[0].contract_date}
                        </TableCellCustom>
                      ) : (
                        <TableCellCustom></TableCellCustom>
                      )}
                      {row?.contracts.length > 1 ? (
                        <TableCellCustom>
                          {row.contracts[1].contract_date}
                        </TableCellCustom>
                      ) : (
                        <TableCellCustom></TableCellCustom>
                      )}
                      {row?.contracts.length > 2 ? (
                        <TableCellCustom>??</TableCellCustom>
                      ) : (
                        <TableCellCustom></TableCellCustom>
                      )}
                      <TableCellCustom>{row.department_name}</TableCellCustom>
                      <TableCellCustom>{row.type}</TableCellCustom>
                      <TableCellCustom>{row.basic_salary}</TableCellCustom>
                      <TableCellCustom>{row.position_name}</TableCellCustom>
                      <TableCellCustom>???</TableCellCustom>
                      <TableCellCustom>???</TableCellCustom>
                      <TableCellCustom>{row.meal_allowance}</TableCellCustom>
                      <TableCellCustom>{row.grade_name}</TableCellCustom>
                    </CustomTableRow>
                  );
                })}

              {status != "loading" && dataEmployee.data.length === 0 && (
                <div className="absolute flex flex-col inset-0 justify-center items-center">
                  <NoData />
                  <div className="mt-30 font-normal leading-5 text-base text-center">
                    No Data
                  </div>
                  <div className="mt-5 leading-6 text-base tracking-tighter font-sans font-normal text-center text-gray-500">
                    Your record will be synced here once it ready
                  </div>
                </div>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {status == "loading" && (
          <div className="absolute inset-0 flex h-full bg-loading">
            <CircularProgress size={32} sx={{ margin: "auto" }} />
          </div>
        )}
      </div>
      {/* </StyledScrollbar> */}
      <hr
        style={{
          marginTop: "10px",
          flexShrink: "0",
          borderWidth: "0px 0px thin",
          borderStyle: "solid",
          borderColor: "rgba(193, 200, 205, 0.24)",
        }}
      />
      <PaginationEmployee dataEmployee={dataEmployee} />
    </div>
  );
};

export default TableEmpoyee;
