import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Pizza } from '../model/pizza'; // Définition du type Pizza
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';



export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { pizza: Pizza };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootLayout() {
  return (
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Pizzas' }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Détails de la Pizza' }} />
      </Stack.Navigator>
  );
}

