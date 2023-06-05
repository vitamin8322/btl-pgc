import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  current,
} from "@reduxjs/toolkit";
import { fetchApi } from "../../hooks/api";
import {
  IEmployeeListResponse,
  IMarriageStatus,
  IDepartmentStatus,
  IPositionStatus,
  IEmployeeFrom,
  IGrade,
  IBenefit,
  IStatusEmployee,
} from "../../models/Employee";
import { AppDispatch, RootState } from "../store";
import { useSnackbar } from "notistack";
// import { NotistackCustom } from "@/components/CustomComponents/NotistackCustom";
import { NotistackCustom } from "../../components/CustomComponents/NotistackCustom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

interface EmployeeState {
  employee: IEmployeeFrom;
  // employee2: {};
  dataEmployee: IEmployeeListResponse;
  dataMarriage: IMarriageStatus[];
  dataDepartment: IDepartmentStatus[];
  dataPosition: IPositionStatus[];
  dataDelete: number[];
  dataGrade: IGrade[];
  dataBenefit: IBenefit[];
  checkValidationEmplyee: boolean;
  checkValidationContract: boolean;
  checkValidationSalary: boolean;
  status: "idle" | "loading" | "succeededAdd" | "succeeded" | "failed";
  statusEmployee: IStatusEmployee;
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
    marriage: [],
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
    documents: [],
    grade: null,
    benefits: [],

    //ádd
    name: "",
    gender: "",
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
  checkValidationEmplyee: false,
  checkValidationContract: false,
  checkValidationSalary: false,
  status: "idle",
  statusEmployee: {
    data: {},
    message: "",
    result: false,
  },
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
export const getBenefit = createAsyncThunk("benefit/get", async (id?:number) => {
  const data = await fetchApi(`/api/benefit${id?`?grade_id=${id}`:''}`, "get");
  return data.data;
});

export const addEmployee = createAsyncThunk(
  "employee/add",
  async (_, { getState }) => {
    const { employee } = getState() as RootState;
    const data = await fetchApi("/api/employee", "post", employee.employee);
    return data;
  }
);
// const {  closeSnackbar } = useSnackbar();

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
      // state.employee[name1] = value;
      state.employee = { ...state.employee, [name1]: value };
      console.log(name1, value);
    },
    dataDeletes: (state, action: PayloadAction<number[]>) => {
      state.dataDelete = action.payload;
    },
    resetEmployee: (state) => {
      state.employee = initialState.employee;
    },
    checkEmployee: (state) => {
      if (
        state.employee.name === "" ||
        state.employee.gender === "" ||
        state.employee.dob === "" ||
        state.employee.dob === null ||
        state.employee.ktp_no === "" ||
        state.employee.nc_id === ""
      ) {
        state.checkValidationEmplyee = true;
      } else {
        state.checkValidationContract = false;
        state.checkValidationEmplyee = false;
      }
    },
    checkContract: (state) => {
      if (
        state.employee.type === null ||
        state.employee.contract_start_date === "" ||
        state.employee.contract_start_date === null
      ) {
        state.checkValidationContract = true;
      } else {
        state.checkValidationContract = false;
      }
    },
    checkSalary: (state) => {
      if (
        state.employee.basic_salary < 0 ||
        state.employee.audit_salary < 0 ||
        state.employee.health_insurance < 0 ||
        state.employee.meal_allowance < 0
      ) {
        state.checkValidationSalary = true;
      } else {
        state.checkValidationSalary = false;
      }
    },
    setCheckValidation: (state) => {
      state.checkValidationContract = false;
      state.checkValidationEmplyee = false;
      state.checkValidationSalary = false;
    },
    reserStatus: (state) => {
      state.status = initialState.status;
    },
    notistack: (state) => {
      // NotistackCustom("error", "Error", closeSnackbar);
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
      // deleteEmployee
      .addCase(deleteEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataEmployee = action.payload;
      })
      .addCase(deleteEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Có lỗi";
      })
      // editEmployee
      .addCase(editEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dataEmployee = action.payload;
      })
      .addCase(editEmployee.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Có lỗi";
      })
      // getDeparment
      .addCase(getDepartment.fulfilled, (state, action) => {
        state.dataDepartment = action.payload;
      })
      // getPosition
      .addCase(getPosition.fulfilled, (state, action) => {
        state.dataPosition = action.payload;
      })
      // getMarriage
      .addCase(getMarriage.fulfilled, (state, action) => {
        state.dataMarriage = action.payload;
      })
      //Grade
      .addCase(getGrade.fulfilled, (state, action) => {
        state.dataGrade = action.payload;
      })
      //IBenefit
      .addCase(getBenefit.fulfilled, (state, action) => {
        state.dataBenefit = action.payload;
      })
      // addEmployee
      .addCase(addEmployee.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        if(action.payload.data !==null)(
          state.employee = action.payload.data
        )
        state.statusEmployee = action.payload;
      })
      // getEmployee
      .addCase(getIdEmployee.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.employee = action.payload;
      });
  },
});

export const {
  changeEmployee,
  dataDeletes,
  resetEmployee,
  checkEmployee,
  checkContract,
  checkSalary,
  setCheckValidation,
  reserStatus,
  notistack
} = employeeSlice.actions;

export default employeeSlice.reducer;
