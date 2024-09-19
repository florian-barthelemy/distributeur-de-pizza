import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamListStore } from './_layout'; 
import { useDispatch } from 'react-redux';
import { addPizza } from '@/redux/pizzaReducer';

type ProductDetailRouteProp = RouteProp<RootStackParamListStore, 'ProductDetail'>;
type ProductDetailNavigationProp = StackNavigationProp<RootStackParamListStore, 'ProductDetail'>;

interface Props {
  route: ProductDetailRouteProp;
  navigation: ProductDetailNavigationProp;
}

const ProductDetail: React.FC<Props> = ({ route, navigation }) => {
  const { pizza } = route.params;
  const dispatch = useDispatch();

  // Vérifier que la pizza est bien définie et contient un `id` et un `price`
  if (!pizza || !pizza.id || !pizza.price) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Pizza invalide. Veuillez réessayer.</Text>
      </View>
    );
  }

  // Fonction pour ajouter au panier et rediriger vers la page du panier
  const handleAddToCart = () => {
    dispatch(addPizza(pizza)); // Ajouter la pizza au panier
    navigation.navigate('Cart'); // Rediriger vers la page du panier
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: pizza.image_url }} 
        style={styles.image}
        accessibilityLabel="Pizza Image"
      />
      <Text style={styles.pizzaName}>{pizza.name}</Text>
      <Text style={styles.description}>Description: {pizza.description}</Text>
      <Text style={styles.price}>Prix: {pizza.price}€</Text>

      <Button
        title="Ajouter au panier"
        testID="ajouter-au-panier"
        onPress={handleAddToCart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  pizzaName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default ProductDetail;
