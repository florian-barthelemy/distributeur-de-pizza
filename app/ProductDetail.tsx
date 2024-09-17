import React from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from './_layout';
import { useDispatch } from 'react-redux';
import { addPizza } from '@/redux/pizzaReducer';

type ProductDetailRouteProp = RouteProp<RootStackParamList, 'ProductDetail'>;
type ProductDetailNavigationProp = StackNavigationProp<RootStackParamList, 'ProductDetail'>;

interface Props {
  route: ProductDetailRouteProp;
  navigation: ProductDetailNavigationProp;
}

const ProductDetail: React.FC<Props> = ({ route, navigation }) => {
  const { pizza } = route.params;
  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: pizza.image_url }} // Remplace par l'URL de l'image réelle
        style={styles.image}
      />
      <Text style={styles.pizzaName}>{pizza.name}</Text>
      <Text style={styles.description}>Description: {pizza.description} {pizza.name.toLowerCase()}.</Text>
      <Text style={styles.price}>Prix: {pizza.price}€</Text>

      <Button
        title="Ajouter au panier"
        onPress={() => dispatch(addPizza(pizza))}
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
});

export default ProductDetail;
