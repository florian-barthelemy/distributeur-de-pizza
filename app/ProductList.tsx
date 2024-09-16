import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,  Image, } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Pizza } from '@/model/pizza';
import { RootStackParamList } from './_layout';



type ProductListNavigationProp = StackNavigationProp<RootStackParamList, 'ProductList'>;

interface Props {
  navigation: ProductListNavigationProp;
}

const pizzas: Pizza[] = [
  { id: '1', name: 'Margherita', description:'Test', price: 8, image_url:'https://www.dominos.fr/ManagedAssets/FR/product/PCBQ/FR_PCBQ_fr_hero_13347.png?v1398276305' },
  { id: '2', name: 'Pepperoni', description:'Test', price: 10, image_url:'https://www.dominos.fr/ManagedAssets/FR/product/PCBQ/FR_PCBQ_fr_hero_13347.png?v1398276305' },
  { id: '3', name: 'Vegetarian', description:'Test', price: 9, image_url:'https://www.dominos.fr/ManagedAssets/FR/product/PCBQ/FR_PCBQ_fr_hero_13347.png?v1398276305' },
];

const ProductList: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetail', { pizza: item })}
          >
            <View style={styles.pizzaContainer}>
              <Image source={{uri: item.image_url}} style={styles.image}/>
              <View style={styles.priceContainer}>
              <Text style={styles.pizzaName}>{item.name}</Text>
              <Text style={styles.pizzaPrice}>{item.price}€</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
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

  priceContainer:{
    display: 'flex',
    alignItems : 'center'
  }
});

export default ProductList;
