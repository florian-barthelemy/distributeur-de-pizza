import { loadCartFromAsyncStorage, saveCartToAsyncStorage } from "@/asyncStorage/cartStorage";
import { Pizza } from "@/model/pizza";
import { PizzaWithQuantity } from "@/model/pizzaWithQuantity";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

  const findIndexPizza = (state: { value: PizzaWithQuantity[] }, pizza: Pizza): number => {
    return state.value.findIndex((p) => p.pizza.id === pizza.id);
  };
  

  export const loadCartFromStorage = createAsyncThunk(
    'pizzas/loadCartFromStorage',
    async () => {
      const cart = await loadCartFromAsyncStorage();
      return cart;
    }
  );
  
  const pizzaSlice = createSlice({
    name: 'pizzas',
    initialState: {
      value: [] as PizzaWithQuantity[],
    },
    reducers: {
      addPizza: (state, action: PayloadAction<Pizza>) => {
        const index = findIndexPizza(state, action.payload);
        if (index === -1) {
          state.value.push({ pizza: action.payload, quantity: 1 });
        } else {
          state.value[index].quantity += 1;
        }
        saveCartToAsyncStorage(state.value);
      },
      
      
      removePizza: (state, action: PayloadAction<Pizza>) => {
        const index = findIndexPizza(state, action.payload);
        if (index !== -1) {
          if (state.value[index].quantity > 1) {
            state.value[index].quantity -= 1;
          } else {
            state.value.splice(index, 1);
          }

          saveCartToAsyncStorage(state.value);
          
        } else {
          console.log('Pizza non trouvée !');
        }
      },

    },
    extraReducers: (builder) => {
      builder.addCase(loadCartFromStorage.fulfilled, (state, action) => {
        state.value = action.payload;
      });
    },
  });


export const { addPizza, removePizza} = pizzaSlice.actions;

export default pizzaSlice.reducer;