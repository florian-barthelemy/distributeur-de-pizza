import { PizzaWithQuantity } from "@/model/pizzaWithQuantity";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Sauvegarder le panier dans AsyncStorage
export const saveCartToAsyncStorage = async (cart: PizzaWithQuantity[]) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Erreur lors de la sauvegarde du panier dans AsyncStorage", error);
    }
  };
  
  // Charger le panier depuis AsyncStorage
  export const loadCartFromAsyncStorage = async (): Promise<PizzaWithQuantity[]> => {
    try {
      const cart = await AsyncStorage.getItem('cart');
      return cart ? JSON.parse(cart) : [];
    } catch (error) {
      console.error("Erreur lors du chargement du panier depuis AsyncStorage", error);
      return [];
    }
  };