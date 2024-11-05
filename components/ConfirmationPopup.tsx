import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';

const ConfirmationPopup: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleOrderConfirm = () => {
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
