import { configureStore } from '@reduxjs/toolkit';
import pizzaReducer from '@/redux/pizzaReducer';

// Création du store avec tous les reducers
export const store = configureStore({
  reducer: {
    pizzas: pizzaReducer, // Ici tu peux ajouter d'autres reducers si nécessaire
  },
});

// Types pour accéder au state et au dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
