import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Pizza } from '../model/pizza'; // Définition du type Pizza
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';
import { store } from '@/redux/pizzaStore';
import { Provider } from 'react-redux';
import Cart from './Cart';
import { loadCartFromStorage } from '@/redux/pizzaReducer';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { pizza: Pizza };
};

export type RootStackParamListStore = {
  ProductList: undefined;
  ProductDetail: { pizza: Pizza };
  Cart: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const ProductStack = () => (
  <Stack.Navigator initialRouteName="ProductList">
    <Stack.Screen
      name="ProductList"
      component={ProductList}
      options={{ title: 'Pizzas' }}
    />
    <Stack.Screen
      name="ProductDetail"
      component={ProductDetail}
      options={{ title: 'Détails de la Pizza' }}
    />
  </Stack.Navigator>
);

const RootLayout: React.FC = () => {
  useEffect(() => {
    // Charger le panier depuis AsyncStorage
    store.dispatch(loadCartFromStorage());
  }, []);

  return (
    <Provider store={store}>
      <Tab.Navigator>
        {/* Onglet de la liste de produits avec la pile */}
        <Tab.Screen
          name="ProductList"
          component={ProductStack} // Utilise `ProductStack` comme composant pour l'onglet "Pizzas"
          options={{ title: 'Pizzas', headerShown: false }}
        />
        {/* Onglet du panier */}
        <Tab.Screen
          name="Cart"
          component={Cart}
          options={{ title: 'Panier', tabBarTestID: 'cart' }}
        />
      </Tab.Navigator>
    </Provider>
  );
};

export default RootLayout;
