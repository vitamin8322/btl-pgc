import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchApi } from "../../hooks/api";
import {
  IEmployeeListResponse,
  IMarriageStatus,
  IDepartmentStatus,
  IPositionStatus,
  Employee,
  IGrade,
  IBenefit,
} from "../../models/Employee";
import { RootState } from "../store";

interface EmployeeState {
  employee: Employee;
  // employee2: {};
  dataEmployee: IEmployeeListResponse;
  dataMarriage: IMarriageStatus[];
  dataDepartment: IDepartmentStatus[];
  dataPosition: IPositionStatus[];
  dataDelete: number[];
  dataGrade: IGrade[];
  dataBenefit: IBenefit[];
  status: "idle" | "loading" | "succeeded1" |"succeeded" | "failed";
  error: string | null;
}

interface Value {
  name1: string;
  value: string | number | null | IGrade | number[];
}

const initialState: EmployeeState = {
  employee: {
    id: 0,
    old_staff_id: 0,
    staff_id: "",
    department_id: null,
    company_id: null,
    manager_id: null,
    marriage:[],
    marriage_id: null,
    position_id: null,
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
    entitle_ot: 0,
    meal_allowance_paid: 0,
    operational_allowance_paid: 1,
    attendance_allowance_paid: 1,
    minimum_salary_used: "",
    shift: "",
    grade_id: null,
    remark: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
    department_name: "",
    position_name: "",
    grade_prefix: "",
    grade_name: "",
    manager_name: "",
    contracts: [],
    documents:[],
    grade:[],
    benefits:[],

    //ádd
    name: "",
    gender: '',
    dob: "",
    ktp_no: "",
    nc_id: "",
    type: null,
    basic_salary: 0,
    audit_salary: 0,
    safety_insurance: 0,
    health_insurance: 0,
    meal_allowance: 0,
    contract_start_date: "",

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
  dataGrade: [],
  dataBenefit: [],
  dataMarriage: [],
  dataDepartment: [],
  dataPosition: [],
  dataDelete: [],
  status: "idle",
  error: null,
};

export const getEmployee = createAsyncThunk(
  "employee/get",
  async ({ page, query }: { page?: number; query?: string | null }) => {
    const searchParam =
      query !== null && query !== undefined ? `search=${query}&` : "";
    const pageParam = page !== undefined && page !== 0 ? `page=${page}` : "";
    // console.log(123, pageParam);

    const url = `/api/employee?${searchParam}${pageParam}`;
    const data = await fetchApi(url, "get");
    return data.data;
  }
);

export const getIdEmployee = createAsyncThunk(
  "employeeId/get",
  async (id: number) => {
    const url = `/api/employee/${id}`;
    const data = await fetchApi(url, "get");
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

export const getGrade = createAsyncThunk("grade/get", async () => {
  const data = await fetchApi("/api/grade", "get");
  return data.data;
});
export const getBenefit = createAsyncThunk("benefit/get", async () => {
  const data = await fetchApi("/api/benefit", "get");
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
      employee.employee
    );
    return data.data;
  }
);

export const editEmployee = createAsyncThunk(
  "employee/edit",
  async (id: number, { getState }) => {
    const { employee } = getState() as RootState;
    console.log(employee.employee);

    const data = await fetchApi(
      `/api/employee/${id}`,
      "put",
      employee.employee
    );
    return data.data;
  }
);

export const deleteEmployee = createAsyncThunk(
  "employee/delete",
  async (dataDelete: number[]) => {
    console.log(dataDelete);
    const body = {
      record_ids: dataDelete,
    };
    const data = await fetchApi(
      "/api/employee/multiple-delete",
      "delete",
      body
    );
    return data.data;
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    changeEmployee: (state, action: PayloadAction<Value>) => {
      const { name1, value } = action.payload;
      state.employee[name1] = value;
      console.log(name1, value);
    },
    dataDeletes: (state, action: PayloadAction<number[]>) => {
      state.dataDelete = action.payload;
    },
    resetEmployee: (state) => {
      state.employee = initialState.employee;
    },
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
      .addCase(getDepartment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataDepartment = action.payload;
      })
      .addCase(getDepartment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Có lỗi";
      })
      // getPosition
      .addCase(getPosition.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataPosition = action.payload;
      })
      .addCase(getPosition.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Có lỗi";
      })
      // getMarriage
      .addCase(getMarriage.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataMarriage = action.payload;
      })
      .addCase(getMarriage.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Có lỗi";
      })
      //Grade
      .addCase(getGrade.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataGrade = action.payload;
      })
      //IBenefit
      .addCase(getBenefit.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataBenefit = action.payload;
      })
      // addEmployee
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.status = "succeeded1";
        state.employee = action.payload;
      })
      // getEmployee
      .addCase(getIdEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employee = action.payload;
      });
  },
});

export const { changeEmployee, dataDeletes, resetEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
