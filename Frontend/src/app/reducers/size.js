import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import http from "~/services/apiService";

// Generates pending, fulfilled and rejected action types

export const getAllSize = createAsyncThunk("size/getAllSize", () => {
  return http.httpGet("size");
});

export const getSizeById = createAsyncThunk("size/getSizeById", (id) => {
  return http.httpGet(`size/${id}`);
});

export const update = createAsyncThunk("size/update", (data) => {
  return http.httpPut(`size/${data.id}`, data);
});

export const add = createAsyncThunk("size/add", (data) => {
  return http.httpPost("size", data);
});

// Slice
const slice = createSlice({
  name: "size",
  initialState: {
    sizes: [],
    size: {},
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    // getAllSize
    builder.addCase(getAllSize.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllSize.fulfilled, (state, action) => {
      state.loading = false;
      state.sizes = action.payload;
      state.error = "";
    });
    builder.addCase(getAllSize.rejected, (state, action) => {
      state.loading = false;
      state.sizes = [];
      state.error = action.error.message;
    });

    // getById
    builder.addCase(getSizeById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSizeById.fulfilled, (state, action) => {
      state.loading = false;
      state.size = action.payload;
      state.error = "";
    });
    builder.addCase(getSizeById.rejected, (state, action) => {
      state.loading = false;
      state.size = {};
      state.error = action.error.message;
    });

    // update
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id) {
        state.sizes = state.sizes.map((item) =>
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
      state.sizes.push(action.payload);
    });
    builder.addCase(add.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default slice.reducer;
