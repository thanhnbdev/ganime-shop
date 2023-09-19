import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import http from "~/services/apiService";

// Generates pending, fulfilled and rejected action types

export const getAllVoucher = createAsyncThunk("voucher/getAllVoucher", () => {
  return http.httpGet("voucher");
});

export const getVoucherById = createAsyncThunk(
  "voucher/getVoucherById",
  (id) => {
    return http.httpGet(`voucher/${id}`);
  }
);

export const update = createAsyncThunk("voucher/update", (data) => {
  return http.httpPut(`voucher/${data.id}`, data);
});

export const add = createAsyncThunk("voucher/add", (data) => {
  return http.httpPost("voucher", data);
});

// Slice
const slice = createSlice({
  name: "voucher",
  initialState: {
    vouchers: [],
    voucher: {},
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    // getAllVoucher
    builder.addCase(getAllVoucher.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllVoucher.fulfilled, (state, action) => {
      state.loading = false;
      state.vouchers = action.payload;
      state.error = "";
    });
    builder.addCase(getAllVoucher.rejected, (state, action) => {
      state.loading = false;
      state.vouchers = [];
      state.error = action.error.message;
    });

    // getById
    builder.addCase(getVoucherById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVoucherById.fulfilled, (state, action) => {
      state.loading = false;
      state.voucher = action.payload;
      state.error = "";
    });
    builder.addCase(getVoucherById.rejected, (state, action) => {
      state.loading = false;
      state.voucher = {};
      state.error = action.error.message;
    });

    // update
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id) {
        state.vouchers = state.vouchers.map((item) =>
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
      state.vouchers.push(action.payload);
    });
    builder.addCase(add.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default slice.reducer;
