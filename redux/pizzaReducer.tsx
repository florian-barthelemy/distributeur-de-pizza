import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { loadCartFromAsyncStorage, saveCartToAsyncStorage } from '@/asyncStorage/cartStorage';
import { Pizza } from '@/model/pizza';
import { PizzaWithQuantity } from '@/model/pizzaWithQuantity';
import { RootState } from './pizzaStore';

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

export const deletePizza = createAsyncThunk(
  'pizzas/deletePizza',
  async (pizzaId: number, { dispatch, getState }) => {
    const state = getState() as RootState;
    const currentUser = state.auth.user;
    await axios.delete(`http://localhost:3000/pizzas/${pizzaId}`,{data:{role:currentUser?.role
}});
    // Recharge la liste après la suppression
    await dispatch(loadPizzas());
  }
);

export const createPizza = createAsyncThunk(
  'pizzas/createPizza',
  async (pizza: Pizza, { dispatch, getState }) => {
    const state = getState() as RootState;
    const currentUser = state.auth.user;
    await axios.post(`http://localhost:3000/pizzas`,{
      role:currentUser?.role,
      name: pizza.name,
      description: pizza.description,
      image_url: pizza.image_url,
      price: pizza.price
});
    await dispatch(loadPizzas());
  }
);

export const updatePizza = createAsyncThunk(
  'pizzas/updatePizza',
  async ({ pizzaId, pizza }: { pizzaId: number; pizza: Pizza }, { dispatch, getState }) => {
    const state = getState() as RootState;
    const currentUser = state.auth.user;

    // Appel à l'API pour mettre à jour la pizza
    await axios.put(`http://localhost:3000/pizzas/${pizzaId}`, {
        role: currentUser?.role,
        name: pizza.name,
        description: pizza.description,
        image_url: pizza.image_url,
        price: pizza.price,
    });

    // Recharge la liste après la mise à jour
    await dispatch(loadPizzas());
  }
);

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
    builder.addCase(deletePizza.fulfilled, (state, action) => {
    });
    builder.addCase(createPizza.fulfilled, (state, action) => {
    });
    builder.addCase(updatePizza.fulfilled, (state, action) => {

    });
  },
});

export const { addPizza, removePizza } = pizzaSlice.actions;

export default pizzaSlice.reducer;
