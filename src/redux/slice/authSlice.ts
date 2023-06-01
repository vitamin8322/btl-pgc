import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchApi } from "../../hooks/api";
import { IAuth, ICompany, ILoginFormFields, ILogin } from "../../models/auth";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../configs/routes";

interface AuthState {
  dataAuth: IAuth;
  company: ICompany[];
  login: ILogin;
  status: "idle" | "loading" | "succeeded" | "failed";
  statusLogout: "idle" | "loading" | "succeeded" | "failed";
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
  statusLogout: "idle",
  error: null,
};

export const getCompany = createAsyncThunk("auth/company", async () => {
  const data = await fetchApi("/api/company", "get");
  return data.data;
});
export const logoutAuth = createAsyncThunk("auth/logout", async () => {
  const data = await fetchApi("/api/logout", "post");
  return data.data;
});

export const loginAuth = createAsyncThunk(
  "auth/login",
  async ({ name, password, factory }: ILoginFormFields) => {
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
  reducers: {
    resetLogin:(state) => {
      state.login = initialState.login
      state.status = initialState.status
    },
    removeCookie: (state) => {
      Cookies.remove('token');
    },
  },
  extraReducers: (builder) => {
    builder
      // company
      .addCase(getCompany.fulfilled, (state, action) => {
        state.company = action.payload;
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
      })

      // logout
      .addCase(logoutAuth.pending, (state) => {
        state.statusLogout = "loading";
      })
      .addCase(logoutAuth.fulfilled, (state, action) => {
        state.statusLogout = "succeeded";
        // state.login = action.payload;
      })
      .addCase(logoutAuth.rejected, (state, action) => {
        state.statusLogout = "failed";
        state.error = action.error.message ?? "Có lỗi";
      });
  },
});

export const {removeCookie, resetLogin} = authSlice.actions;

export default authSlice.reducer;
