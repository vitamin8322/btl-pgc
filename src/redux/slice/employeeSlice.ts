import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchApi } from "../../hooks/api";
import {
  IEmployeeListResponse,
  MarriageStatus,
  DepartmentStatus,
  PositionStatus,
  Employee,
} from "../../models/Employee";
import { RootState } from "../store";

interface EmployeeState {
  employee: Employee[];
  employee2: {};
  dataEmployee: IEmployeeListResponse;
  dataMarriage: MarriageStatus[];
  dataDepartment: DepartmentStatus[];
  dataPosition: PositionStatus[];
  dataDelete: number[],
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

interface Value {
  name1: string;
  value: string | number;
}



const initialState: EmployeeState = {
  employee: [
    {
      id: 0,
    old_staff_id: 0,
    staff_id: "",
    department_id: 1,
    company_id: 1,
    manager_id: 1,
    marriage_id: 1,
    position_id: 1,
    mother_name: "",
    pob: "",
    home_address_1: "",
    home_address_2: "",
    mobile_no: "",
    tel_no: "",
    bank_account_no: "",
    bank_name: "",
    card_number: "",
    family_card_number: "",
    health_insurance_no: "",
    safety_insurance_no: "",
    entitle_ot: 1,
    meal_allowance_paid: 1,
    operational_allowance_paid: 1,
    attendance_allowance_paid: 1,
    minimum_salary_used: "",
    shift: "",
    grade_id: 1,
    remark: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
    department_name: "",
    marriage_code: "",
    position_name: "",
    grade_prefix: "",
    grade_name: "",
    manager_name: "",
    contracts: [],
    //ádd

    name: "aaa",
    gender: 1,
    dob: "2023-01-03",
    ktp_no: "123",
    nc_id: "231",
    type: "0",
    basic_salary: 23,
    audit_salary: 123,
    safety_insurance: 123,
    health_insurance: 123,
    meal_allowance: 123,
    contract_start_date: "2023-01-03",
    },
  ],
  employee2: {
    id: 0,
    old_staff_id: 0,
    staff_id: "",
    department_id: 1,
    company_id: 1,
    manager_id: 1,
    marriage_id: 1,
    position_id: 1,
    mother_name: "ádaa",
    pob: "",
    home_address_1: "",
    home_address_2: "",
    mobile_no: "",
    tel_no: "",
    bank_account_no: "",
    bank_name: "",
    card_number: "",
    family_card_number: "",
    health_insurance_no: "",
    safety_insurance_no: "",
    entitle_ot: 1,
    meal_allowance_paid: 1,
    operational_allowance_paid: 1,
    attendance_allowance_paid: 1,
    minimum_salary_used: "",
    shift: "",
    grade_id: 1,
    remark: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
    department_name: "",
    marriage_code: "",
    position_name: "",
    grade_prefix: "",
    grade_name: "",
    manager_name: "",
    //ádd

    name: "aaa",
    gender: 1,
    dob: "2023-01-03",
    ktp_no: "123",
    nc_id: "231",
    type: "0",
    basic_salary: 23,
    audit_salary: 123,
    safety_insurance: 123,
    health_insurance: 123,
    meal_allowance: 123,
    contract_start_date: "2023-01-03",
  },
  dataEmployee: {
    current_page: 0,
    data: [],
    first_page_url: "",
    from: 0,
    last_page: 0,
    last_page_url: "",
    links: {
      url: "",
      label: "",
      active: false,
    },
    next_page_url: "",
    path: "",
    per_page: 0,
    prev_page_url: "",
    to: 0,
    total: 0,
  },
  dataMarriage: [],
  dataDepartment: [],
  dataPosition: [],
  dataDelete: [],
  status: "idle",
  error: null,
};

export const getEmployee = createAsyncThunk(
  "employee/get",
  async (page?: number) => {
    const data = await fetchApi(
      page != undefined ? `/api/employee?page=${page}` : "/api/employee",
      "get"
    );
    return data.data;
  }
);

export const getMarriage = createAsyncThunk("marriage/get", async () => {
  const data = await fetchApi("/api/marriage", "get");
  return data.data;
});

export const getDepartment = createAsyncThunk("department/get", async () => {
  const data = await fetchApi("/api/department", "get");
  return data.data;
});

export const getPosition = createAsyncThunk("position/get", async () => {
  const data = await fetchApi("/api/position", "get");
  return data.data;
});

export const addEmployee = createAsyncThunk(
  "employee/add",
  async (_, { getState }) => {
    const { employee } = getState() as RootState;
    console.log(employee.employee);

    const data = await fetchApi(
      "/api/employee",
      "post",
      // initialState.employee2
      employee.employee[0]
    );
    return data.data;
  }
);


export const deleteEmployee = createAsyncThunk("employee/delete", async (_, { getState }) => {
  const { employee } = getState() as RootState;
  console.log(employee.dataDelete);  
  const body ={
    record_ids: employee.dataDelete
  }

  const data = await fetchApi("/api/employee/multiple-delete", "delete", body);
  return data.data;
});

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    changeEmployee: (state, action: PayloadAction<Value>) => {
      const { name1, value } = action.payload;
      state.employee[0][name1] = value;
      // console.log(state.employee[0].name, value);
    },
    dataDeletes:(state, action: PayloadAction<number[]>) => {
      state.dataDelete = action.payload
    } 
  },
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
      })
      // getDeparment
      .addCase(getDepartment.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getDepartment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataDepartment = action.payload;
      })
      .addCase(getDepartment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Có lỗi";
      })
      // getPosition
      .addCase(getPosition.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getPosition.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataPosition = action.payload;
      })
      .addCase(getPosition.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Có lỗi";
      })
      // getMarriage
      .addCase(getMarriage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getMarriage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataMarriage = action.payload;
      })
      .addCase(getMarriage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Có lỗi";
      });
  },
});

export const { changeEmployee, dataDeletes } = employeeSlice.actions;

export default employeeSlice.reducer;
