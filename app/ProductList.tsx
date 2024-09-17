import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { Pizza } from '@/model/pizza';
import { RootStackParamList } from './_layout';
import { useDispatch, useSelector } from 'react-redux';
import { addPizza, removePizza } from '@/redux/pizzaReducer';
import { RootState } from '@/redux/pizzaStore';

type ProductListNavigationProp = StackNavigationProp<RootStackParamList, 'ProductList'>;

interface Props {
  navigation: ProductListNavigationProp;
}

const ProductList: React.FC<Props> = ({ navigation }) => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const dispatch = useDispatch();


  const quantities = useSelector((state: RootState) => state.pizzas.value.reduce((acc, pizza) => {
    acc[pizza.pizza.id] = pizza.quantity;
    return acc;
  }, {} as Record<number, number>));

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://localhost:3000/pizzas');
        setPizzas(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPizzas();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const quantity = quantities[item.id] || 0;

          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductDetail', { pizza: item })}
            >
              <View style={styles.pizzaContainer}>
                <Image source={{ uri: item.image_url }} style={styles.image} />
                <View style={styles.priceContainer}>
                  <Text style={styles.pizzaName}>{item.name}</Text>
                  <Text style={styles.pizzaPrice}>{item.price}€</Text>
                </View>

                <View style={styles.quantityContainer}>
                  <TouchableOpacity onPress={() => dispatch(addPizza(item))} style={styles.button}>
                    <Text style={styles.buttonText}>+</Text>
                  </TouchableOpacity>

                  <Text>{quantity}</Text> 

                  <TouchableOpacity onPress={() => dispatch(removePizza(item))} style={styles.button}>
                    <Text style={styles.buttonText}>-</Text>
                  </TouchableOpacity>
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
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },

  quantityContainer :{
display: 'flex',
flexDirection: 'column',
alignItems: 'center'
  },
});

export default ProductList;
