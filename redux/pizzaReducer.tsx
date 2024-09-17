import { Pizza } from "@/model/pizza";
import { PizzaWithQuantity } from "@/model/pizzaWithQuantity";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

  const findIndexPizza = (state: { value: PizzaWithQuantity[] }, pizza: Pizza): number => {
    return state.value.findIndex((p) => p.pizza.id === pizza.id);
  };
  
  
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
      },
      
      
      removePizza: (state, action: PayloadAction<Pizza>) => {
        const index = findIndexPizza(state, action.payload);
        if (index !== -1) {
          if (state.value[index].quantity > 1) {
            state.value[index].quantity -= 1;
          } else {
            state.value.splice(index, 1);
          }
        } else {
          console.log('Pizza non trouvée !');
        }
      },
    },
  });


export const { addPizza, removePizza } = pizzaSlice.actions;

export default pizzaSlice.reducer;