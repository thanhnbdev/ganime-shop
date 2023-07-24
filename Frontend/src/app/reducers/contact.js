import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import http from "~/services/apiService";

// Generates pending, fulfilled and rejected action types

export const getAllContact = createAsyncThunk("contact/getAllContact", () => {
  return http.httpGet("contact");
});

export const getContactById = createAsyncThunk(
  "contact/getContactById",
  (id) => {
    return http.httpGet(`contact/${id}`);
  }
);

export const update = createAsyncThunk("contact/update", (data) => {
  return http.httpPut(`contact/${data.id}`, data);
});

export const add = createAsyncThunk("contact/add", (data) => {
  return http.httpPost("contact", data);
});

// Slice
const slice = createSlice({
  name: "contact",
  initialState: {
    contacts: [],
    contact: {},
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    // getAllcontact
    builder.addCase(getAllContact.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllContact.fulfilled, (state, action) => {
      state.loading = false;
      state.contacts = action.payload;
      state.error = "";
    });
    builder.addCase(getAllContact.rejected, (state, action) => {
      state.loading = false;
      state.contacts = [];
      state.error = action.error.message;
    });

    // getById
    builder.addCase(getContactById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getContactById.fulfilled, (state, action) => {
      state.loading = false;
      state.contact = action.payload;
      state.error = "";
    });
    builder.addCase(getContactById.rejected, (state, action) => {
      state.loading = false;
      state.contact = {};
      state.error = action.error.message;
    });

    // update
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id) {
        state.contacts = state.contacts.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      }
    });
    builder.addCase(update.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // add
    builder.addCase(add.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(add.fulfilled, (state, action) => {
      state.loading = false;
      state.contacts.push(action.payload);
    });
    builder.addCase(add.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default slice.reducer;
