import React from 'react';
import { View, Text, FlatList, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPizza, removePizza } from '@/redux/pizzaReducer';
import { updateLoyaltyPoints } from '@/redux/loyaltyActions';
import { AppDispatch, RootState } from '../redux/pizzaStore';
import ConfirmationPopup from '@/components/ConfirmationPopup';

const Cart = () => {
  const dispatch = useDispatch<AppDispatch>();
  
  // Récupérer les items du panier depuis Redux
  const cartItems = useSelector((state: RootState) => state.pizzas.cart);
  const userPoints = useSelector((state: RootState) => state.loyaltyPoints.points || 0);
  const userId = useSelector((state: RootState) => state.auth.user?.id || 0);

  const totalPrice = cartItems.reduce((total: number, item) => {
    if (item && item.pizza && item.pizza.price) {
      return total + item.pizza.price * item.quantity;
    }
    return total;
  }, 0);

  const discount = userPoints >= 1000 ? totalPrice * 0.1 : 0; // Remise de 10% pour 100 points ou plus
  const finalPrice = totalPrice - discount;
  const handleUsePoints = () => {
    if (userPoints >= 1000) {
      dispatch(updateLoyaltyPoints(userId, userPoints - 1000));
    }
  };

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
      {discount > 0 && <Text style={styles.discountText}>Remise avec points : -{discount.toFixed(2)}€</Text>}
      <Text style={styles.finalPriceText}>Montant final: {finalPrice.toFixed(2)}€</Text>

      {userPoints >= 1000 && (
        <Button title="Utiliser 1000 points pour une remise de 10%" onPress={handleUsePoints} />
      )}

      <ConfirmationPopup />
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
  discountText: {
    fontSize: 16,
    color: 'green',
    marginTop: 10,
    textAlign: 'right',
  },
  finalPriceText: {
    fontSize: 20,
    marginTop: 5,
    fontWeight: 'bold',
    textAlign: 'right',
  }
});

export default Cart;
