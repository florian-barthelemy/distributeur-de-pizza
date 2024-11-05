import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoyaltyState {
  points: number;
  history: Array<{ points: number; date: string }>;
}

const initialState: LoyaltyState = {
  points: 0,
  history: [],
};

const loyaltySlice = createSlice({
  name: 'loyalty',
  initialState,
  reducers: {
    setLoyaltyPoints(state, action: PayloadAction<number>) {
      state.points = action.payload;
    },
    updateLoyaltyHistory(state, action: PayloadAction<{ points: number; date: string }>) {
      state.history.push(action.payload);
    },
  },
});

export const { setLoyaltyPoints, updateLoyaltyHistory } = loyaltySlice.actions;
export default loyaltySlice.reducer;
