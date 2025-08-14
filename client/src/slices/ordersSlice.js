import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async ({ page = 1, limit = 5 } = {}) => {
  const res = await axios.get(`/api/v1/orders?page=${page}&limit=${limit}`);
  return { data: res.data.data, meta: res.data.meta };
});


const ordersSlice = createSlice({
  name: 'orders',
  initialState: { items: [], status: 'idle', error: null, meta: {} },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.data;
        state.meta = action.payload.meta || {};
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default ordersSlice.reducer;
