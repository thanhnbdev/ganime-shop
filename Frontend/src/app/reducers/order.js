import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import http from "~/services/apiService";

// Generates pending, fulfilled and rejected action types

export const getAllOrder = createAsyncThunk("order/getAllOrder", () => {
  return http.httpGet("order");
});

export const getOrderById = createAsyncThunk("order/getOrderById", (id) => {
  return http.httpGet(`order/${id}`);
});

export const update = createAsyncThunk("order/update", (data) => {
  return http.httpPut(`order/${data.id}`, data);
});

export const add = createAsyncThunk("order/add", (data) => {
  return http.httpPost("order", data);
});

// Slice
const slice = createSlice({
  name: "order",
  initialState: {
    orders: [],
    ordersOg: [],
    orderQuantity: [],
    order: {},
    totalPrice: 0,
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    // getAllorder
    builder.addCase(getAllOrder.pending, (state) => {
      state.totalPrice = 0;
      state.loading = true;
    });
    builder.addCase(getAllOrder.fulfilled, (state, action) => {
      state.loading = false;
      const id = window.localStorage.getItem("id");
      state.ordersOg = action.payload;
      state.orders = action.payload.filter((x) => x.user.id === Number(id));
      state.orderQuantity = action.payload.filter((x) => x.status === 2);
      state.totalPrice = state.orders
        .filter((x) => x.selected === true && x.status === 1)
        .reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.product.price * currentValue.quantity,
          0
        );
      state.error = "";
    });
    builder.addCase(getAllOrder.rejected, (state, action) => {
      state.loading = false;
      state.orders = [];
      state.ordersOg = [];
      state.error = action.error.message;
    });

    // getById
    builder.addCase(getOrderById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderById.fulfilled, (state, action) => {
      state.loading = false;
      state.order = action.payload;
      state.error = "";
    });
    builder.addCase(getOrderById.rejected, (state, action) => {
      state.loading = false;
      state.order = {};
      state.error = action.error.message;
    });

    // update
    builder.addCase(update.pending, (state) => {
      state.totalPrice = 0;
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id) {
        state.orders = state.orders.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      }
      state.totalPrice = state.orders
        .filter((x) => x.selected === true && x.status === 1)
        .reduce(
          (accumulator, currentValue) =>
            accumulator + currentValue.product.price * currentValue.quantity,
          0
        );
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
      state.orders.push(action.payload);
    });
    builder.addCase(add.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default slice.reducer;
