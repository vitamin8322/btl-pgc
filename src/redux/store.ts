import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slice/authSlice'
import employeeSlice from './slice/employeeSlice'
import contractSlice from './slice/contractSlice'


const store = configureStore({
  reducer: {
    auth: authSlice,
    contract: contractSlice,
    employee: employeeSlice
    // items: itemsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
