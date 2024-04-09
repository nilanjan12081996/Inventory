
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from '../store/Api';
import errorHandler from '../store/ErrorHandler';
//create Employee
export const CreateEmp = createAsyncThunk(
  'SaveEmployee',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('service/saveAddress', userInput);
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
//upload attachment
export const UploadAttachment = createAsyncThunk(
  'atteched',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('service/uploademployeeattachments', userInput);
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
//download attachment
export const downloadAttachment = createAsyncThunk(
  'download',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('service/download', userInput);
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
//fetch address
export const getAddress = createAsyncThunk(
  'adds',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('service/address');
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
);
//fetch experience
export const getExperience = createAsyncThunk(
  'exp',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('service/Experiences');
      if (response.status === 200) {
        return response.data.experience;
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
// fetch qualifications
export const getQualification = createAsyncThunk(
  'qua',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('service/Qualifications');
      if (response.status === 200) {
        return response.data.qualification;
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
//get salary
export const getSalary = createAsyncThunk(
  'sal',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('service/Salary');
      if (response.status === 200) {
        return response.data.salary;
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
//get country
export const getCountry = createAsyncThunk(
  'coun',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('service/countries');
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
);
//getStatesByCountryCode
export const getStatesByCountryCode = createAsyncThunk(
  'states',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('service/getstatesbycountrycode', userInput);
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
//get district by  state code
export const getDistByStateCode = createAsyncThunk(
  'dist',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('service/getdistrictsbystatecode', userInput);
      if (response.status === 200) {
        console.log(response.data.response);
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
//initial state
const initialState = {
  emp: {},
  loading: false,
  error: false,
  message: "",
  data: null,
  address: [],
  experience: [],
  qualifications: [],
  salary: {},
  country: [],
  states: [],
  dist: []
}
//slice for create new employee
const NewEmpSlice = createSlice(
  {
    name: "NewEmp",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(CreateEmp.pending, (state) => {
        state.loading = true
      }).addCase(CreateEmp.fulfilled, (state, { payload }) => {
        const data = payload
        state.loading = false
        state.emp = data

      }).addCase(CreateEmp.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(UploadAttachment.pending, (state) => {
        state.loading = true
      }).addCase(UploadAttachment.fulfilled, (state, { payload }) => {
        state.error = false
        state.message = payload
        state.loading = false
      }).addCase(UploadAttachment.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(downloadAttachment.pending, (state) => {
        state.loading = true
      }).addCase(downloadAttachment.fulfilled, (state, { payload }) => {
        state.loading = false
        state.data = payload
        state.error = false
      }).addCase(downloadAttachment.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(getAddress.pending, (state) => {
        state.loading = true
        state.error = false
      }).addCase(getAddress.fulfilled, (state, { payload }) => {
        state.loading = false
        state.address = payload
        state.error = false
      }).addCase(getAddress.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(getExperience.pending, (state) => {
        state.loading = true
        state.error = false
      }).addCase(getExperience.fulfilled, (state, { payload }) => {
        state.loading = false
        state.experience = payload
        state.error = false
      }).addCase(getExperience.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(getQualification.pending, (state) => {
        state.loading = true
      }).addCase(getQualification.fulfilled, (state, { payload }) => {
        state.loading = false
        state.qualifications = payload
        state.error = false
      }).addCase(getQualification.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';

      }).addCase(getSalary.pending, (state) => {
        state.loading = true
      }).addCase(getSalary.fulfilled, (state, { payload }) => {
        state.loading = false
        state.salary = payload
        state.error = false

      }).addCase(getSalary.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(getCountry.pending, (state) => {
        state.loading = true
      }).addCase(getCountry.fulfilled, (state, { payload }) => {
        state.loading = false
        state.country = payload
        state.error = false
      }).addCase(getCountry.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(getStatesByCountryCode.pending, (state) => {
        state.loading = true
      }).addCase(getStatesByCountryCode.fulfilled, (state, { payload }) => {
        state.loading = false
        state.states = payload
        state.error = false
      }).addCase(getStatesByCountryCode.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(getDistByStateCode.pending, (state) => {
        state.loading = true
      }).addCase(getDistByStateCode.fulfilled, (state, { payload }) => {
        state.loading = false
        state.dist = payload
        state.error = false
      }).addCase(getDistByStateCode.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
    }
  }
)
export default NewEmpSlice.reducer