import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import axios from 'axios';

import { BASE_URL } from '../../utils/constants';

export const getCategories = createAsyncThunk('categories/getCategories', async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${BASE_URL}/categories`);
    return res.data;
  } catch (e) {
    console.error(e);
    return thunkAPI.rejectWithValue(e);
  }
});

const initialState = {
  list: [],
  isLoading: false,
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: initialState,
  extraReducers: builder => {
    builder.addCase(getCategories.pending, state => {
      state.isLoading = true;
    });

    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.list = action.payload;
      state.isLoading = false;
    });

    builder.addCase(getCategories.rejected, state => {
      state.isLoading = false;
    });
  },
});

export default categoriesSlice.reducer;
