import React, { useEffect } from 'react';
import { View, Text, Button, Image, StyleSheet } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamListStore } from './_layout';  // Assurez-vous que cela est correctement typé.
import { useDispatch } from 'react-redux';
import { addPizza } from '@/redux/pizzaReducer';

type ProductDetailRouteProp = RouteProp<RootStackParamListStore, 'ProductDetail'>;
type ProductDetailNavigationProp = StackNavigationProp<RootStackParamListStore, 'ProductDetail'>;

interface Props {
  route: ProductDetailRouteProp;
  navigation: ProductDetailNavigationProp;
}

const ProductDetail: React.FC<Props> = ({ route, navigation }) => {
  const { pizza } = route.params || {};  // Récupère `pizza` depuis `route.params` avec une valeur par défaut
  const dispatch = useDispatch();

  // Diagnostic pour vérifier les paramètres reçus
  useEffect(() => {
    console.log("Route Params: ", route.params);  // Logge les paramètres de route
    console.log("Pizza: ", pizza);  // Logge l'objet pizza pour s'assurer qu'il est bien défini
  }, [route.params]);

  // Si l'objet `pizza` ou son id est manquant, afficher une erreur
  if (!pizza || !pizza.id) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Pizza invalide. Veuillez réessayer.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: pizza.image_url }} // Remplace par l'URL de l'image réelle
        style={styles.image}
        accessibilityLabel="Pizza Image"
      />
      <Text style={styles.pizzaName}>{pizza.name}</Text>
      <Text style={styles.description}>Description: {pizza.description}</Text>
      <Text style={styles.price}>Prix: {pizza.price}€</Text>

      <Button
        title="Ajouter au panier"
        testID='Ajouter au panier'
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
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
});

export default ProductDetail;
