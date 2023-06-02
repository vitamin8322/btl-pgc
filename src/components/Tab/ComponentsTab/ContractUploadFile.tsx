import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
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
import { ReactComponent as Delete } from "@/assets/image/Delete.svg";
import { ReactComponent as Dowload } from "@/assets/image/Dowload.svg";
import { ReactComponent as Clear } from "@/assets/image/Clear.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  addDataContract,
  addDataTableContract,
  addDataToForm,
  mountDataContract,
  removeDataContract,
  removeDataFormConTtract,
} from "@/redux/slice/contractSlice";
import moment from "moment";
import { useLocation, useParams } from "react-router-dom";
import TextFieldCustom from "../../CustomComponents/TextFieldCustom";
import { IContract } from "@/models/employee";

type Props = {};

const ContractUploadFile = (props: Props) => {
  //custom tablecell
  const TableCellCustom = styled(TableCell)(({}) => ({
    border: "1px solid white",
    color: "rgb(104, 112, 118)",
    fontSize: "12px",
    padding: "0 10px",
  }));
  const CustomTableRow = styled(TableRow)(({ theme, selected }) => ({
    cursor: "pointer",
    height: "36px",
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
  const dispatch = useDispatch<AppDispatch>();
  const { employee } = useSelector((state: RootState) => state.employee);
  const { dataFormContract, dataContract } = useSelector(
    (state: RootState) => state.contract
  );

  const { idEmployee } = useParams();

  useEffect(() => {
    // dispatch(mountDataContract(employee.contracts));
  }, []);
  // console.log(dataContract);

  const headers = [
    { field: "No", headerName: "No" },
    { field: "ContractName", headerName: "Contract Name" },
    { field: "SignDate", headerName: "Sign Date" },
    { field: "Action", headerName: "Action." },
  ];
  const [file, setFile] = useState<File | null>(null);
  const [formContract, setFormContract] = useState({ date: "", name: "" });

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    setFile(selectedFile || null);
  };
  const handleClearFile = () => {
    setFile(null)
  }
  const changeContractName = (e: ChangeEvent<HTMLInputElement>) => {
    setFormContract((prevValues) => ({ ...prevValues, name: e.target.value }));
  };

  const handleChangeDate = (
    date: Date,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    // console.log(123, date);
    setFormContract((prevValues) => ({ ...prevValues, date: String(date) }));
  };

  const handleDataContract = () => {
    if (file !== null && formContract.date!=='' && formContract.name !=='') {
      dispatch(
        addDataToForm({
          documents: [file],
          names: [formContract.name],
          contract_dates: [
            moment(formContract.date).format("YYYY-MM-DD"),
            // file.date
          ],
          modified_contracts: [],
        })
      );
      dispatch(
        addDataTableContract({
          id: file.lastModified,
          employee_id: -1,
          contract_date: formContract.date,
          name: formContract.name,
          document: "",
          created_at: "",
          updated_at: "",
          deleted_at: "",
        })
      );
      setFormContract({ date: "", name: "" });
      setFile(null)
    }
  };

  const handleDeleteFileContract = (
    document: string,
    index: number,
  ) => {
    if (document === "") {
      dispatch(removeDataContract(index));
      dispatch(removeDataFormConTtract(index));
    }
  };


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
          <DatePickerCustom
            size
            label="Contract Date"
            name="contract_date"
            onChange={handleChangeDate}
            value={formContract.date}
            setValueDate={setFormContract}
          />
          <TextFieldCustom
            value={formContract.name}
            name=""
            isRequired={true}
            onChange={changeContractName}
            label="Name"
            width={128}
            length={50}
          />
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
              <input type="file" accept="image/*,.pdf,.csv,.xlsx,.docx" hidden onChange={handleUploadFile} />
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
              onClick={handleDataContract}
            >
              Add
            </Button>
          </div>
          {file && (
            <div className="flex min-w-175 justify-between items-center max-w py-1 px-3 bg-gray2">
              <p>{file.name}</p>
              <button onClick={handleClearFile}>
                <Clear />
              </button>
            </div>
          )}
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
          <TableContainer className="w-full h-225 table__custom">
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
                        }}
                        key={index}
                      >
                        {column.headerName}
                      </TableCell>
                    ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {dataContract &&
                  dataContract[0]?.id !== -1 &&
                  dataContract.map((row: IContract, index: number) => {
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
                        <TableCellCustom>
                          {moment(row.contract_date).format("YYYY-MM-DD")}
                        </TableCellCustom>
                        <TableCellCustom>
                          <div className="flex justify-center items-center gap-1">
                            <span className="w-32">
                              {row.document !== "" && (
                                <button className="flex gap-1 hover:bg-greenHover h-6  text-green bg-green2 items-center rounded-md py-2 px-3">
                                  <span className="text-ellipsis overflow-hidden whitespace-nowrap w-20">
                                    {/* {row.document} */}
                                    {row.document.split("/").pop()}
                                  </span>
                                  <Dowload />
                                </button>
                              )}
                            </span>
                            <button
                              onClick={() =>
                                handleDeleteFileContract(
                                  row.document,
                                  index,
                                )
                              }
                              className="flex gap-1 hover:bg-requiredHover h-6 text-required bg-red2 items-center rounded-md py-2 px-3"
                            >
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
