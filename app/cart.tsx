import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPizza, removePizza } from '@/redux/pizzaReducer';
import { RootState } from '../redux/pizzaStore';
import ConfirmationPopup from '@/components/ConfirmationPopup';

const Cart = () => {
  const dispatch = useDispatch();
  
  // Récupérer les items du panier depuis Redux
  const cartItems = useSelector((state: RootState) => state.pizzas.cart);

  const totalPrice = cartItems.reduce((total: number, item) => {
    if (item && item.pizza && item.pizza.price) {
      return total + item.pizza.price * item.quantity;
    }
    return total;
  }, 0);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Votre Panier</Text>
      {cartItems.length === 0 ? (
        <Text>Votre panier est vide.</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.pizza?.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => {
            if (!item.pizza || !item.pizza.price) {
              console.error('Pizza invalide:', item.pizza);
              return null;
            }

            return (
              <View style={styles.itemContainer}>
                <Text>{item.pizza.name}</Text>
                <Text>{item.quantity} x {item.pizza.price}€</Text>
                <View style={styles.actions}>
                  <Button title="+" onPress={() => dispatch(addPizza(item.pizza))} />
                  <Button title="-" onPress={() => dispatch(removePizza(item.pizza))} />
                </View>
              </View>
            );
          }}
        />
      )}
      <Text style={styles.totalText}>Total: {totalPrice.toFixed(2)}€</Text>
     <ConfirmationPopup></ConfirmationPopup>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap:10
  },
  totalText: {
    fontSize: 20,
    marginTop: 20,
    textAlign: 'right',
  },
});

export default Cart;
