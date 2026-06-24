import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';

type TUserState = {
  user: TUser | null;
  loading: boolean;
  error: string | null;
};

const initialState: TUserState = {
  user: null,
  loading: false,
  error: null
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
    }
  },
  selectors: {
    selectUser: (state) => state.user,
    selectUserLoading: (state) => state.loading,
    selectUserErrors: (state) => state.error
  }
});

export const { setUser, clearUser } = userSlice.actions;

export const { selectUser, selectUserLoading, selectUserErrors } =
  userSlice.selectors;

export const userReducer = userSlice.reducer;
