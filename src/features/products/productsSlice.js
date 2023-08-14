import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

import { BASE_URL } from '../../utils/constants';

export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${BASE_URL}/products`);
    return res.data;
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
  }
});

const initialState = {
  list: [],
  // filtered: [],
  // related: [],
  isLoading: false,
};

const productsSlice = createSlice({
  name: 'products',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(getProducts.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getProducts.rejected, state => {
      state.isLoading = false;
    });
  },
});

export default productsSlice.reducer;