import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { loadPizzas } from '@/redux/pizzaReducer';
import { RootState, AppDispatch } from '../redux/pizzaStore';
import { RootStackParamList } from './_layout';
import Animated, { SlideInLeft } from 'react-native-reanimated';
import { Pizza } from '@/model/pizza';

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

  const PizzaItem: React.FC<{ item: Pizza }> = ({ item }) => (
    <Animated.View entering={SlideInLeft.delay(300).duration(500)}>
      <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { pizza: item })}>
              <View style={styles.pizzaContainer}>
                <Image source={{ uri: item.image_url }} style={styles.image} />
                <View style={styles.priceContainer}>
                  <Text style={styles.pizzaName}>{item.name}</Text>
                  <Text style={styles.pizzaPrice}>{item.price}€</Text>
                </View>
              </View>
            </TouchableOpacity>
    </Animated.View>
  );
  
  return (
    <FlatList
      data={pizzas}
      renderItem={({ item }) => <PizzaItem item={item} />}
      keyExtractor={(item) => item.name}
    />
  );
}

const styles = StyleSheet.create({
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
    fontSize: 18,
    fontWeight: 'bold',
  },
  pizzaPrice: {
    fontSize: 16,
    color: '#888',
  },

  priceContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  image: {
    width: 100,
    height: 100,
  },
});

export default ProductList;
