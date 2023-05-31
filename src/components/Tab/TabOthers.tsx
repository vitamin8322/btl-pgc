import React, { ChangeEvent, useCallback } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  changeEmployee,
  getBenefit,
  getGrade,
} from "../../redux/slice/employeeSlice";
import { Employee, IBenefit, IGrade } from "../../models/Employee";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import { styled } from "@mui/material/styles";
import { autocompleteStyles } from "../CustomStyle/StyleAutocomplete";
import SelectMui from "../CustomComponents/SelectMui";
import { ReactComponent as Clear } from "../../assets/image/Clear.svg";
import DocumentUpload from "./ComponentsTab/DocumentUpload";


const CustomTag = styled("div")(({}) => ({
  display: "inline-flex",
  alignItems: "center",
  // backgroundColor: theme.palette.grey[300],
  // borderRadius: theme.shape.borderRadius,
  // padding: theme.spacing(0.5),
  // margin: theme.spacing(0.5),
  "& .MuiSvgIcon-root": {
    // fontSize: theme.typography.pxToRem(14),
    // marginLeft: theme.spacing(0.5),
    cursor: "pointer",
  },
}));

const TextAreaStyle = styled("textarea")(({ theme }) => ({
  width: "100%",
  flexGrow: 1,
  boxSizing: "border-box",
  // height:'48px',
  borderRadius: 8,
  minWidth: 308,
  maxWidth: 308,
  backgroundColor: "#f1f3f5",
  resize: "none",
  marginBottom: "8px",
  padding: 16,
  "&:hover": {
    border: `#f1f3f5`,
  },
  "&:focus": {
    border: `none`,
    outline: "none",
  },
}));

type PropsTagOther = {
  employee: Employee;
};

const TagOthers = (props: PropsTagOther) => {
  //redux
  const dispatch = useDispatch<AppDispatch>();
  const { dataGrade, dataBenefit } = useSelector(
    (state: RootState) => state.employee
  );
  const { employee } = props;

  // useEffect(() => {
  //   const fetchData = async () => {
  //   };
  //   fetchData();
  // }, []);

  const [selectedOption, setSelectedOption] = useState<IBenefit[] | undefined>(
    undefined
  );
  const [selectedGradeIndex, setSelectedGradeIndex] = useState(
    dataGrade.findIndex((item) => item.id === employee.grade_id)
  );
  // console.log(selectedGradeIndex);

  const handleOptionChange = (event: React.SyntheticEvent, newValue: IBenefit[] | null) => {
    setSelectedOption(newValue ?? undefined);
    if (newValue) {
      const idArray = newValue.map((item) => item.id);
      console.log(idArray);
      dispatch(changeEmployee({ name1: "benefits", value: idArray }));
    }
  };

  const hanleChangeRemark = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      const { name } = e.target;
      let value: string | number | null | IGrade | number[];
      value = e.target.value;
      dispatch(changeEmployee({ name1: name, value }));
    },
    []
  );

  // useEffect(() => {
  //   const idArray = employee.grade.map((item) => item.id);

  //   defaultValue = dataBenefit.filter((item) =>  employee.benefits.map((item) => item.id).includes(item.id));
  // }, [])
  console.log(employee.benefits);
  
  return (
    <div className="flex gap-1 flex-col">
      <div className="flex items-center h-auto">
        <div className="font-normal min-w-175 flex">Grade</div>
        <div>
          <Autocomplete
            disablePortal
            options={dataGrade}
            getOptionLabel={(option) => {
              return option.name;
            }}
            defaultValue={
              dataGrade.find((item) => item.id === employee.grade_id) || null
            }
            sx={autocompleteStyles}
            renderInput={(params) => <TextField {...params} autoFocus />}
            onChange={(event, value) => {
              if (value) {
                dispatch(changeEmployee({ name1: "grade", value }));
                dispatch(
                  changeEmployee({ name1: "grade_id", value: value.id })
                );
                const selectedIndex = dataGrade.findIndex(
                  (item) => item.name === value.name
                );
                setSelectedGradeIndex(selectedIndex);
              } else {
                setSelectedGradeIndex(-1);
                dispatch(changeEmployee({ name1: "grade_id", value: null }));
              }
            }}
          />
        </div>
      </div>
      <div className="flex items-center h-auto">
        <div className="font-normal min-w-175 flex"></div>
        <div className="flex w-308 flex-wrap text-sm">
          {selectedGradeIndex > -1 &&
            dataGrade[selectedGradeIndex].benefits.map((benefits, id) => (
              <div className="text-gray mx-1 bg-gray3 px-2 rounded-md mb-1 h-6 flex items-center">
                {benefits.name}
              </div>
            ))}
        </div>
      </div>
      <div className="flex items-center h-auto">
        <div className="font-normal min-w-175 flex">Benefit</div>
        <Autocomplete
          multiple
          id="tags-standard"
          options={dataBenefit}
          getOptionLabel={(option) => option.name}
          value={selectedOption ?? undefined}
          onChange={handleOptionChange}
          disableCloseOnSelect
          sx={autocompleteStyles}
          defaultValue={dataBenefit.filter((item) => employee.benefits.includes(item.id as any))}

          clearIcon={<Clear />}
          // renderTags={(value, getTagProps) => {
          //   return (
          //     value &&
          //     value.map((option, index) => (
          //       <CustomTag {...getTagProps({ index })}>
          //         {option.name}
          //         <AccessibilityNewIcon onClick={() => handleDelete(option)} />
          //       </CustomTag>
          //     ))
          //   );
          // }}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{
                maxHeight: "150px",
                overflowY: "auto",
                overflowX: "hidden",
                marginTop: "5px",
              }}
              autoFocus
            />
          )}
        />
      </div>
      <div className="flex items-center ">
        <div className="font-normal min-w-175 flex">Remark</div>
        <TextAreaStyle
          value={employee.remark}
          name="remark"
          onChange={hanleChangeRemark}
        />
      </div>
      <div>
        <SelectMui
          disabled
          width={308}
          label="HRM User Account"
          name="HRM"
          data={[]}
        />
      </div>
      <DocumentUpload />
    </div>
  );
};

export default TagOthers;
