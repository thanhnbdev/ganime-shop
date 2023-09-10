import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import http from "~/services/apiService";

// Generates pending, fulfilled and rejected action types

export const getAllProductSize = createAsyncThunk(
  "product/getAllProductSize",
  () => {
    return http.httpGet("product-size");
  }
);

export const getProductById = createAsyncThunk(
  "product-size/getProductById",
  (id) => {
    return http.httpGet(`product-size/${id}`);
  }
);

export const update = createAsyncThunk("product-size/update", (data) => {
  return http.httpPut(`product-size/${data.id}`, data);
});

export const add = createAsyncThunk("product-size/add", (data) => {
  return http.httpPost("product-size", data);
});

// Slice
const slice = createSlice({
  name: "productSize",
  initialState: {
    productSizes: [],
    productSize: {},
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    // getAllproductSize
    builder.addCase(getAllProductSize.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProductSize.fulfilled, (state, action) => {
      state.loading = false;
      state.productSizes = action.payload;
      state.error = "";
    });
    builder.addCase(getAllProductSize.rejected, (state, action) => {
      state.loading = false;
      state.productSizes = [];
      state.error = action.error.message;
    });

    // getById
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.productSize = action.payload;
      state.error = "";
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.loading = false;
      state.productSize = {};
      state.error = action.error.message;
    });

    // update
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id) {
        state.productSizes = state.productSizes.map((item) =>
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
      state.productSizes.push(action.payload);
    });
    builder.addCase(add.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default slice.reducer;
