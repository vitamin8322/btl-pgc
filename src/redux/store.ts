import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slice/authSlice'
import employeeSlice from './slice/employeeSlice'
import contractSlice from './slice/contractSlice'
import documentSlice from './slice/documentSlice'


const store = configureStore({
  reducer: {
    auth: authSlice,
    contract: contractSlice,
    document: documentSlice,
    employee: employeeSlice
    // items: itemsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
