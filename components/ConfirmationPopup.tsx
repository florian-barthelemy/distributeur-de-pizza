import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../redux/pizzaStore';
import { updateLoyaltyPoints } from '@/redux/loyaltyActions';
import { prepareUIRegistry } from 'react-native-reanimated/lib/typescript/reanimated2/frameCallback/FrameCallbackRegistryUI';

const ConfirmationPopup: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.pizzas.cart);
  const userId = useSelector((state: RootState) => state.auth.user?.id || 0);
  const userPoints = useSelector((state: RootState) => state.loyaltyPoints.points || 0);

  const handleOrderConfirm = () => {
    let pointsEarned = userPoints;
    cartItems.forEach(element => {
      pointsEarned += Math.floor(element.pizza.price * element.quantity);
    });
    dispatch(updateLoyaltyPoints(userId, pointsEarned));
    setShowConfirmation(true);
    setTimeout(() => setShowConfirmation(false), 2000); // Affiche l'animation pour 2 secondes
  };

  return (
    <View style={styles.container}>
      <Button title="Valider Commande" onPress={handleOrderConfirm} />
      {showConfirmation && (
        <Animated.View
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(300)}
          style={styles.confirmationBox}
        >
          <Text style={styles.confirmationText}>✔ Commande validée !</Text>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationBox: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
  },
  confirmationText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ConfirmationPopup;
