import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import http from "~/services/apiService";

// Generates pending, fulfilled and rejected action types

export const getAllVoucher = createAsyncThunk("voucher/getAllVoucher", () => {
  return http.httpGet("voucher");
});

export const getAllOrderDetail = createAsyncThunk(
  "order/getAllOrderDetail",
  () => {
    return http.httpGet("order-detail");
  }
);

export const getOrderDetailById = createAsyncThunk(
  "order/getOrderDetailById",
  (id) => {
    return http.httpGet(`order-detail/${id}`);
  }
);

export const update = createAsyncThunk("order-detail/update", (data) => {
  return http.httpPut(`order-detail/${data.id}`, data);
});

export const add = createAsyncThunk("order-detail/add", (data) => {
  return http.httpPost("order-detail", data);
});

// Slice
const slice = createSlice({
  name: "orderDetail",
  initialState: {
    ordersDetail: [],
    vouchers: [],
    ordersDetailHistory: [],
    ordersDetailHistoryAdmin: [],
    ordersDetailHistoryAdminBill: [],
    ordersDetailHistoryUserBill: [],
    orderDetail: {},
    totalRevenue: 0,
    statisByMonth: [
      {
        id: 1,
        month: "Tháng 1",
        numberProduct: 0,
      },
      {
        id: 2,
        month: "Tháng 2",
        numberProduct: 0,
      },
      {
        id: 3,
        month: "Tháng 3",
        numberProduct: 0,
      },
      {
        id: 4,
        month: "Tháng 4",
        numberProduct: 0,
      },
      {
        id: 5,
        month: "Tháng 5",
        numberProduct: 0,
      },
      {
        id: 6,
        month: "Tháng 6",
        numberProduct: 0,
      },
      {
        id: 7,
        month: "Tháng 7",
        numberProduct: 0,
      },
      {
        id: 8,
        month: "Tháng 8",
        numberProduct: 0,
      },
      {
        id: 9,
        month: "Tháng 9",
        numberProduct: 0,
      },
      {
        id: 10,
        month: "Tháng 10",
        numberProduct: 0,
      },
      {
        id: 11,
        month: "Tháng 11",
        numberProduct: 0,
      },
      {
        id: 12,
        month: "Tháng 12",
        numberProduct: 0,
      },
    ],
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

    // getAllorder
    builder.addCase(getAllOrderDetail.pending, (state) => {
      state.totalRevenue = 0;
      state.loading = true;
    });
    builder.addCase(getAllOrderDetail.fulfilled, (state, action) => {
      state.loading = false;
      const id = window.localStorage.getItem("id");
      state.ordersDetail = action.payload.filter(
        (x) => x.orders.user.id === Number(id)
      );
      state.ordersDetailHistory = action.payload.filter(
        (x) => x.status === 2 && x.orders.user.id === Number(id)
      );
      state.ordersDetailHistoryAdmin = action.payload.filter(
        (x) =>
          (x.status === 2 && x.orders.status === 2) ||
          (x.status === 3 && x.orders.status === 3)
      );
      state.ordersDetailHistoryAdminBill = action.payload.filter(
        (x) => x.status === 4 && x.orders.status === 4
      );
      state.ordersDetailHistoryUserBill = action.payload.filter(
        (x) =>
          x.status === 3 &&
          x.orders.status === 3 &&
          x.orders.user.id === Number(id)
      );
      state.ordersDetailHistoryAdminBill.map(
        (x) =>
          (state.totalRevenue +=
            ((x.orders.product.price * (100 - x.orders.product.sale)) / 100) *
            x.quantity)
      );
      const t1 = state.ordersDetailHistoryAdminBill.filter(
        (x) => x.orders.date.substring(5, 7) === "01"
      ).length;
      const t2 = state.ordersDetailHistoryAdminBill.filter(
        (x) => x.orders.date.substring(5, 7) === "02"
      ).length;
      const t3 = state.ordersDetailHistoryAdminBill.filter(
        (x) => x.orders.date.substring(5, 7) === "03"
      ).length;
      const t4 = state.ordersDetailHistoryAdminBill.filter(
        (x) => x.orders.date.substring(5, 7) === "04"
      ).length;
      const t5 = state.ordersDetailHistoryAdminBill.filter(
        (x) => x.orders.date.substring(5, 7) === "05"
      ).length;
      const t6 = state.ordersDetailHistoryAdminBill.filter(
        (x) => x.orders.date.substring(5, 7) === "06"
      ).length;
      const t7 = state.ordersDetailHistoryAdminBill.filter(
        (x) => x.orders.date.substring(5, 7) === "07"
      ).length;
      const t8 = state.ordersDetailHistoryAdminBill.filter(
        (x) => x.orders.date.substring(5, 7) === "08"
      ).length;
      const t9 = state.ordersDetailHistoryAdminBill.filter(
        (x) => x.orders.date.substring(5, 7) === "09"
      ).length;
      const t10 = state.ordersDetailHistoryAdminBill.filter(
        (x) => x.orders.date.substring(5, 7) === "10"
      ).length;
      const t11 = state.ordersDetailHistoryAdminBill.filter(
        (x) => x.orders.date.substring(5, 7) === "11"
      ).length;
      const t12 = state.ordersDetailHistoryAdminBill.filter(
        (x) => x.orders.date.substring(5, 7) === "12"
      ).length;
      state.statisByMonth[0].numberProduct = t1;
      state.statisByMonth[1].numberProduct = t2;
      state.statisByMonth[2].numberProduct = t3;
      state.statisByMonth[3].numberProduct = t4;
      state.statisByMonth[4].numberProduct = t5;
      state.statisByMonth[5].numberProduct = t6;
      state.statisByMonth[6].numberProduct = t7;
      state.statisByMonth[7].numberProduct = t8;
      state.statisByMonth[8].numberProduct = t9;
      state.statisByMonth[9].numberProduct = t10;
      state.statisByMonth[10].numberProduct = t11;
      state.statisByMonth[11].numberProduct = t12;
      state.error = "";
    });
    builder.addCase(getAllOrderDetail.rejected, (state, action) => {
      state.loading = false;
      state.ordersDetail = [];
      state.ordersDetailHistory = [];
      state.ordersDetailHistoryAdmin = [];
      state.error = action.error.message;
    });

    // getById
    builder.addCase(getOrderDetailById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getOrderDetailById.fulfilled, (state, action) => {
      state.loading = false;
      state.orderDetail = action.payload;
      state.error = "";
    });
    builder.addCase(getOrderDetailById.rejected, (state, action) => {
      state.loading = false;
      state.orderDetail = {};
      state.error = action.error.message;
    });

    // update
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id) {
        state.ordersDetail = state.ordersDetail.map((item) =>
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
      state.ordersDetail.push(action.payload);
    });
    builder.addCase(add.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default slice.reducer;
