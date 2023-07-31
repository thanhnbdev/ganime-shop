import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import http from "~/services/apiService";

// Generates pending, fulfilled and rejected action types

export const getAllCategory = createAsyncThunk(
  "category/getAllCategory",
  () => {
    return http.httpGet("category");
  }
);

export const getCategoryById = createAsyncThunk(
  "category/getCategoryById",
  (id) => {
    return http.httpGet(`category/${id}`);
  }
);

export const update = createAsyncThunk("category/update", (data) => {
  return http.httpPut(`category/${data.id}`, data);
});

export const add = createAsyncThunk("category/add", (data) => {
  return http.httpPost("category", data);
});

// Slice
const slice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    category: {},
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    // getAllCategory
    builder.addCase(getAllCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.categories = action.payload;
      state.error = "";
    });
    builder.addCase(getAllCategory.rejected, (state, action) => {
      state.loading = false;
      state.categories = [];
      state.error = action.error.message;
    });

    // getById
    builder.addCase(getCategoryById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategoryById.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload;
      state.error = "";
    });
    builder.addCase(getCategoryById.rejected, (state, action) => {
      state.loading = false;
      state.category = {};
      state.error = action.error.message;
    });

    // update
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id) {
        state.categories = state.categories.map((item) =>
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
      state.categories.push(action.payload);
    });
    builder.addCase(add.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default slice.reducer;
