import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

type TIngredientsState = {
  items: TIngredient[];
  loading: boolean;
  error: string | null;
};

export const initialState: TIngredientsState = {
  items: [],
  loading: false,
  error: null
};

export const getIngredients = createAsyncThunk('ingredients/get', async () => {
  const data = await getIngredientsApi();
  return data;
});

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  selectors: {
    selectIngredients: (state) => state.items,
    selectLoading: (state) => state.loading,
    selectErrors: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  }
});

export const { selectIngredients, selectErrors, selectLoading } =
  ingredientsSlice.selectors;

export const ingredientsReducer = ingredientsSlice.reducer;
