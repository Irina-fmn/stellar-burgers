import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';
import {
  getFeedsApi,
  getOrdersApi,
  orderBurgerApi,
  getOrderByNumberApi
} from '@api';

type TOrderState = {
  orderRequest: boolean;
  orderModalData: TOrder | null;
  error: string | null;
  loading: boolean;
  feed: TOrdersData | null;
  orders: TOrder[];
  selectedOrder: TOrder | null;
};

const initialState: TOrderState = {
  orderRequest: false,
  orderModalData: null,
  error: null,
  loading: false,
  feed: null,
  orders: [],
  selectedOrder: null
};

export const getFeeds = createAsyncThunk(
  'order/getFeeds',
  async () => await getFeedsApi()
);

export const getOrders = createAsyncThunk(
  'order/getOrders',
  async () => await getOrdersApi()
);

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredients: string[]) => {
    const response = await orderBurgerApi(ingredients);
    return response.order;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (number: number) => await getOrderByNumberApi(number)
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderModal: (state) => {
      state.orderModalData = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.feed = action.payload;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.orderRequest = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.orderModalData = { ...action.payload, ingredients: [] };
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.orderRequest = false;
        state.error = action.error.message || null;
      })
      .addCase(getOrderByNumber.pending, (state) => {
        state.loading = true;
      })

      .addCase(getOrderByNumber.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload.orders[0];
      })

      .addCase(getOrderByNumber.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
  selectors: {
    selectOrderRequest: (state) => {
      state.orderRequest;
    },
    orderModalData: (state) => {
      state.orderModalData;
    },
    selectError: (state) => {
      state.error;
    }
  }
});

export const { selectOrderRequest, orderModalData, selectError } =
  orderSlice.selectors;
export const { clearOrderModal } = orderSlice.actions;
export const orderReducer = orderSlice.reducer;
