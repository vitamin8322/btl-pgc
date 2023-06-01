import React, { ChangeEvent, useEffect } from "react";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import moment from "moment";
import { ReactComponent as Dowload } from "../../../assets/image/Dowload.svg";
import { ReactComponent as Delete } from "../../../assets/image/Delete.svg";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  addDataTableDocument,
  addordelDataToDocument,
  mountDataDocument,
  removeDataDocument,
  removeDataFormDocument,
} from "../../../redux/slice/documentSlice";
import { useParams } from "react-router-dom";
import { removeDataFormConTtract } from "../../../redux/slice/contractSlice";

type Props = {};

const DocumentUpload = (props: Props) => {
  const headers = [
    { field: "No", headerName: "No" },
    { field: "123", headerName: "Contract Name" },
    { field: "SignDate", headerName: "Sign Date" },
    { field: "Action", headerName: "Action." },
  ];
  const { idEmployee } = useParams();

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
  const TableCellCustom = styled(TableCell)(({}) => ({
    border: "1px solid white",
    color: "rgb(104, 112, 118)",
    fontSize: "12px",
    padding: "0 10px",
  }));

  const dispatch = useDispatch<AppDispatch>();
  const { employee } = useSelector((state: RootState) => state.employee);
  const { dataDocument, dataFormDocument } = useSelector(
    (state: RootState) => state.document
  );

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      dispatch(
        addordelDataToDocument({
          employee_id: idEmployee || "0",
          documents: [selectedFile],
        })
      );
      dispatch(
        addDataTableDocument({
          id: Number(idEmployee),
          employee_id: -1,
          created_at: moment(selectedFile.lastModified).format("YYYY-MM-DD"),
          document: selectedFile.name,
          updated_at: "",
        })
      );
      console.log(dataDocument);
      
    }
  };

  // useEffect(() => {
  //   dispatch(mountDataDocument(employee.documents));
  // },[])

  // console.log(dataDocument);

  const handleDeleteFileDocument = (
    updated_at: string,
    index: number,
    id: number
  ) => {
    dispatch(removeDataDocument(index));
    dispatch(removeDataFormDocument(index));
    console.log(index);
    
    if (updated_at !== "") {
      dispatch(
        addordelDataToDocument({
          employee_id: idEmployee || "0",
          deleted_ids: [id],
        })
      );
    }
  };

  return (
    <div className="flex flex-col border-solid border-gray2 border rounded-md">
      <div className="max-w-400 flex justify-between items-center  h-16 pl-5">
        <div>Document</div>
        <Button
          variant="contained"
          component="label"
          sx={{
            color: "rgb(0, 145, 255)",
            backgroundColor: "rgb(237, 246, 255)",
            border: "1px dashed",
            boxShadow: "none",
            minWidth: "98",
            borderRadius: "6px",
            height: "32px",
            textTransform: "none",
            "&:hover": {
              boxShadow: "none",
              backgroundColor: "rgba(0, 145, 255, 0.08)",
            },
          }}
        >
          <FileUploadOutlinedIcon />
          Upload
          <input type="file" hidden onChange={handleUploadFile} />
        </Button>
      </div>
      <div className="px-5 w-full">
        <TableContainer className="w-full max-w-1170 h-225 table__custom">
          <Table aria-label="sticky table" className="!w-1085">
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
              {dataDocument &&
                dataDocument.map((row: any, index: number) => {
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
                        {row.document.split("/").pop()}
                      </TableCellCustom>
                      <TableCellCustom>
                        {moment(row.create_at).format("YYYY-MM-DD")}
                      </TableCellCustom>
                      <TableCellCustom>
                        <div className="flex justify-center items-center gap-1">
                          <span className="w-10">
                            {row.updated_at != "" && (
                              <button className="flex gap-1 hover:bg-greenHover h-6  text-green bg-green2 items-center rounded-md py-2 px-3">
                                <Dowload />
                              </button>
                            )}
                          </span>
                          <button
                            onClick={() =>
                              handleDeleteFileDocument(
                                row.updated_at,
                                index,
                                row.id
                              )
                            }
                            className="flex gap-1 hover:bg-requiredHover h-6 text-required bg-red2 items-center rounded-md py-2 px-3"
                          >
                            <Delete fill="red" className="m-1" />
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
  );
};

export default DocumentUpload;
