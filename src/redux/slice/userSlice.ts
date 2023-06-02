import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchApi } from "../../hooks/api";
import { RootState } from "../store";
import { User } from "../../models/user";

interface UserState {
  user: User;
  status: "idle" | "loading" | "succeeded" | "failed";
}

const initialState: UserState = {
  user: {
    id: 0,
    username: "",
    email: "",
    role_id: 0,
    employee_id: null,
    department_id: null,
    company_id: 0,
    register_token: "",
    email_verified_at: null,
    is_active: "",
    created_at: "",
    updated_at: "",
    deleted_at: "",
    department: {
        id: 0,
        name: '',
        code: '',
        company_id: 0,
        created_at: '',
        updated_at: '',
      },
    position_name: "",
  },
  status: "idle",
};

export const getDetail = createAsyncThunk("detail/get", async () => {
  const data = await fetchApi("/api/user/detail", "get");
  return data.data;
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{},  
    extraReducers:(builder) => {
        builder
        .addCase(getDetail.fulfilled, (state, action) => {
            state.user = action.payload
        })
    }
})


export const {
  } = userSlice.actions;
  
  export default userSlice.reducer;
