import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { ChangeEvent, useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../redux/store";
import { addEmployee, getEmployee } from "../redux/slice/employeeSlice";
import { useDispatch } from "react-redux";
import useDebounce from "../hooks/useDebounce";

type PropsHeading = {
  crumbs: string[];
};

const Heading = (props: PropsHeading) => {
  const [query, setQuery] = useState<string | null>(null);
  const debouncedValue = useDebounce<string | null>(query, 500);
  const dispatch = useDispatch<AppDispatch>();
  const { crumbs } = props;
  const { idEmployee } = useParams();
  const navigate = useNavigate();

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
      navigate(`/employee?search=${query}&page=${1}`)
    }
  }, [debouncedValue]);

  const rightHeading = () => {
    if (crumbs.length == 2) {
      return (
        <FormControl>
          <OutlinedInput
            className="h-40 w-200 !rounded-lg"
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
          onClick={() => {
            dispatch(addEmployee());
          }}
        >
          Add
        </button>
      ) : (
        <button>Save Change</button>
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
