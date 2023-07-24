import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import http from "~/services/apiService";

// Generates pending, fulfilled and rejected action types

export const getAllFeedback = createAsyncThunk(
  "feedback/getAllFeedback",
  () => {
    return http.httpGet("feedback");
  }
);

export const getFeedbackById = createAsyncThunk(
  "feedback/getFeedbackById",
  (id) => {
    return http.httpGet(`feedback/${id}`);
  }
);

export const update = createAsyncThunk("feedback/update", (data) => {
  return http.httpPut(`feedback/${data.id}`, data);
});

export const add = createAsyncThunk("feedback/add", (data) => {
  return http.httpPost("feedback", data);
});

// Slice
const slice = createSlice({
  name: "feedback",
  initialState: {
    feedbacks: [],
    feedback: {},
    error: "",
    loading: false,
  },
  extraReducers: (builder) => {
    // getAllfeedback
    builder.addCase(getAllFeedback.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllFeedback.fulfilled, (state, action) => {
      state.loading = false;
      state.feedbacks = action.payload;
      state.error = "";
    });
    builder.addCase(getAllFeedback.rejected, (state, action) => {
      state.loading = false;
      state.feedbacks = [];
      state.error = action.error.message;
    });

    // getById
    builder.addCase(getFeedbackById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getFeedbackById.fulfilled, (state, action) => {
      state.loading = false;
      state.feedback = action.payload;
      state.error = "";
    });
    builder.addCase(getFeedbackById.rejected, (state, action) => {
      state.loading = false;
      state.feedback = {};
      state.error = action.error.message;
    });

    // update
    builder.addCase(update.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(update.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.id) {
        state.feedbacks = state.feedbacks.map((item) =>
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
      state.feedbacks.push(action.payload);
    });
    builder.addCase(add.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});
export default slice.reducer;
