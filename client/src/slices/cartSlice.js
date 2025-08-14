import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


// Thunks for backend API
export const fetchCart = createAsyncThunk('cart/fetchCart', async () => {
  const res = await axios.get('/api/v1/cart');
  return res.data.data;
});

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity = 1 }) => {
  const res = await axios.post('/api/v1/cart', { productId, quantity });
  return res.data.data;
});

export const updateQuantity = createAsyncThunk('cart/updateQuantity', async ({ id, quantity }) => {
  const res = await axios.post('/api/v1/cart', { productId: id, quantity });
  return res.data.data;
});

export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (id) => {
  await axios.delete(`/api/v1/cart/${id}`);
  return id;
});

export const clearCart = createAsyncThunk('cart/clearCart', async (_, { getState }) => {
  const { items } = getState().cart;
  await Promise.all(items.map(item => axios.delete(`/api/v1/cart/${item.id}`)));
  return [];
});

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        } else {
          state.items.push(action.payload);
        }
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        const idx = state.items.findIndex(i => i.id === action.payload.id);
        if (idx !== -1) {
          state.items[idx] = action.payload;
        }
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(i => i.id !== action.payload);
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default cartSlice.reducer;
