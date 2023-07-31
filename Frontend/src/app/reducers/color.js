import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import http from "~/services/apiService";

// Generates pending, fulfilled and rejected action types

export const getAllColor = createAsyncThunk("color/getAllColor", () => {
  return http.httpGet("color");
});

export const getColorById = createAsyncThunk("color/getColorById", (id) => {
  return http.httpGet(`color/${id}`);
});

export const update = createAsyncThunk("color/update", (data) => {
  return http.httpPut(`color/${data.id}`, data);
});

export const add = createAsyncThunk("color/add", (data) => {
  return http.httpPost("color", data);
});

// Slice
const slice = createSlice({
  name: "color",
  initialState: {
    colors: [],
    color: {},
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    // getAllColor
    builder.addCase(getAllColor.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllColor.fulfilled, (state, action) => {
      state.loading = false;
      state.colors = action.payload;
      state.error = "";
    });
    builder.addCase(getAllColor.rejected, (state, action) => {
      state.loading = false;
      state.colors = [];
      state.error = action.error.message;
    });

    // getById
    builder.addCase(getColorById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getColorById.fulfilled, (state, action) => {
      state.loading = false;
      state.color = action.payload;
      state.error = "";
    });
    builder.addCase(getColorById.rejected, (state, action) => {
      state.loading = false;
      state.color = {};
      state.error = action.error.message;
    });

    // update
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id) {
        state.colors = state.colors.map((item) =>
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
      state.colors.push(action.payload);
    });
    builder.addCase(add.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default slice.reducer;
