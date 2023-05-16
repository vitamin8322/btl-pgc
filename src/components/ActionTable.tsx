import React from "react";
import { Link } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import { deleteEmployee, getEmployee } from "../redux/slice/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import ButtonCustom from "./CustomComponents/ButtonCustom";
import { ReactComponent as Add } from "../assets/image/Add.svg";
import { ReactComponent as Delete } from "../assets/image/Delete.svg";
// import SvgIcon from "@material-ui/core/SvgIcon";

type Props = {};

const ActionTable = (props: Props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { dataDelete } = useSelector((state: RootState) => state.employee);
  // console.log(dataDelete);

  return (
    <div className="flex justify-between items-center">
      <div className=""></div>
      <div className="h-9 flex gap-1">
        <Link to="/employee/create-or-update">
          <ButtonCustom
            name="Add"
            backgroundColor="rgb(237, 246, 255)"
            color="rgb(0, 145, 255)"
            backgroundColorHover="rgba(0, 145, 255, 0.08)"
            icon={<Add fill="rgb(0, 145, 255)" />}
          ></ButtonCustom>
        </Link>
        <div>
          <ButtonCustom
            name="Delete"
            backgroundColor={
              dataDelete.length > 0
                ? "rgb(255, 239, 239)"
                : "rgb(241, 243, 245)"
            }
            color={
              dataDelete.length > 0 ? "rgb(229, 72, 77)" : "rgb(193, 200, 205)"
            }
            backgroundColorHover={
              dataDelete.length > 0
                ? "rgba(229, 72, 77, 0.08)"
                : "rgb(241, 243, 245)"
            }
            icon={
              <Delete
                fill={
                  dataDelete.length > 0
                    ? "rgb(229, 72, 77)"
                    : "rgb(193, 200, 205)"
                }
              />
            }
            onClick={() => {
              dispatch(deleteEmployee());
              dispatch(getEmployee());
            }}
          ></ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default ActionTable;
