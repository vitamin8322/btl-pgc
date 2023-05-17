import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "../../hooks/api";
import { IContract } from "../../models/Employee";

interface Contract {
  dataContract: IContract[];
}

const initialState: Contract = {
  dataContract: [
    {
      id: -1,
      employee_id: -1,
      contract_date: "",
      name: "",
      document: "",
      created_at: "",
      updated_at: "",
      deleted_at: "",
    },
  ],
};

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {},
});

export const {} = contractSlice.actions;

export default contractSlice.reducer;
