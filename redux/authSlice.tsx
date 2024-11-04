import { User } from '@/model/user';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AuthState = {
  error: string | null;
  isAuthenticated: boolean
  user: User  | null;
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ user: User}>) => {
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
    },
    setError: (state, action: PayloadAction<string>) => {
        state.error = action.payload;
      },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.error = null
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
