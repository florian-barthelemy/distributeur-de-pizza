import React, { useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { loadPizzas } from '@/redux/pizzaReducer';
import { RootState, AppDispatch } from '../redux/pizzaStore';
import { RootStackParamList } from './_layout';

type ProductListNavigationProp = StackNavigationProp<RootStackParamList, 'ProductList'>;

interface Props {
  navigation: ProductListNavigationProp;
}

const ProductList: React.FC<Props> = ({ navigation }) => {
  const dispatch: AppDispatch = useDispatch();
  
  // Récupérer les pizzas depuis Redux
  const pizzas = useSelector((state: RootState) => state.pizzas.list);

  // Charger les pizzas depuis l'API
  useEffect(() => {
    dispatch(loadPizzas());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          // Assurer que pizza est bien défini et contient un prix
          if (!item || !item.price) {
            console.error('Pizza invalide:', item);
            return null;
          }

          return (
            <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { pizza: item })}>
              <View style={styles.pizzaContainer}>
                <Image source={{ uri: item.image_url }} style={styles.image} />
                <View style={styles.priceContainer}>
                  <Text style={styles.pizzaName}>{item.name}</Text>
                  <Text style={styles.pizzaPrice}>{item.price}€</Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  pizzaContainer: {
    padding: 10,
    borderBottomWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: '#ccc',
  },
  pizzaName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  pizzaPrice: {
    color: '#666',
  },
  image: {
    width: 100,
    height: 100,
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default ProductList;
