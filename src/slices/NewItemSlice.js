import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import errorHandler from '../store/ErrorHandler';
import api from "../store/Api";
//get materialtype
export const getMaterialType = createAsyncThunk(
  'materialtype',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('service/materialtype');
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
//get material by subtype
export const getMeterialSubtype = createAsyncThunk(
  'subtype',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('service/getmaterialssubtypebymaterialtypeCode', userInput);
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
export const getVendorId = createAsyncThunk(
  'vendorId',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('service/getvendorbyvendorId', userInput);
      if (response.status === 200) {
        console.log("dta",response.data.response);
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
//get vendors
export const getVendor = createAsyncThunk(
  'vendors',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('service/Vendors');
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
//create Items
export const postItemData = createAsyncThunk(
  'itemData',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('service/saveItem', userInput);
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
//exporting data to server
export const uploadItems = createAsyncThunk(
  'uploadItem',
  async (userInput, { rejectWithValue }) => {
    console.log('userInput', userInput);
    try {
      const response = await api.post('service/uploadItem', userInput);
      console.log("res: ", response);
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
//initiaalState
const initialState = {
  mtype: [],
  loading: false,
  error: false,
  mSubtype: [],
  vendor: [],
  itemData: [],
  data: {},
  vendorDetails: []

}
const NewItemSlice = createSlice(
  {
    name: 'fetchmaterialtype',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getMaterialType.pending, (state) => {
        state.loading = true
      }).addCase(getMaterialType.fulfilled, (state, { payload }) => {
        state.loading = false
        state.mtype = payload
        state.error = false
      }).addCase(getMaterialType.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(getMeterialSubtype.pending, (state) => {
        state.loading = true
      }).addCase(getMeterialSubtype.fulfilled, (state, { payload }) => {
        state.loading = false
        state.mSubtype = payload
        state.error = false
      }).addCase(getMeterialSubtype.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(getVendor.pending, (state) => {
        state.loading = true
      }).addCase(getVendor.fulfilled, (state, { payload }) => {
        state.loading = false
        state.vendor = payload
        state.error = false
      }).addCase(getVendor.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(postItemData.pending, (state) => {
        state.loading = true;
      }).addCase(postItemData.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.itemData = payload;
        state.error = false
      }).addCase(postItemData.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(uploadItems.pending, (state) => {
        state.loading = true

      }).addCase(uploadItems.fulfilled, (state, { payload }) => {
        state.loading = false
        state.data = payload
        console.log("file upload successful");

      }).addCase(uploadItems.rejected, (state, { payload }) => {

        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
        console.log('rejected', payload)
      }).addCase(getVendorId.pending,(state) =>{
        state.loading = true
    }).addCase(getVendorId.fulfilled,(state ,{ payload}) =>{
      state.loading = false;
      state.vendorDetails = payload;
      state.error =null
    }).addCase(getVendorId.rejected, (state, { payload }) => {
      state.error = true
      state.message =
        payload !== undefined && payload.message
          ? payload.message
          : 'Something went wrong. Try again later.';
      console.log('rejected', payload)
    })
  }
  }
)
export default NewItemSlice.reducer