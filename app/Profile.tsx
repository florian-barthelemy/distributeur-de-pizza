import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoyaltyPoints, updateLoyaltyPoints } from '@/redux/loyaltyActions';
import { AppDispatch, RootState } from '@/redux/pizzaStore';
import { FlatList, ScrollView } from 'react-native-gesture-handler';

const Profile = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const userPoints = useSelector((state: RootState) => state.loyaltyPoints.points);
  const userHistorique = useSelector((state: RootState) => state.loyaltyPoints.history);

  useEffect(() => {
    console.log("userHistorique : " + userHistorique);
    if (user) {
      dispatch(fetchLoyaltyPoints(user.id));
    }
  },[]);

  const UserHistoriqueList: React.FC<{ item: {date: string, points: number} }> = ({ item }) => (
    <View style={styles.historiqueContainer}>
        <Text>Le {item.date}, le solde est de : {item.points}€</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profil Utilisateur</Text>
      <Text>Bonjour {user?.username}</Text>
      <Text>Points de fidélité: {userPoints}</Text>
      <Text>Historique de fidélité :</Text>
      <ScrollView>
      <FlatList 
      data={userHistorique}
      renderItem={({ item }) => <UserHistoriqueList item={item} />}
      />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
  },
  historiqueContainer: {
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#FFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  }
});

export default Profile;
