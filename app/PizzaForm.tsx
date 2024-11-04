import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, ScrollView } from 'react-native';
import { useDispatch } from 'react-redux';
import { createPizza, updatePizza } from '@/redux/pizzaReducer'; // Importez les actions Redux
import { Pizza } from '../model/pizza'; // Type pour la pizza
import { AppDispatch } from '@/redux/pizzaStore';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamListStore } from './_layout';

type PizzaFormRouteProp = RouteProp<RootStackParamListStore, 'PizzaForm'>;
type PizzaFormNavigationProp = StackNavigationProp<RootStackParamListStore, 'PizzaForm'>;

interface Props {
    route: PizzaFormRouteProp;
    navigation: PizzaFormNavigationProp;
  }

const PizzaForm: React.FC<Props> = ({ route, navigation }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { pizza } = route.params;
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(''); 
  const [imageUrl, setImageUrl] = useState(''); 

  useEffect(() => {
    if (pizza) {
      setName(pizza.name);
      setPrice(pizza.price.toString());
      setDescription(pizza.description || ''); 
      setImageUrl(pizza.image_url || ''); 
    }
  }, [pizza]);

  const onSuccess = () => {
    navigation.navigate('ProductList');
  };

  // Soumission du formulaire
  const handleSubmit = async() => {
    if (name && price && description && imageUrl) {
      const pizzaData:Pizza = {
        id:0,
        name,
        price: parseFloat(price),
        description,
        image_url: imageUrl,
      };

      try {
        if (pizza) {
          await dispatch(updatePizza({ pizza: pizzaData, pizzaId: pizza.id }));
        } else {
          await dispatch(createPizza(pizzaData));
        }

        // Appel de la fonction onSuccess après la création ou la mise à jour réussie
        onSuccess();
      } catch (error) {
        console.error("Erreur lors de la soumission:", error);
        alert("Une erreur s'est produite. Veuillez réessayer.");
      }
    } else {
      alert("Veuillez remplir tous les champs.");
    }
  };

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>

      <Text>Nom de la pizza :</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Nom"
        style={{ borderWidth: 1, padding: 8, marginVertical: 8 }}
      />

      <Text>Prix de la pizza :</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder="Prix"
        keyboardType="numeric"
        style={{ borderWidth: 1, padding: 8, marginVertical: 8 }}
      />

      <Text>Description :</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Description"
        multiline={true}
        numberOfLines={4}
        style={{ borderWidth: 1, padding: 8, marginVertical: 8, textAlignVertical: 'top' }}
      />

      <Text>URL de l'image :</Text>
      <TextInput
        value={imageUrl}
        onChangeText={setImageUrl}
        placeholder="URL de l'image"
        style={{ borderWidth: 1, padding: 8, marginVertical: 8 }}
      />

      <Button
        title={pizza ? 'Mettre à jour la pizza' : 'Ajouter la pizza'}
        onPress={handleSubmit}
      />
    </ScrollView>
  );
};

export default PizzaForm;
