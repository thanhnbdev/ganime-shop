import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import http from "~/services/apiService";

// Generates pending, fulfilled and rejected action types

export const getAllRole = createAsyncThunk("role/getAllRole", () => {
  return http.httpGet("role");
});

export const getRoleById = createAsyncThunk("role/getRoleById", (id) => {
  return http.httpGet(`role/${id}`);
});

export const update = createAsyncThunk("role/update", (data) => {
  return http.httpPut(`role/${data.id}`, data);
});

export const add = createAsyncThunk("role/add", (data) => {
  return http.httpPost("role", data);
});

// Slice
const slice = createSlice({
  name: "role",
  initialState: {
    roles: [],
    role: {},
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    // getAllRole
    builder.addCase(getAllRole.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllRole.fulfilled, (state, action) => {
      state.loading = false;
      state.roles = action.payload;
      state.error = "";
    });
    builder.addCase(getAllRole.rejected, (state, action) => {
      state.loading = false;
      state.roles = [];
      state.error = action.error.message;
    });

    // getById
    builder.addCase(getRoleById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRoleById.fulfilled, (state, action) => {
      state.loading = false;
      state.role = action.payload;
      state.error = "";
    });
    builder.addCase(getRoleById.rejected, (state, action) => {
      state.loading = false;
      state.role = {};
      state.error = action.error.message;
    });

    // update
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id) {
        state.roles = state.roles.map((item) =>
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
      state.roles.push(action.payload);
    });
    builder.addCase(add.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default slice.reducer;
