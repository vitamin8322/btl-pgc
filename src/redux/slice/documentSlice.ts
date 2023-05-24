import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchApi } from "../../hooks/api";
import {
  IDocument,
  IDocumentFormData,
} from "../../models/Employee";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";

interface Document {
  dataDocument: IDocument[];
  dataFormDocument: IDocumentFormData;
}

const initialState: Document = {
  dataDocument: [
    {
      id: -1,
      employee_id: -1,
      document: "",
      created_at: "",
      updated_at: null,
    },
  ],
  dataFormDocument: {
    employee_id: "",
    documents: [],
  },
};


export const addDataDocument = createAsyncThunk(
    "document/add",
    async (formData: IDocumentFormData, { getState }) => {
      const formdata = new FormData();
      formdata.append("employee_id", formData.employee_id);
      formData.documents.forEach((doc) =>
        formdata.append("documents[]", doc, doc.name)
      );
      await fetchApi(
        "/api/employee-document/upload",
        "post",
        formdata,
        true,
        "multipart/form-data"
      );
    }
  );


  const documentSlice = createSlice({
    name: "document",
    initialState,
    reducers: {
      addDataToDocument: (state, action: PayloadAction<IDocumentFormData>) => {
        const { employee_id, documents } = action.payload;
        state.dataFormDocument.employee_id = employee_id;
        state.dataFormDocument.documents.push(...documents);
      },
      removeDataFormConTtract: (state, action: PayloadAction<number>) => {
        const id = action.payload;
        state.dataFormDocument.documents.splice(id, 1);
      },
      removeDataDocumentById: (state, action: PayloadAction<number>) => {
        const idToRemove = action.payload;
        state.dataDocument = state.dataDocument.filter(
          (document) => document.id !== idToRemove
        );
      },
      removeAllDataDocument: (state) => {
        state.dataDocument = [];
      },
      mountDataDocument: (state, action: PayloadAction<IDocument[]>) => {
        state.dataDocument = action.payload;
      },
      addDataTableDocument: (state, action: PayloadAction<IDocument>) => {
        state.dataDocument.unshift(action.payload);
      },
    },
  });
  
  export const {
    addDataToDocument,
    addDataTableDocument,
    removeDataFormConTtract,
    mountDataDocument,
    removeDataDocumentById,
    removeAllDataDocument,
  } = documentSlice.actions;
  
  export default documentSlice.reducer;
