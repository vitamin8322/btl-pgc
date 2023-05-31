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
    deleted_ids: []
  },
};


export const addDataDocument = createAsyncThunk(
    "document/add",
    async ( { id, formData }: { id?: string; formData: IDocumentFormData }, { getState }) => {
      const formdata = new FormData();
      formdata.append("employee_id", id || '');
      formData.documents && formData.documents.forEach((doc) =>
        formdata.append("documents[]", doc, doc.name)
      );
      console.log("📢[documentSlice.ts:42]: formData: ", formData);
      formData.deleted_ids && formData.deleted_ids.forEach((id) =>
        formdata.append("deleted_ids[]", String(id))
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
      addordelDataToDocument: (state, action: PayloadAction<IDocumentFormData>) => {
        const { employee_id, documents, deleted_ids } = action.payload;
        state.dataFormDocument.employee_id = employee_id;
        state.dataFormDocument.documents && documents && state.dataFormDocument.documents.push(...documents);
        state.dataFormDocument.deleted_ids && deleted_ids && state.dataFormDocument.deleted_ids.push(...deleted_ids);
      },
      removeDataDocumentById: (state, action: PayloadAction<number>) => {
        const idToRemove = action.payload;
        state.dataDocument = state.dataDocument.filter(
          (document) => document.id !== idToRemove
        );
      },
      removeAllDataFromDocument: (state) => {
        state.dataFormDocument = initialState.dataFormDocument
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
    addordelDataToDocument,
    addDataTableDocument,
    mountDataDocument,
    removeDataDocumentById,
    removeAllDataDocument,
    removeAllDataFromDocument
  } = documentSlice.actions;
  
  export default documentSlice.reducer;
