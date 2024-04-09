import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";
import errorHandler from "../store/ErrorHandler";

export const getPieDashboardPieChart = createAsyncThunk(
    'pieChart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('service/findPercentageMaterial');
            if (response.status === 200) {
                return response.data.message.summary;
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
export const getPieDashboardPieChartTwo = createAsyncThunk(
    'pieChart1',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('service/findPercentageMaterialSubType', userInput);
            if (response.status === 200) {
                return response.data.message.summary;
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

export const getLineChart = createAsyncThunk(
    'lineChart',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('service/findPercentageMaterial');
            if (response.status === 200) {
                return response.data.message.summary;
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
export const getLineChartmstc = createAsyncThunk(
    'lineChartmstc',
    async (userInput, { rejectWithValue }) => {
        try {
            const response = await api.post('service/findPercentageMaterialSubType',userInput);
            if (response.status === 200) {
                return response.data.message.summary;
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
export const itemsExpired = createAsyncThunk(
    'itemsExpired',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('service/findItemsExpiredDashboard');
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
export const itemsRetest = createAsyncThunk(
    'itemsRetest',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('service/findItemsRetestDashboard');
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
export const minimumStock = createAsyncThunk(
    'minimumStock',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('service/findQuantityMinimumStockQTYDashboard');
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
const initialState = {
    loading: false,
    error: false,
    pieData: [],
    pieDatatwo: [],
    lineChart: [],
    ItemsExpired:[],
    ItemsRetest:[],
    MinimumStock:[]
}
const DashBoardPieCharSlice = createSlice({
    name: 'fetchPieChart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getPieDashboardPieChart.pending, (state) => {
            state.loading = true;

        }).addCase(getPieDashboardPieChart.fulfilled, (state, { payload }) => {
            state.loading = false;
            console.log("pieDataNew", payload);
            console.log("status: ", payload?.payload?.message?.code);

            state.pieData = payload


            state.error = false;
        }).addCase(getPieDashboardPieChart.rejected, (state, { payload }) => {
            state.error = true
            state.message =
                payload !== undefined && payload.message
                    ? payload.message
                    : 'Something went wrong. Try again later.';
        }).addCase(getPieDashboardPieChartTwo.pending, (state) => {
            state.loading = false
        }).addCase(getPieDashboardPieChartTwo.fulfilled, (state, { payload }) => {
            state.pieDatatwo = payload
        }).addCase(getPieDashboardPieChartTwo.rejected, (state, { payload }) => {
            state.error = true
            state.message =
                payload !== undefined && payload.message
                    ? payload.message
                    : 'Something went wrong. Try again later.';
        }).addCase(getLineChart.pending, (state) => {
            state.loading = true
        }).addCase(getLineChart.fulfilled, (state, { payload }) => {
            state.loading = false
            state.error = null
        }).addCase(getLineChart.rejected, (state, { payload }) => {
            state.error = true
            state.message =
                payload !== undefined && payload.message
                    ? payload.message
                    : 'Something went wrong. Try again later.';
        }).addCase(getLineChartmstc.pending,(state)=>{
            state.loading = true
        }).addCase(getLineChartmstc.fulfilled,(state , {payload})=>{
            state.loading = false
            state.lineChart = payload
            state.error = null
        }).addCase(getLineChartmstc.rejected,(state , {payload})=>{
            state.error = true
            state.message =
                payload !== undefined && payload.message
                    ? payload.message
                    : 'Something went wrong. Try again later.';
        }).addCase(itemsExpired.pending,(state)=>{
            state.loading = true
        }).addCase(itemsExpired.fulfilled,(state , {payload})=>{
            state.loading = false
            state.ItemsExpired = payload
            state.error = null
        }).addCase(itemsExpired.rejected,(state , {payload})=>{
            state.error = true
            state.message =
                payload !== undefined && payload.message
                    ? payload.message
                    : 'Something went wrong. Try again later.';
        }).addCase(itemsRetest.pending,(state)=>{
            state.loading = true
        }).addCase(itemsRetest.fulfilled,(state , {payload})=>{
            state.loading = false
            state.ItemsRetest = payload
            state.error = null
        }).addCase(itemsRetest.rejected,(state , {payload})=>{
            state.error = true
            state.message =
                payload !== undefined && payload.message
                    ? payload.message
                    : 'Something went wrong. Try again later.';
        }).addCase(minimumStock.pending,(state)=>{
            state.loading = true
        }).addCase(minimumStock.fulfilled,(state , {payload})=>{
            state.loading = false
            state.MinimumStock = payload
            state.error = null
        }).addCase(minimumStock.rejected,(state , {payload})=>{
            state.error = true
            state.message =
                payload !== undefined && payload.message
                    ? payload.message
                    : 'Something went wrong. Try again later.';
        })
    }
})
export default DashBoardPieCharSlice.reducer;