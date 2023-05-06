import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slice/authSlice'
import employeeSlice from './slice/employeeSlice'


const store = configureStore({
  reducer: {
    auth: authSlice,
    employee: employeeSlice
    // items: itemsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
