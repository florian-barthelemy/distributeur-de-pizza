import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductList from '../components/product/ProductList';
import ProductDetail from '../components/product/ProductDetail';
import { Pizza } from '../model/pizza'; // Définition du type Pizza

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { pizza: Pizza };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ProductList">
        <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Pizzas' }} />
        <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Détails de la Pizza' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

