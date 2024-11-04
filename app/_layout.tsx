import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Pizza } from '../model/pizza'; // Définition du type Pizza
import ProductDetail from './ProductDetail';
import ProductList from './ProductList';
import PizzaForm from './PizzaForm'
import { RootState, store } from '@/redux/pizzaStore';
import { Provider, useSelector } from 'react-redux';
import Cart from './cart';
import { loadCartFromStorage } from '@/redux/pizzaReducer';
import LoginScreen from './Login';
import SignupScreen from './Signup';
import { logout } from '@/redux/authSlice';
import { Button } from 'react-native';
import { User } from '@/model/user';
import ProductListAdmin from './ProductListAdmin';

export type RootStackParamList = {
  ProductList: undefined;
  ProductDetail: { pizza: Pizza };
  PizzaForm: {pizza: Pizza | null};
  Login: undefined;
  Signup: undefined;
};

export type RootStackParamListStore = {
  ProductList: undefined;
  ProductDetail: { pizza: Pizza };
  PizzaForm: {pizza: Pizza | null};
  Cart: undefined;
  Login: undefined;
  Signup: undefined;
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
    <Stack.Screen
      name="PizzaForm"
      component={PizzaForm}
      options={{ title: 'Sauvegarde de la Pizza' }}
    />
  </Stack.Navigator>
);

const RootLayout: React.FC = () => {
    const [isLogged, setIsLogged] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const handleLogout = () => {
      store.dispatch(logout());
    };
    useEffect(() => {
      const state = store.getState();
      setIsLogged(state.auth.isAuthenticated);
      setUser(state.auth.user);
  
      // Optionnel : Vous pouvez également vous abonner aux changements de l'état
      const unsubscribe = store.subscribe(() => {
        const newState = store.getState();
        setIsLogged(newState.auth.isAuthenticated);
        setUser(newState.auth.user);
      });

      // Nettoyage de l'abonnement
      return () => {
        unsubscribe();
      };
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
        {!isLogged  && (
          <>
            <Tab.Screen
              name="Login"
              component={LoginScreen}
              options={{ title: 'Connexion' }}
            />
            <Tab.Screen
              name="Signup"
              component={SignupScreen}
              options={{ title: 'Inscription' }}
            />
          </>
        )}
        {(user && user.role.toLowerCase()=='admin') &&(
          <Tab.Screen
          name='Admin'
          component={ProductListAdmin}
          options={{title: 'Admin'}}/>
        )}
        {/* Onglet du panier */}
        <Tab.Screen
          name="cart"
          component={Cart}
          options={{ title: 'Panier', tabBarTestID: 'cart' }}
        />
      </Tab.Navigator>
      {isLogged && (
          <Button title="Déconnexion" onPress={handleLogout} />
        )}
          </Provider>
  );
};

export default RootLayout;
