import React from "react";
import InputCustom from "../../CustomComponents/InputCustom";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DatePickerCustom from "../../CustomComponents/DatePickerCustom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import { ReactComponent as Delete } from "../../../assets/image/Delete.svg";
import { ReactComponent as Dowload } from "../../../assets/image/Dowload.svg";

type Props = {};

const ContractUploadFile = (props: Props) => {
  const data = [
    {
      id: 130,
      employee_id: 1631,
      contract_date: "2023-05-24",
      name: "123",
      document:
        "https://api-training.hrm.div4.pgtest.co/storage/contracts/1631/2_1684223333.jpg",
      created_at: "2023-05-16T07:48:53.000000Z",
      updated_at: "2023-05-16T07:48:53.000000Z",
      deleted_at: null,
    },
  ];

  const headers = [
    { field: "No", headerName: "No" },
    { field: "ContractName", headerName: "Contract Name" },
    { field: "SignDate", headerName: "Sign Date" },
    { field: "Action", headerName: "Action." },
  ];
  //custom tablecell
  const TableCellCustom = styled(TableCell)(({}) => ({
    // backgroundColor: "rgb(248, 249, 250)",
    border: "1px solid white",
    color: "rgb(104, 112, 118)",
    fontSize: "12px",
    padding: "0 10px",

    // "&.MuiTableCell-root": {
    //   display: "flex",
    // },
  }));
  const CustomTableRow = styled(TableRow)(({ theme, selected }) => ({
    cursor: "pointer",
    height:'36px',
    backgroundColor: selected
      ? "rgb(237 246 255) !important"
      : "rgb(248, 249, 250)",

    "&:hover": {
      backgroundColor: "rgb(237, 246, 255) !important",
    },
    "&.MuiTableCell-root": {
      color: "transparent",
    },
  }));

  return (
    <div className="flex flex-col border-solid border-gray2 border rounded-md">
      <span className="bg-gray2 text-gray w-full flex">CONTRACT</span>
      <p className="flex py-2.5 px-5">
        Please upload pdf, png, xlsx, docx file format!
      </p>
      <hr
        style={{
          flexShrink: "0",
          borderWidth: "0px 0px thin",
          borderStyle: "solid",
          borderColor: "rgba(193, 200, 205, 0.24)",
        }}
      />
      <div className="flex w-full gap-5 pt-5 pr-4 pb-7 pl-5 flex-wrap">
        <div className="w-2/6 flex flex-col gap-4">
          <DatePickerCustom size label="Contract Date" name="contract_date" />
          <InputCustom name="" size label="Contract Name" />
          <div className="flex flex-wrap gap-2.5">
            <Button
              variant="contained"
              component="label"
              sx={{
                color: "rgb(0, 145, 255)",
                backgroundColor: "rgb(237, 246, 255)",
                border: "1px dashed",
                boxShadow: "none",
                minWidth: "195px",
                borderRadius: "6px",
                height: "48px",
                textTransform: "none",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: "rgba(0, 145, 255, 0.08)",
                },
              }}
            >
              <FileUploadOutlinedIcon />
              Upload File
              <input type="file" hidden />
            </Button>
            <Button
              variant="contained"
              component="label"
              sx={{
                color: "#fff",
                backgroundColor: "rgb(105, 217, 193)",
                boxShadow: "none",
                minWidth: "195px",
                height: "48px",
                textTransform: "none",
                borderRadius: "6px",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: "rgb(54, 215, 180)",
                },
              }}
            >
              Add
            </Button>
          </div>
        </div>
        <hr
          style={{
            display: "block",
            margin: "0px",
            flexShrink: "0",
            borderWidth: "0px thin 0px 0px",
            borderStyle: "solid",
            borderColor: "rgba(193, 200, 205, 0.24)",
            height: "auto",
            alignSelf: "stretch",
          }}
        />
        <div className="w-62">
          <TableContainer className="w-full h-225 ">
            <Table stickyHeader size="small" aria-label="sticky table">
              <TableHead sx={{ height: "30px" }}>
                <TableRow>
                  {headers &&
                    headers.map((column, index) => (
                      <TableCell
                        sx={{
                          backgroundColor: "rgb(236, 238, 240) !important",
                          padding: "6px 10px",
                          border: "1px solid white",
                          ...(index === headers.length - 1 && {
                            borderTopRightRadius: "8px",
                          }),
                        }}
                        key={index}
                        // style={{ minWidth: `${column.width}px` }}
                      >
                        {column.headerName}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.map((row: any, index: number) => {
                    return (
                      <CustomTableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.id}
                        sx={{
                          cursor: "pointer",
                        }}
                      >
                        <TableCellCustom>{index + 1}</TableCellCustom>
                        <TableCellCustom style={{ minWidth: `50px` }}>
                          {row.name}
                        </TableCellCustom>
                        <TableCellCustom>{row.contract_date}</TableCellCustom>
                        <TableCellCustom>
                          <div className="flex justify-center items-center gap-1">
                            <span>
                              <button className="flex gap-1 hover:bg-greenHover h-6 text-green bg-green2 items-center rounded-md py-2 px-3">
                                <span>1_1684228584.jpg</span>
                                <Dowload />
                              </button>
                            </span>
                              <button className="flex gap-1 hover:bg-requiredHover h-6 text-required bg-red2 items-center rounded-md py-2 px-3">
                                <Delete fill="red" className="m-1" />
                                Delete
                              </button>
                          </div>
                        </TableCellCustom>
                      </CustomTableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </div>
  );
};

export default ContractUploadFile;
