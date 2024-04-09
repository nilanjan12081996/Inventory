import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import errorHandler from "../store/ErrorHandler";
import api from "../store/Api";

export const saveBom = createAsyncThunk(
    'saveAllBom',
    async (userInput, { rejectWithValue }) => {
        try {
            console.log("userInput", userInput);
            const response = await api.post('service/saveAllIPBom', userInput);
            console.log("response", response);
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
export const getBomProduct = createAsyncThunk(
    'product',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('service/Product');
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
export const getProductById = createAsyncThunk(
    'proId',
    async (userInput, { rejectWithValue }) => {
        try {
            console.log("userInput", userInput);
            const response = await api.post('service/getAllitemandProductDetailsByProductCode', userInput);
            console.log("response", response);
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
export const getBomByProductCode = createAsyncThunk(
    'getBomByPCode',
    async (productCode, { rejectWithValue }) => {
        try {
            // const { pageNumber, limit } = pagination;
            console.log("productCode: ", productCode);
            // const response = await api.post(`service/getAllitemandProductDetailsByProductCode/${pageNumber}/${limit}`, { productCode });
            const response = await api.post("service/getAllitemandProductDetailsByProductCode", productCode);
            console.log("response", response);
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

export const updateBoms = createAsyncThunk(
    'updatebom',
    async (userInput, { rejectWithValue }) => {
        try {
            console.log("userInput: ", userInput);
            const response = await api.post('service/updateAllIPBom', userInput);
            console.log("response", response);
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
export const deleteBoms = createAsyncThunk(
    'del',
    async (userInput, { rejectWithValue }) => {
        try {
            console.log("userInput: ", userInput);
            const response = await api.delete(`/service/IPBomsbyproductId/${userInput}`, userInput);
            console.log("response", response);
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
    loading: false,
    error: false,
    bom: [],
    product: [],
    productById: [],
    allBomsByProductCode: [],
    allBomsByBomCode: [],
    updatebomOld: [],
    msg: ""
}
const saveBomSlice = createSlice(
    {
        name: 'allBom',
        initialState,
        reducers: {
        },
        extraReducers: builder => {
            builder.addCase(saveBom.pending, (state) => {
                state.loading = true;
            }).addCase(saveBom.fulfilled, (state, { payload }) => {
                state.loading = false
                console.log("payload", payload);
                if (payload?.message?.code === 201) {
                    state.bom = payload?.response
                    console.log("bom", state.bom);
                    console.log(payload?.message?.summary);
                }
                state.error = false
            }).addCase(saveBom.rejected, (state, { payload }) => {
                state.error = true
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : 'Something went wrong. Try again later.';
            }).addCase(getBomProduct.pending, (state) => {
                state.loading = true
            }).addCase(getBomProduct.fulfilled, (state, { payload }) => {
                state.loading = false
                console.log("payload", payload);
                state.product = payload?.response

            }).addCase(getBomProduct.rejected, (state, { payload }) => {
                state.error = true
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : 'Something went wrong. Try again later.';
            }).addCase(getProductById.pending, (state) => {
                state.loading = true
            }).addCase(getProductById.fulfilled, (state, payload) => {
                state.loading = false
                console.log("payload", payload.payload.message.code);

                if (payload?.payload?.message?.code === 200) {
                    state.productById = payload?.payload?.response
                    console.log("productbyId", state.productById);
                    console.log(payload?.message?.summary);
                }
                else {
                    state.productById = ""
                }
                console.log("productbyId1", state.productById);
            }).addCase(getProductById.rejected, (state, { payload }) => {
                state.error = true
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : 'Something went wrong. Try again later.';
            }).addCase(getBomByProductCode.pending, (state) => {
                state.loading = true
            }).addCase(getBomByProductCode.fulfilled, (state, { payload }) => {
                state.loading = false
                console.log("boms payload", payload?.response);
                state.allBomsByProductCode = payload?.response

                state.error = false
            }).addCase(getBomByProductCode.rejected, (state, { payload }) => {
                state.error = true
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : 'Something went wrong. Try again later.';
            }).addCase(updateBoms.pending, (state) => {
                state.loading = true
            }).addCase(updateBoms.fulfilled, (state, { payload }) => {
                state.loading = false
                state.updatebomOld = payload?.response
                console.log("old value", payload?.response);
                state.error = false
            }).addCase(updateBoms.rejected, (state, { payload }) => {
                state.error = true
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : 'Something went wrong. Try again later.';
            }).addCase(deleteBoms.pending, (state) => {
                state.loading = true
            }).addCase(deleteBoms.fulfilled, (state, { payload }) => {
                state.loading = false
                state.msg = payload?.message?.summary
            }).addCase(deleteBoms.rejected, (state, { payload }) => {
                state.error = true
                state.message =
                    payload !== undefined && payload.message
                        ? payload.message
                        : 'Something went wrong. Try again later.';
            })
        }
    }
)
export default saveBomSlice.reducer