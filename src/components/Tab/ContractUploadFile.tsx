import React from "react";
import InputCustom from "../CustomComponents/InputCustom";
import Button from "@mui/material/Button";
import Attendance from "../../assets/image/Attendance.svg";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import DatePickerCustom from "../CustomComponents/DatePickerCustom";

type Props = {};

const ContractUploadFile = (props: Props) => {
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
          <DatePickerCustom size label="Contract Date" name="contract_date"/>
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
                border: "1px dashed",
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
        <div>list</div>
      </div>
    </div>
  );
};

export default ContractUploadFile;
