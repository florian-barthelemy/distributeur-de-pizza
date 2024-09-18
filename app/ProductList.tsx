import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { Pizza } from '@/model/pizza';
import { RootStackParamList } from './_layout';

type ProductListNavigationProp = StackNavigationProp<RootStackParamList, 'ProductList'>;

interface Props {
  navigation: ProductListNavigationProp;
}

const ProductList: React.FC<Props> = ({ navigation }) => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await axios.get('http://10.0.2.2:3000/pizzas');
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

          return (
            <TouchableOpacity
            testID={item.name}
              onPress={() => navigation.navigate('ProductDetail', { pizza: item })}
            >
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
