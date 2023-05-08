import {
  FormControl,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useParams } from "react-router-dom";

type PropsHeading = {
  crumbs: string[];
};

const Heading = (props: PropsHeading) => {
  const { crumbs } = props;
  const { idEmployee } = useParams();

  const rightHeading = () => {
    if (crumbs.length == 2) {
      return (
        <FormControl>
          <OutlinedInput
            className="h-40 w-200 !rounded-lg"
            placeholder="Search..."
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
          />
        </FormControl>
      );
    } else if (crumbs.length > 2) {
      return idEmployee ? <button>Add</button> : <button>Save Edit</button>;
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
