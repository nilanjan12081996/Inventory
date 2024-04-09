import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";
import errorHandler from "../store/ErrorHandler";
export const updateAddress=createAsyncThunk(
    'updateAdd',
    
  async (userInput, { rejectWithValue },id) => {
    try {
      const response = await api.post(`service/Address/${id}`, userInput);
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
const initialState={
    adds:{},
    error:null,
    loading:null
}
const UpdateEmpSlice=createSlice(
    {
        name:'updateAdd',
        initialState,
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(updateAddress.pending,(state)=>{
                state.loading=true
                state.error=false
            }).addCase(updateAddress.fulfilled,(state,{payload})=>{
                state.loading=false
                state.adds=payload
                state.error=false
            }).addCase(updateAddress.rejected,(state,{payload})=>{
                state.error=true
                state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
            })
            })
        }
    }
)
export default UpdateEmpSlice