import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { loadCartFromAsyncStorage, saveCartToAsyncStorage } from '@/asyncStorage/cartStorage';
import { Pizza } from '@/model/pizza';
import { PizzaWithQuantity } from '@/model/pizzaWithQuantity';

// Charger les pizzas depuis l'API
export const loadPizzas = createAsyncThunk('pizzas/loadPizzas', async () => {
  const response = await axios.get('http://localhost:3000/pizzas'); 
  return response.data;
});

// Charger le panier depuis AsyncStorage
export const loadCartFromStorage = createAsyncThunk('pizzas/loadCartFromStorage', async () => {
  const cart = await loadCartFromAsyncStorage();
  return cart || [];
});

// Trouver l'index d'une pizza dans le panier
const findIndexPizza = (state: { cart: PizzaWithQuantity[] }, pizza: Pizza): number => {
  return state.cart.findIndex((p) => p.pizza?.id === pizza.id);
};

const pizzaSlice = createSlice({
  name: 'pizzas',
  initialState: {
    list: [] as Pizza[], // Liste des pizzas chargées depuis l'API
    cart: [] as PizzaWithQuantity[], // Panier de pizzas
  },
  reducers: {
    // Ajouter une pizza au panier
    addPizza: (state, action: PayloadAction<Pizza>) => {
      if (!action.payload || !action.payload.id || !action.payload.price) {
        console.error('Pizza invalide:', action.payload);
        return;
      }

      const index = findIndexPizza(state, action.payload);
      if (index === -1) {
        state.cart.push({ pizza: action.payload, quantity: 1 });
      } else {
        state.cart[index].quantity += 1;
      }
      saveCartToAsyncStorage(state.cart); // Sauvegarder dans AsyncStorage
    },
    // Supprimer une pizza du panier
    removePizza: (state, action: PayloadAction<Pizza>) => {
      const index = findIndexPizza(state, action.payload);
      if (index !== -1) {
        if (state.cart[index].quantity > 1) {
          state.cart[index].quantity -= 1;
        } else {
          state.cart.splice(index, 1);
        }
        saveCartToAsyncStorage(state.cart); // Sauvegarder dans AsyncStorage
      }
    },
  },
  extraReducers: (builder) => {
    // Charger les pizzas depuis l'API
    builder.addCase(loadPizzas.fulfilled, (state, action) => {
      state.list = action.payload;
    });
    // Charger le panier depuis AsyncStorage
    builder.addCase(loadCartFromStorage.fulfilled, (state, action) => {
      state.cart = action.payload;
    });
  },
});

export const { addPizza, removePizza } = pizzaSlice.actions;

export default pizzaSlice.reducer;
