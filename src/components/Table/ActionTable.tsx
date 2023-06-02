import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteEmployee, getEmployee, reserStatus } from "@/redux/slice/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import ButtonCustom from "../CustomComponents/ButtonCustom";
import { ReactComponent as Add } from "@/assets/image/Add.svg";
import { ReactComponent as Delete } from "@/assets/image/Delete.svg";
import CustomizedDialogs from "../CustomComponents/DialogsCustom";
import {  useSnackbar } from "notistack";
import { NotistackCustom } from "../CustomComponents/NotistackCustom";

type PropsActionTable = {
  dataDelete: number[];
  setSelected: React.Dispatch<React.SetStateAction<number[]>>;
  lastPage: number | undefined;
  lengthData: number;
};

const ActionTable = (props: PropsActionTable) => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { dataDelete, setSelected, lastPage, lengthData } = props;
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { status } = useSelector((state: RootState) => state.employee);

  const searchParams = new URLSearchParams(location.search.split("?")[1]);

  const searchValue = searchParams.get("search");
  const pageValue = Number(searchParams.get("page"));
  const hanleOpenDialog = () => {
    setOpen(true);
  };

  const handleDeleteEmployee = async () => {
    try {
      await dispatch(deleteEmployee(dataDelete));
      await dispatch(reserStatus());
      
      await NotistackCustom('success', 'Success', closeSnackbar)
      const queryParams = {
        page:
          lastPage === pageValue && dataDelete.length === lengthData
            ? pageValue - 1
            : pageValue,
        query: searchValue,
      };
      const searchParamString =
      queryParams.page && queryParams.query
      ? `search=${queryParams.query}&`
      : "";
      const newURL = `/employee?${searchParamString}page=${queryParams.page}`;
      
      navigate(newURL);
      setSelected([]);
      await dispatch(getEmployee(queryParams));
    } catch (error) {}
  };

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
          <CustomizedDialogs
            isOpen={open}
            onClick={handleDeleteEmployee}
            title={"Delete"}
            content="Are you sure you want to delete?"
            loading={status}
            button={
              <ButtonCustom
                name="Delete"
                disabled={dataDelete.length < 1}
                backgroundColor={
                  dataDelete.length > 0
                    ? "rgb(255, 239, 239)"
                    : "rgb(241, 243, 245)"
                }
                color={
                  dataDelete.length > 0
                    ? "rgb(229, 72, 77)"
                    : "rgb(193, 200, 205)"
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
                onClick={hanleOpenDialog}
              ></ButtonCustom>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ActionTable;
