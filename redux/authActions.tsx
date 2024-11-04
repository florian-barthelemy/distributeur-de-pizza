import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppDispatch } from '@/redux/pizzaStore';
import { loginSuccess, logout } from './authSlice';
import { User } from '@/model/user';

// Replace with your API base URL
const API_URL = 'https://your-api-url.com/api';

export const loginUser = (username: string, password: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`http://localhost:3000/login`, { username, password });
    const user:User = response.data; 
    dispatch(loginSuccess({user})); 
  } catch (error) {
    console.error('Login failed:', error);
   
  }
};


export const signupUser = (username: string, password: string, role: string) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.post(`http://localhost:3000/register`, { username, password, role });
    const user:User= response.data; 

    dispatch(loginSuccess({ user})); 
  } catch (error) {
    console.error('Signup failed:', error);
  }
};

export const logoutUser = () => async (dispatch: AppDispatch) => {
  await AsyncStorage.removeItem('token');
  dispatch(logout()); 
};
