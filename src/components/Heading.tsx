import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../redux/store";
import {
  addEmployee,
  editEmployee,
  getEmployee,
} from "../redux/slice/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import useDebounce from "../hooks/useDebounce";
import { addDataContract, addDataToForm } from "../redux/slice/contractSlice";
import { addDataDocument } from "../redux/slice/documentSlice";

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

  const [query, setQuery] = useState<string | null>(searchValue);
  const debouncedValue = useDebounce<string | null>(query, 500);
  const { employee, status } = useSelector(
    (state: RootState) => state.employee
  );
  const { dataFormContract, dataContract } = useSelector(
    (state: RootState) => state.contract
  );
  const { dataFormDocument } = useSelector(
    (state: RootState) => state.document
  );
  const handleChangeQuery = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

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
  const id = employee?.id


  useEffect(() => {
    if (status === "succeeded1") {
      console.log(1231232,id);
      dispatch(
        addDataToForm({
          employee_id: String(id),
          documents: [],
          names: [''],
          contract_dates: [''
            // moment(formContract.date).format("YYYY-MM-DD"),
            // file.date
          ],
          modified_contracts: [],
        })
      );
      console.log(dataFormContract);
      
      if (id !== 0) {
        dispatch(addDataContract(dataFormContract));
      }
      if (id !== 0) {
        dispatch(addDataDocument(dataFormDocument));
      }
    }
  }, [status, employee]);
  
  const rightHeading = () => {
    if (crumbs.length == 2) {
      return (
        <FormControl>
          <OutlinedInput
            className="h-40 w-200 !rounded-lg"
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
        <button
          onClick={async () => {
            await dispatch(addEmployee());
            // if (status === "succeeded") {
            //   console.log('ád', employee);
            //   console.log(1231232,id);
            //   if (id !== 0) {
            //     dispatch(addDataContract(dataFormContract));
            //   }
            //   if (id !== 0) {
            //     dispatch(addDataDocument(dataFormDocument));
            //   }
            // }
          }}
        >
          Add
        </button>
      ) : (
        <button
          onClick={() => {
            if (dataFormContract.employee_id !== "") {
              dispatch(addDataContract(dataFormContract));
            }
            if (dataFormDocument.employee_id !== "") {
              dispatch(addDataDocument(dataFormDocument));
            }
            dispatch(editEmployee(Number(idEmployee)));
          }}
        >
          Save Change
        </button>
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
