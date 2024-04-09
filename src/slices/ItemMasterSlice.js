import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../store/Api";
import errorHandler from "../store/ErrorHandler";

export const getItems = createAsyncThunk(
  'fetchitems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('service/items');
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
//search item
export const searchItems = createAsyncThunk(
  'searchitems',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('service/getitemsbyitemcode', userInput);
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

export const multisearchItem = createAsyncThunk(
  'multisearchItem',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('service/searchItemDetails', userInput);
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


export const Delete = createAsyncThunk(
  'delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`service/Items/${id}`);
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
export const pageContent = createAsyncThunk(
  'fetchpage',
  async (Id, { rejectWithValue }) => {
    try {
      const response = await api.get(`service/items/${Id}/10`);
      if (response.status === 200) {
        return response.data.response.content;
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
export const Pages = createAsyncThunk(
  'fetchpagelist',
  async (Id, { rejectWithValue }) => {
    try {
      const response = await api.get(`service/items/${Id}/10`);
      if (response.status === 200) {
        return response.data.response.totalPages;
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
export const Update = createAsyncThunk(
  'Update',
  async ({ id, userInput }, { rejectWithValue }) => {
    try {
      const response = await api.put(`service/Items/${id}`, userInput);
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
export const DownloadPdf = createAsyncThunk(
  'pdf',
  async (userInput, { rejectWithValue }) => {
    try {
      const response = await api.post('service/generatePdf', userInput);
      if (response.status === 200) {
        return response.data.response.totalPages;
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
export const DownloadExcel = createAsyncThunk(
  'excel',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('service/excel');
      if (response.status === 200) {
        console.log(response.data);
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
export const Audit = createAsyncThunk(
  'audit',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('service/AuditTrails');
      if (response.status === 200) {
        console.log(response.data);
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
  items: [],
  search: [],
  multisearch: [],
  update: [],
  delete: [],
  content: [],
  oldData: [],
  audit: [],
  pages: [],
  loading: false,
  error: false
}
const ItemMasterSlice = createSlice(
  {
    name: 'fetchItems',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getItems.pending, (state) => {
        state.loading = true
        state.error = false
      }).addCase(getItems.fulfilled, (state, { payload }) => {
        state.loading = false
        state.items = payload
        state.error = false
      }).addCase(getItems.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(searchItems.pending, (state) => {
        state.loading = true
      }).addCase(searchItems.fulfilled, (state, { payload }) => {
        state.loading = false
        state.search = payload
        state.error = null
      }).addCase(searchItems.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(multisearchItem.pending, (state) => {
        state.loading = true
      }).addCase(multisearchItem.fulfilled, (state, { payload }) => {
        state.loading = false
        state.multisearch = payload
        state.error = null
      }).addCase(multisearchItem.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(Delete.pending, (state) => {
        state.loading = true
      }).addCase(Delete.fulfilled, (state, { payload }) => {
        state.loading = false
        state.delete = payload
        state.error = null
      }).addCase(Delete.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(pageContent.pending, (state) => {
        state.loading = true;
      }).addCase(pageContent.fulfilled, (state, { payload }) => {
        state.loading = false
        state.content = payload

        state.error = null
      }).addCase(pageContent.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(Update.pending, (state) => {
        state.loading = true
      }).addCase(Update.fulfilled, (state, { payload }) => {
        state.loading = false
        state.update = payload
        state.error = null
      }).addCase(Update.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(Pages.pending, (state) => {
        state.loading = true
      }).addCase(Pages.fulfilled, (state, { payload }) => {
        state.loading = false
        state.pages = payload
        state.error = null
      }).addCase(Pages.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(DownloadExcel.pending, (state) => {
        state.loading = true
      }).addCase(DownloadExcel.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = null
      }).addCase(DownloadExcel.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(DownloadPdf.pending, (state) => {
        state.loading = true
      }).addCase(DownloadPdf.fulfilled, (state, { payload }) => {
        state.loading = false
        state.error = null
      }).addCase(DownloadPdf.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      }).addCase(Audit.pending, (state) => {
        state.loading = true
      }).addCase(Audit.fulfilled, (state, { payload }) => {
        state.loading = false
        state.audit = payload
        state.error = null
      }).addCase(Audit.rejected, (state, { payload }) => {
        state.error = true
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
    }

  }
)

export default ItemMasterSlice.reducer;