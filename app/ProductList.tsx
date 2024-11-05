import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { loadPizzas } from '@/redux/pizzaReducer';
import { RootState, AppDispatch } from '../redux/pizzaStore';
import { RootStackParamList } from './_layout';
import Animated, { SlideInLeft } from 'react-native-reanimated';

type ProductListNavigationProp = StackNavigationProp<RootStackParamList, 'ProductList'>;

interface Props {
  navigation: ProductListNavigationProp;
}

interface PizzaItemProps {
  name: string;
  price: number;
}

const ProductList: React.FC<Props> = ({ navigation }) => {
  const dispatch: AppDispatch = useDispatch();
  
  // Récupérer les pizzas depuis Redux
  const pizzas = useSelector((state: RootState) => state.pizzas.list);

  // Charger les pizzas depuis l'API
  useEffect(() => {
    dispatch(loadPizzas());
  }, [dispatch]);

  const PizzaItem: React.FC<PizzaItemProps> = ({ name, price }) => (
    <Animated.View entering={SlideInLeft.delay(300).duration(500)}>
      <View style={styles.pizzaItem}>
        <Text style={styles.pizzaName}>{name}</Text>
        <Text style={styles.pizzaPrice}>{price} €</Text>
      </View>
    </Animated.View>
  );

  return (
    <FlatList
      data={pizzas}
      renderItem={({ item }) => <PizzaItem name={item.name} price={item.price} />}
      keyExtractor={(item) => item.name}
    />
  );
};

const styles = StyleSheet.create({
  pizzaItem: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  pizzaName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  pizzaPrice: {
    fontSize: 16,
    color: '#888',
  },
});

export default ProductList;
