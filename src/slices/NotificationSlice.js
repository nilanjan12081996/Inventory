import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";
import errorHandler from "../store/ErrorHandler";

export const postAddNotification = createAsyncThunk(
    'addNotification',
    async (userInput, { rejectWithValue }) => {
      try {
        const response = await api.post('service/savepushnotifications', userInput);
        if (response.status === 200) {
          return response.data.response;
        } else {
          let errors = errorHandler(response);
          return rejectWithValue(errors);
        }
      } catch (err) {
        let errors = errorHandler(err);
        return rejectWithValue(errors);
      }
    }
  )
  export const getNotification = createAsyncThunk(
    'Notification',
    async (userInput, { rejectWithValue }) => {
      try {
        const response = await api.get('service/findByPushNotificationsByReadList', userInput);
        if (response.status === 200) {
          return response.data;
        } else {
          let errors = errorHandler(response);
          return rejectWithValue(errors);
        }
      } catch (err) {
        let errors = errorHandler(err);
        return rejectWithValue(errors);
      }
    }
  )
  const initialState = {
    add: [],
    notifi:[],
    loading: false,
    error: false
  }
  const NotificationSlice = createSlice(
    {
      name: 'notification',
      initialState,
      reducers: {},
      extraReducers: (builder) => {
        builder.addCase(postAddNotification.pending, (state) => {
          state.loading = true
          state.error = false
        }).addCase(postAddNotification.fulfilled, (state, { payload }) => {
          state.loading = false
          state.add = payload
          state.error = false
        }).addCase(postAddNotification.rejected, (state, { payload }) => {
          state.error = true
          state.message =
            payload !== undefined && payload.message
              ? payload.message
              : 'Something went wrong. Try again later.';
        }).addCase(getNotification.pending, (state) => {
          state.loading = true
          state.error = false
        }).addCase(getNotification.fulfilled, (state, { payload }) => {
          state.loading = false
          state.notifi = payload
          state.error = false
        }).addCase(getNotification.rejected, (state, { payload }) => {
          state.error = true
          state.message =
            payload !== undefined && payload.message
              ? payload.message
              : 'Something went wrong. Try again later.';
        })
    }
    }
  )

  export default NotificationSlice.reducer;