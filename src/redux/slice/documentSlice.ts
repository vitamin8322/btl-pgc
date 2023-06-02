import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchApi } from "../../hooks/api";
import { IDocument, IDocumentFormData } from "../../models/employee";
import Cookies from "js-cookie";
import { ACCESS_TOKEN_KEY } from "../../utils/constants";
import { RootState } from "../store";

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
    deleted_ids: [],
  },
};

export const addDataDocument = createAsyncThunk(
  "document/add",
  async (
    { formData }: {formData: IDocumentFormData },
    { getState }
    ) => {
      const { employee } = getState() as RootState;
    const formdata = new FormData();
    formdata.append("employee_id", String(employee.employee.id));
    formData.documents &&
      formData.documents.forEach((doc) =>
        formdata.append("documents[]", doc, doc.name)
      );
    console.log("📢[documentSlice.ts:42]: formData: ", formData);
    formData.deleted_ids &&
      formData.deleted_ids.forEach((id) =>
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
    addordelDataToDocument: (
      state,
      action: PayloadAction<IDocumentFormData>
    ) => {
      const {  documents, deleted_ids } = action.payload;
      state.dataFormDocument.documents &&
        documents &&
        state.dataFormDocument.documents.push(...documents);
      state.dataFormDocument.deleted_ids &&
        deleted_ids &&
        state.dataFormDocument.deleted_ids.push(...deleted_ids);
    },
    removeDataFormDocument: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      console.log(id);
      state.dataFormDocument.documents &&
        state.dataFormDocument.documents.splice(id, 1);
    },
    removeDataDocument: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.dataDocument.splice(id, 1);
    },
    removeAllDataFromDocument: (state) => {
      state.dataFormDocument = initialState.dataFormDocument;
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
  removeDataDocument,
  removeAllDataDocument,
  removeAllDataFromDocument,
  removeDataFormDocument,
} = documentSlice.actions;

export default documentSlice.reducer;
