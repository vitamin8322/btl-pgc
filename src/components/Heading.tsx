import {
  CircularProgress,
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "@/redux/store";
import {
  addEmployee,
  editEmployee,
  getEmployee,
} from "@/redux/slice/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "@/hooks/useDebounce";
import { addDataContract, addDataToForm } from "@/redux/slice/contractSlice";
import { addDataDocument } from "@/redux/slice/documentSlice";
import { NotistackCustom } from "./CustomComponents/NotistackCustom";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button/Button";
type PropsHeading = {
  crumbs: string[];
};

const Heading = (props: PropsHeading) => {
  const dispatch = useDispatch<AppDispatch>();
  const { crumbs } = props;
  const { idEmployee } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search.split("?")[1]);
  const searchValue = searchParams.get("search");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [query, setQuery] = useState<string | null>(searchValue);
  const debouncedValue = useDebounce<string | null>(query, 500);
  const { employee, status, checkValidationEmplyee, checkValidationContract } =
    useSelector((state: RootState) => state.employee);
  const { dataFormContract, dataContract } = useSelector(
    (state: RootState) => state.contract
  );
  const { dataFormDocument } = useSelector(
    (state: RootState) => state.document
  );

  const handleChangeQuery = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }, []);

  useEffect(() => {
    if (debouncedValue && !debouncedValue.trim()) {
      setQuery("");
      return;
    }
    if (query !== null) {
      dispatch(getEmployee({ page: 1, query: query }));
      navigate(`/employee?search=${query}&page=${1}`);
    }
  }, [debouncedValue]);
  const id = employee?.id;

  // useEffect(() => {
  //   if (status === "succeededAdd") {
  //     if (employee?.id !== 0 && dataFormContract.documents.length > 0) {
  //       dispatch(
  //         addDataContract({ id: String(id), formData: dataFormContract })
  //       );
  //     }
  //   }
  // }, [status, employee, dataFormContract, dataFormDocument]);

  const hanldeAdd = async () => {
    await dispatch(addEmployee());
    if (dataFormDocument.documents && dataFormDocument.documents.length > 0) {
      dispatch(addDataDocument({ formData: dataFormDocument }));
    }
    if (dataFormContract.documents.length > 0) {
      dispatch(addDataContract({ formData: dataFormContract }));
    }
    await navigate(`/employee`);
    NotistackCustom("success", "Record added", closeSnackbar);
  };

  const handleEdit = async () => {
    if (dataFormContract.documents.length > 0) {
      dispatch(addDataContract({ formData: dataFormContract }));
    }
    if (
      (dataFormDocument.documents && dataFormDocument.documents.length > 0) ||
      (dataFormDocument.deleted_ids && dataFormDocument.deleted_ids.length > 0)
    ) {
      dispatch(addDataDocument({ formData: dataFormDocument }));
    }
    await dispatch(editEmployee(Number(idEmployee)));
    await navigate(`/employee`);
    NotistackCustom("success", "Change saved", closeSnackbar);
  };

  const rightHeading = () => {
    if (crumbs.length === 2) {
      return (
        <FormControl>
          <OutlinedInput
            className="h-40 w-200 !rounded-lg "
            value={query}
            placeholder="Search..."
            onChange={handleChangeQuery}
            sx={{
              backgroundColor: "#fff",
            }}
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      );
    } else if (crumbs.length > 2) {
      return !idEmployee ? (
        status !== "loading" ? (
          <>
            <Button
              onClick={() => hanldeAdd()}
              className={`!bg-blue1 !text-white !px-6 !py-2 !h-12 !rounded-md !normal-case ${
                checkValidationContract ||
                checkValidationEmplyee ||
                employee?.type === null
                  ? "disabled__button"
                  : ""
              }`}
              disabled={
                checkValidationContract ||
                checkValidationEmplyee ||
                employee?.type === null
              }
            >
              Add
            </Button>
          </>
        ) : (
          <>
            <Button disabled className="!bg-loading !px-6 !py-2 !h-12 !rounded">
              <CircularProgress size={16} className="!text-iconLoading" />
            </Button>
          </>
        )
      ) : status !== "loading" ? (
        <Button
          onClick={handleEdit}
          className={`!bg-blue1 !text-white !px-6 !py-2 !h-12 !rounded-md !normal-case ${
            checkValidationContract ||
            checkValidationEmplyee ||
            employee?.type === null
              ? "disabled__button"
              : ""
          }`}
          disabled={
            checkValidationContract ||
            checkValidationEmplyee ||
            employee?.type === null
          }
        >
          Save Change
        </Button>
      ) : (
        <Button disabled className="!bg-loading !px-6 !py-2 !h-12 !rounded">
          <CircularProgress size={16} className="!text-iconLoading" />
        </Button>
      );
    }
  };

  return (
    <div className="flex justify-between mt-2.5 mb-5">
      <div className="text-4xl font-medium">Employee Management</div>
      <div>{rightHeading()}</div>
    </div>
  );
};

export default Heading;
