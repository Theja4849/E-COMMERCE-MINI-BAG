
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Accepts { page, limit } for pagination
export const fetchProducts = createAsyncThunk('products/fetchProducts', async ({ page = 1, limit = 9 } = {}) => {
  const res = await axios.get(`/api/v1/products?page=${page}&limit=${limit}`);
  return { data: res.data.data, meta: res.data.meta };
});

const productsSlice = createSlice({
  name: 'products',
  initialState: { items: [], status: 'idle', error: null, meta: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.meta = action.payload.meta || {};
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default productsSlice.reducer;
