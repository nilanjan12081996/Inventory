import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import errorHandler from '../store/ErrorHandler';
import api from '../store/Api';

// Login | Method : POST
export const login = createAsyncThunk(
  'auth/login',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('authentication/login', userInput);
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
);

const initialState = {
  message: null,
  error: null,
  isLoading: false,
  isLoggedIn: false,
  currentUser: {},
  isPasswordReset: false,
  email: null,
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearCurrentUser: (state) => {
      state.currentUser = {};
      state.email = null;
      state.isPasswordReset = false;
    },
    resetAfterLoggedIn: () => {
      return {
        ...initialState,
        isLoggedIn: true,
        message: null,
        error: null,
        isPasswordReset: false,
      };
    },
    getCurrentUser: (state) => {
      return state.currentUser;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      sessionStorage.removeItem('adminToken');
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    clearErrorsMessages: (state) => {
      state.error = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, { payload }) => {
        const data = payload;
        const { accessToken } = data;

        state.isLoggedIn = true;
        state.currentUser = data;
        // localStorage.setItem(
        //   'adminToken',
        //   JSON.stringify({ token: access_token })
        // );
        sessionStorage.setItem(
          'adminToken',
          JSON.stringify({ token: accessToken })
        );
        localStorage.setItem("userRole", data?.roles)
        localStorage.setItem("userName: ", data?.username)

      })

      .addCase(login.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;

        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      });
  },
});

export const {
  clearCurrentUser,
  resetAfterLoggedIn,
  logout,
  clearErrorsMessages,
} = AuthSlice.actions;

export default AuthSlice.reducer;
