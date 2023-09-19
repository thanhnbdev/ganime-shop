import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import http from "~/services/apiService";

// Generates pending, fulfilled and rejected action types

export const getAllProductColor = createAsyncThunk(
  "product/getAllProductColor",
  () => {
    return http.httpGet("product-color");
  }
);

export const getProductById = createAsyncThunk(
  "product-color/getProductById",
  (id) => {
    return http.httpGet(`product-color/${id}`);
  }
);

export const update = createAsyncThunk("product-color/update", (data) => {
  return http.httpPut(`product-color/${data.id}`, data);
});

export const add = createAsyncThunk("product-color/add", (data) => {
  return http.httpPost("product-color", data);
});

export const deleteById = createAsyncThunk("product-color/delete", (id) => {
  return http.httpDelete("product-color", id);
});

// Slice
const slice = createSlice({
  name: "productColor",
  initialState: {
    productColors: [],
    productColor: {},
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    // getAllproductColor
    builder.addCase(getAllProductColor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProductColor.fulfilled, (state, action) => {
      state.loading = false;
      state.productColors = action.payload;
      state.error = "";
    });
    builder.addCase(getAllProductColor.rejected, (state, action) => {
      state.loading = false;
      state.productColors = [];
      state.error = action.error.message;
    });

    // getById
    builder.addCase(getProductById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductById.fulfilled, (state, action) => {
      state.loading = false;
      state.productColor = action.payload;
      state.error = "";
    });
    builder.addCase(getProductById.rejected, (state, action) => {
      state.loading = false;
      state.productColor = {};
      state.error = action.error.message;
    });

    // update
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id) {
        state.productColors = state.productColors.map((item) =>
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
      state.productColors.push(action.payload);
    });
    builder.addCase(add.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    //deleteById
    builder.addCase(deleteById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteById.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id) {
        state.productColors = state.productColors.filter(
          (item) => item.id !== action.payload.id
        );
      }
    });
    builder.addCase(deleteById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default slice.reducer;
