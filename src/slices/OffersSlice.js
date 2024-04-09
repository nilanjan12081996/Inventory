import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import errorHandler from '../store/ErrorHandler';
import api from '../store/Api';

// Client List | Method: GET
export const getClientList = createAsyncThunk(
  'offers/get-client-list',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/clients');
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

// Suppliers List | Method: GET
export const getPreferredSupplierList = createAsyncThunk(
  'offers/get-preferred-supplier-list',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/suppliers');
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

// Collection Members List For SA | Method: POST
export const getCollectionMembersListSA = createAsyncThunk(
  'offers/get-collection-members-list-sa',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/get-users', { entity: 'SA' });
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
// Collection Members List For BD | Method: POST
export const getCollectionMembersListBD = createAsyncThunk(
  'offers/get-collection-members-list-bd',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.post('/get-users', { entity: 'BD' });
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
// Supplier Audit List | Method: GET
export const getSupplierAuditList = createAsyncThunk(
  'offers/get-supplier-audit-list',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/supplier-audits');
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
// Create Product Offer Request (POR) | Method: POST
export const createPOR = createAsyncThunk(
  'offers/product-offer-request',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/product-offer-request', formData);
      if (response.status === 201) {
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

// Get Product Category List | Method: GET
export const getProductCategoryList = createAsyncThunk(
  'offers/get-product-category-list',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/product-category');
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

// Create Product Request Concept (PRC) | Method: POST
export const createPRC = createAsyncThunk(
  'offers/product-request-concept',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/product-concepts', formData);
      if (response.status === 201) {
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

// Offer List | Method: Get
export const getOffersList = createAsyncThunk(
  'offers/offer-list',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/product-offer-request');
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

// PRC List | Method: POST
export const getPrcList = createAsyncThunk(
  'offers/prc-list',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post('/prc/lists', { id: id });
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

// Update Product Offer Request (POR) | Method: POST
export const updatePOR = createAsyncThunk(
  'offers/update-product-offer-request',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await api.post('/update-por', formData);
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

// Update Product Offer Request (PRC) | Method: POST
export const updatePRC = createAsyncThunk(
  'offers/update-prc',
  async ({ formData }, { rejectWithValue }) => {
    try {
      const response = await api.post('/product-concepts-update', formData);
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
  clientList: [],
  suppliersList: [],
  collectionMemberListSA: [],
  collectionMemberListBD: [],
  supplierAuditList: [],
  productCategoryList: [],
  porFormDetails: {},
  updatedPorFormDetails: {},
  offerList: [],
  prcList: [],
  email: null,
};

const OffersSlice = createSlice({
  name: 'offers',
  initialState,
  reducers: {
    resetAfterSaved: () => {
      return {
        ...initialState,
        porFormDetails: {},
      };
    },
    clearErrorsMessages: (state) => {
      state.error = false;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getClientList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(getClientList.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.error = false;
        const { data } = payload;
        state.clientList = data;
      })

      .addCase(getClientList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })

      .addCase(getPreferredSupplierList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(getPreferredSupplierList.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.error = false;
        const { data } = payload;
        state.suppliersList = data;
      })

      .addCase(getPreferredSupplierList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(getCollectionMembersListSA.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(getCollectionMembersListSA.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.error = false;
        const { data } = payload;
        state.collectionMemberListSA = data;
      })

      .addCase(getCollectionMembersListSA.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(getCollectionMembersListBD.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.error = null;
        state.message = null;
      })

      .addCase(getCollectionMembersListBD.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.error = false;
        const { data } = payload;
        state.collectionMemberListBD = data;
      })

      .addCase(getCollectionMembersListBD.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(getSupplierAuditList.pending, (state) => {
        state.isLoading = true;
        state.isLoggedIn = false;
        state.error = null;
        state.message = null;
      })

      .addCase(getSupplierAuditList.fulfilled, (state, { payload }) => {
        state.isLoggedIn = true;
        state.error = false;
        const { data } = payload;
        state.supplierAuditList = data;
      })

      .addCase(getSupplierAuditList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(createPOR.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(createPOR.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = false;
        state.porFormDetails = {
          details: payload,
        };
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })

      .addCase(createPOR.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(getProductCategoryList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        // state.message = null;
      })

      .addCase(getProductCategoryList.fulfilled, (state, { payload }) => {
        state.error = false;

        const { data } = payload;
        state.productCategoryList = data;
      })

      .addCase(getProductCategoryList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(createPRC.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(createPRC.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = false;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })

      .addCase(createPRC.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(getOffersList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(getOffersList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = false;
        state.offerList = payload.data;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })

      .addCase(getOffersList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(getPrcList.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(getPrcList.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = false;
        state.prcList = payload.data;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })

      .addCase(getPrcList.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(updatePOR.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(updatePOR.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = false;

        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })

      .addCase(updatePOR.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })
      .addCase(updatePRC.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.message = null;
      })

      .addCase(updatePRC.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.error = false;

        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      })

      .addCase(updatePRC.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = true;
        state.message =
          payload !== undefined && payload.message
            ? payload.message
            : 'Something went wrong. Try again later.';
      });
  },
});

export const { clearCurrentUser, clearErrorsMessages, resetAfterSaved } =
  OffersSlice.actions;

export default OffersSlice.reducer;
