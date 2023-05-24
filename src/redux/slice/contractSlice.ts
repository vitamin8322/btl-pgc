import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchApi } from "../../hooks/api";
import {
  IContract,
  IContractFormData,
  IFormContract,
} from "../../models/Employee";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";

interface Contract {
  dataContract: IContract[];
  dataFormContract: IContractFormData;
}

const initialState: Contract = {
  dataContract: [
    {
      id: -1,
      employee_id: -1,
      contract_date: "",
      name: "",
      document: "",
      created_at: "",
      updated_at: "",
      deleted_at: "",
    },
  ],
  dataFormContract: {
    employee_id: "",
    names: [],
    contract_dates: [],
    documents: [],
    modified_contracts: [],
  },
};

export const addDataContract = createAsyncThunk(
  "contract/add",
  async (formData: IContractFormData, { getState }) => {
    const formdata = new FormData();
    formdata.append("employee_id", formData.employee_id);
    formData.names.forEach((name) => formdata.append("names[]", name));
    formData.contract_dates.forEach((date) =>
      formdata.append("contract_dates[]", date)
    );
    formData.documents.forEach((doc) =>
      formdata.append("documents[]", doc, doc.name)
    );
    formdata.append("modified_contracts[]", "");
    await fetchApi(
      "/api/contract/save-multiple",
      "post",
      formdata,
      true,
      "multipart/form-data"
    );
  }
);

const contractSlice = createSlice({
  name: "contract",
  initialState,
  reducers: {
    addDataToForm: (state, action: PayloadAction<IContractFormData>) => {
      const { employee_id, names, contract_dates, documents } = action.payload;
      console.log(1234432,employee_id);
      
      if(employee_id!=='0'){
        state.dataFormContract.employee_id = employee_id;
      }
      if(names.length>0){
        state.dataFormContract.names.push(...names);
        state.dataFormContract.contract_dates.push(...contract_dates);
        state.dataFormContract.documents.push(...documents);
      }
      
    },
    removeDataFormConTtract: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.dataFormContract.names.splice(id, 1);
      state.dataFormContract.contract_dates.splice(id, 1);
      state.dataFormContract.documents.splice(id, 1);
    },
    removeDataContractById: (state, action: PayloadAction<number>) => {
      const idToRemove = action.payload;
      state.dataContract = state.dataContract.filter(
        (contract) => contract.id !== idToRemove
      );
    },
    removeAllDataContract: (state) => {
      state.dataContract = [];
    },
    mountDataContract: (state, action: PayloadAction<IContract[]>) => {
      state.dataContract = action.payload;
    },
    addDataTableContract: (state, action: PayloadAction<IContract>) => {
      state.dataContract.unshift(action.payload);
    },
  },
});

export const {
  addDataToForm,
  addDataTableContract,
  removeDataFormConTtract,
  mountDataContract,
  removeDataContractById,
  removeAllDataContract,
} = contractSlice.actions;

export default contractSlice.reducer;
