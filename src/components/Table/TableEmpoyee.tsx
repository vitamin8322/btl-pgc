import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { dataDeletes, getEmployee } from "../../redux/slice/employeeSlice";
import { Checkbox, Pagination, PaginationItem } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import PaginationEmployee from "./PaginationEmployee";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

const TableEmpoyee = ({}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { dataEmployee } = useSelector((state: RootState) => state.employee);
  const [selected, setSelected] = useState<number[]>([]);
  const navigate = useNavigate();
  // console.log(dataEmployee);

  useEffect(() => {
    const fetchDataEmployee = async () => {
      await dispatch(getEmployee());
    };
    fetchDataEmployee();
  }, []);

  const columns = [
    { field: "NIK", headerName: "NIK", width: 150 },
    { field: "Name", headerName: "Name", width: 200 },
    { field: "Gender", headerName: "Gender", width: 120 },
    { field: "BankCardNo", headerName: "Bank Card No.", width: 200 },
    { field: "BankAccountNo", headerName: "Bank Account No.", width: 200 },
    { field: "FamilyCardNo", headerName: "Family Card No.", width: 200 },
    { field: "MarriageStatus", headerName: "Marriage Status", width: 150 },
    { field: "MotherName", headerName: "Mother Name", width: 200 },
    { field: "Placeofbirth", headerName: "Place of birth", width: 200 },
    { field: "Dateofbirth", headerName: "Date of birth", width: 200 },
    { field: "HomeAddress", headerName: "Home Address", width: 300 },
    {
      field: "NationalCardIDNo",
      headerName: "National Card ID No.",
      width: 200,
    },
    { field: "DateStart", headerName: "Date Start", width: 200 },
    { field: "FirstContract", headerName: "First Contract", width: 200 },
    { field: "SecondContract", headerName: "Second Contract", width: 200 },
    { field: "EndContract", headerName: "End Contract", width: 200 },
    { field: "Department", headerName: "Department", width: 200 },
    { field: "EmployeeType", headerName: "Employee Type", width: 200 },
    { field: "SalaryRp", headerName: "Salary Rp.", width: 200 },
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
    if (currentTime - lastClickTime < 500) {
      // Xử lý logic cho sự kiện onDoubleClick
      console.log("Double click event");
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
      console.log("Single click event");
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

  //pagination
  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    page: number
  ) => {
    console.log(page);
    dispatch(getEmployee(page));
  };

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
      {/* <StyledScrollbar autoHide={false}> */}
      <TableContainer className="w-full max-w-1170  min-h-600 h-600 ">
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
          <TableBody>
            {dataEmployee.data.map((row, index) => {
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
                  <TableCellCustom width={300}>{row.staff_id}</TableCellCustom>
                  <TableCellCustom>{row.name}</TableCellCustom>
                  <TableCellCustom>{row.gender}</TableCellCustom>
                  <TableCellCustom>{row.card_number}</TableCellCustom>
                  <TableCellCustom>{row.bank_account_no}</TableCellCustom>
                  <TableCellCustom>{row.family_card_number}</TableCellCustom>
                  <TableCellCustom>{row.marriage_code}</TableCellCustom>
                  <TableCellCustom>{row.mother_name}</TableCellCustom>
                  <TableCellCustom>{row.pob}</TableCellCustom>
                  <TableCellCustom>{row.dob}</TableCellCustom>
                  <TableCellCustom>{row.home_address_1}</TableCellCustom>
                  <TableCellCustom>{row.nc_id}</TableCellCustom>
                  <TableCellCustom>{row.contract_start_date}</TableCellCustom>
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
          </TableBody>
        </Table>
      </TableContainer>
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
