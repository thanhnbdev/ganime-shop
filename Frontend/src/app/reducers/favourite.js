import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import http from "~/services/apiService";

// Generates pending, fulfilled and rejected action types

export const getAllFavourite = createAsyncThunk(
  "favourite/getAllFavourite",
  () => {
    return http.httpGet("favourite");
  }
);

export const getFavouriteById = createAsyncThunk(
  "favourite/getFavouriteById",
  (id) => {
    return http.httpGet(`favourite/${id}`);
  }
);

export const update = createAsyncThunk("favourite/update", (data) => {
  return http.httpPut(`favourite/${data.id}`, data);
});

export const add = createAsyncThunk("favourite/add", (data) => {
  return http.httpPost("favourite", data);
});

export const deleteById = createAsyncThunk("favourite/delete", (id) => {
  return http.httpDelete("favourite", id);
});

// Slice
const slice = createSlice({
  name: "favourite",
  initialState: {
    favourites: [],
    favourite: {},
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    // getAllFavourite
    builder.addCase(getAllFavourite.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllFavourite.fulfilled, (state, action) => {
      state.loading = false;
      state.favourites = action.payload;
      state.error = "";
    });
    builder.addCase(getAllFavourite.rejected, (state, action) => {
      state.loading = false;
      state.favourites = [];
      state.error = action.error.message;
    });

    // getById
    builder.addCase(getFavouriteById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFavouriteById.fulfilled, (state, action) => {
      state.loading = false;
      state.favourite = action.payload;
      state.error = "";
    });
    builder.addCase(getFavouriteById.rejected, (state, action) => {
      state.loading = false;
      state.favourite = {};
      state.error = action.error.message;
    });

    // update
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id) {
        state.favourites = state.favourites.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      }
      state.favourites = state.favourites.filter((x) => x.status === 1);
    });
    builder.addCase(update.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // add favourite
    builder.addCase(add.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(add.fulfilled, (state, action) => {
      state.loading = false;
      state.favourites.push(action.payload);
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
        state.favourites = state.favourites.filter(
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
