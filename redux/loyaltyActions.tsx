import axios from 'axios';
import { AppDispatch } from '@/redux/pizzaStore';
import { setLoyaltyPoints, updateLoyaltyHistory } from './loyaltySlice';

export const fetchLoyaltyPoints = (userId: number) => async (dispatch: AppDispatch) => {
  try {
    const response = await axios.get(`http://localhost:3000/loyalty-points/${userId}`);
    dispatch(setLoyaltyPoints(response.data.loyalty_points));
  } catch (error) {
    console.error('Failed to fetch loyalty points:', error);
  }
};

export const updateLoyaltyPoints = (userId: number, newPoints: number) => async (dispatch: AppDispatch) => {
  if (userId > 0 ) {
    try {
      await axios.post(`http://localhost:3000/update-loyalty-points`, { user_id: userId, points: newPoints });
      dispatch(setLoyaltyPoints(newPoints));
      dispatch(updateLoyaltyHistory({points: newPoints, date: new Date(Date.now()).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
      })}));
      dispatch(fetchLoyaltyPoints(userId));
    } catch (error) {
      console.error('Failed to update loyalty points:', error);
    }
  } else {
    console.error('No user has been received');
  }
};
