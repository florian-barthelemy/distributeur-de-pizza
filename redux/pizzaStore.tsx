import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from '@/redux/pizzaReducer';
import authReducer from '@/redux/authSlice';
import loyaltyReducer from '@/redux/loyaltySlice';

// Création du store avec tous les reducers
export const store = configureStore({
  reducer: {
    pizzas: pizzaReducer,
    auth: authReducer, 
    loyaltyPoints: loyaltyReducer,
  },
});

// Types pour accéder au state et au dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
