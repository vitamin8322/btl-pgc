import React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { changeEmployee } from "../../redux/slice/employeeSlice";
import "./Custom.scss";
import { ReactComponent as CheckBox } from "../../assets/image/CheckBox.svg";

type PropsCheckBox = {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  value: number;
  name: string;
};

const CheckBoxMui = (props: PropsCheckBox) => {
  const { label, disabled, value, name } = props;
  const dispatch = useDispatch<AppDispatch>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    dispatch(changeEmployee({ name1: name, value: Number(checked) }));
    if (name === "entitle_ot") {
      dispatch(
        changeEmployee({
          name1: "operational_allowance_paid",
          value: Number(!checked),
        })
      );
      dispatch(
        changeEmployee({
          name1: "attendance_allowance_paid",
          value: Number(!checked),
        })
      );
    }
  };
  // const [checked, setChecked] = React.useState(true);

  // const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setChecked(event.target.checked);
  // };

  return (
    <FormControlLabel
      control={
        <Checkbox
          disabled={disabled ? true : false}
          checked={Boolean(value)}
          onChange={handleChange}
          icon={
            <CheckBox
              stroke={"#DFE3E6"}
              fill={disabled ? "#F1F3F5" : "white"}
            />
          }
        />
      }
      label={label}
    />
  );
};

export default CheckBoxMui;
