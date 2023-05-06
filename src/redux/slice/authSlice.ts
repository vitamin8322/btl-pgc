import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchApi } from "../../hooks/api";
import { Auth, Company, LoginFormFields, Login } from "../../models/Auth";

interface AuthState {
  dataAuth: Auth;
  company: Company[];
  login: Login;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  dataAuth: {
    id: 0,
    username: "",
    email: "",
    role_id: 0,
    employee_id: 0,
    department_id: 0,
    company_id: 0,
    register_token: "",
    email_verified_at: "",
    is_active: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
    department_name: "",
    position_name: "",
    permissions: {
      attendance_record: {
        read: false,
        add: false,
        edit: false,
        export: false,
        unlock: false,
      },
      ot_record: {
        read: false,
        add: false,
        edit: false,
        export: false,
        unlock: false,
      },
      leave: {
        read: false,
        add: false,
        edit: false,
        export: false,
        unlock: false,
      },
      payroll_audit: {
        read: false,
        add: false,
        edit: false,
        export: false,
        unlock: false,
      },
      payroll_actual: {
        read: false,
        add: false,
        edit: false,
        export: false,
        unlock: false,
      },
      manage_employee: {
        read: false,
        add: false,
        edit: false,
        export: false,
        unlock: false,
      },
      manage_account: {
        read: false,
        add: false,
        edit: false,
        export: false,
        unlock: false,
      },
      global_setting: {
        read: false,
        add: false,
        edit: false,
        export: false,
        unlock: false,
      },
      setting: {
        read: false,
        add: false,
        edit: false,
        export: false,
        unlock: false,
      },
    },
    department: {
      id: 0,
      name: "",
      code: "",
      company_id: 0,
      created_at: "",
      updated_at: "",
    },
    employee: {
      // employee fields
    },
    company: {
      id: 0,
      name: "",
      full_name: "",
      address: "",
      tel_no: "",
      prefix: "",
      created_at: "",
      updated_at: "",
    },
  },
  company: [],
  login: {
    data: {
      token: "",
    },
    message: "",
    result: false,
  },
  status: "idle",
  error: null,
};

export const getCompany = createAsyncThunk("auth/company", async () => {
  const data = await fetchApi("/api/company", "get");
  return data.data;
});

export const loginAuth = createAsyncThunk(
  "auth/login",
  async ({ name, password, factory }: LoginFormFields) => {
    const data = await fetchApi("/api/login", "post", {
      username: name,
      password: password,
      company_id: factory,
    });
    return data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // company
      .addCase(getCompany.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCompany.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.company = action.payload;
      })
      .addCase(getCompany.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Có lỗi";
      })
      // login
      .addCase(loginAuth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAuth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.login = action.payload;
      })
      .addCase(loginAuth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Có lỗi";
      });
  },
});

export const {} = authSlice.actions;

export default authSlice.reducer;
