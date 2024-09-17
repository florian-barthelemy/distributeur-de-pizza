import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Pizza } from '../model/pizza'; // Définition du type Pizza
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';
import { store } from '@/redux/pizzaStore';
import { Provider} from 'react-redux';
import Cart from './cart';
import { loadCartFromStorage } from '@/redux/pizzaReducer';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { pizza: Pizza };
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const ProductStack = () => (
  <Stack.Navigator initialRouteName="ProductList">
    <Stack.Screen name="ProductList" component={ProductList} options={{ title: 'Pizzas' }} />
    <Stack.Screen name="ProductDetail" component={ProductDetail} options={{ title: 'Détails de la Pizza' }} />
  </Stack.Navigator>
);

const RootLayout:React.FC = () => {
  useEffect(() => {
    store.dispatch(loadCartFromStorage());
  }, []);


  return (
    <Provider store={store}>
        <Tab.Navigator>
          <Tab.Screen
            name="ProductList"
            component={ProductStack}
            options={{ title: 'Pizzas', headerShown: false }}
          />
          <Tab.Screen
            name="cart"
            component={Cart}
            options={{ title: 'Panier' }}
          />
        </Tab.Navigator>
    </Provider>
  );
};

export default RootLayout;