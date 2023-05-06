import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchApi } from "../../hooks/api";
import { EmployeeListResponse } from "../../models/Employee";

interface EmployeeState {
  dataEmployee: EmployeeListResponse;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EmployeeState = {
  dataEmployee: {
    current_page: 0,
    data: [],
    first_page_url: '',
    from: 0,
    last_page: 0,
    last_page_url: '',
    links: {
      url: '' ,
      label: '',
      active: false,
    },
    next_page_url: '' ,
    path: '',
    per_page: 0,
    prev_page_url: '' ,
    to: 0,
    total: 0,
  },
  status: "idle",
  error: null,
};

export const getEmployee = createAsyncThunk("employee/get", async () => {
  const data = await fetchApi("/api/employee", "get");
  return data.data;
});

export const getCompany = createAsyncThunk("auth/company", async () => {
  const data = await fetchApi("/api/company", "get");
  return data.data;
});


const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getEmployee
      .addCase(getEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataEmployee = action.payload;
      })
      .addCase(getEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Có lỗi";
      });
  },
});

export const {} = employeeSlice.actions;

export default employeeSlice.reducer;
