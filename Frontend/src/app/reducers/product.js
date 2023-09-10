import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import http from "~/services/apiService";

// Generates pending, fulfilled and rejected action types

export const getAllProduct = createAsyncThunk("product/getAllProduct", () => {
  return http.httpGet("product");
});

export const getProductById = createAsyncThunk(
  "product/getProductById",
  (id) => {
    return http.httpGet(`product/${id}`);
  }
);

export const update = createAsyncThunk("product/update", (data) => {
  return http.httpPut(`product/${data.id}`, data);
});

export const add = createAsyncThunk("product/add", (data) => {
  return http.httpPost("product", data);
});

// Slice
const slice = createSlice({
  name: "product",
  initialState: {
    products: [],
    product: {},
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    // getAllproduct
    builder.addCase(getAllProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload.sort((a, b) => a.id - b.id);
      state.error = "";
    });
    builder.addCase(getAllProduct.rejected, (state, action) => {
      state.loading = false;
      state.products = [];
      state.error = action.error.message;
    });

    // getById
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
      state.error = "";
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.loading = false;
      state.product = {};
      state.error = action.error.message;
    });

    // update
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id) {
        state.products = state.products.map((item) =>
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
      state.products.push(action.payload);
    });
    builder.addCase(add.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default slice.reducer;
