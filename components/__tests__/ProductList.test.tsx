import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import axios from 'axios';
import { Pizza } from '@/model/pizza';
import ProductList from '@/app/ProductList';

// Mock d'axios pour simuler l'appel API
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('ProductList', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockPizzas: Pizza[] = [
    {
        id: 1, name: 'Margherita', price: 8, image_url: 'https://example.com/margherita.jpg',
        description: ''
    },
    {
        id: 2, name: 'Pepperoni', price: 10, image_url: 'https://example.com/pepperoni.jpg',
        description: ''
    },
  ];

  it('affiche la liste des pizzas après le chargement des données', async () => {
    // Simuler la réponse d'axios
    mockedAxios.get.mockResolvedValueOnce({ data: mockPizzas });

    const { getByText } = render(<ProductList navigation={mockNavigation as any} />);

    // Attendre que les pizzas soient chargées
    await waitFor(() => {
      expect(getByText('Margherita')).toBeTruthy();
      expect(getByText('Pepperoni')).toBeTruthy();
    });
  },10000);

  it('navigue vers les détails de la pizza lorsqu\'on appuie dessus', async () => {
    // Simuler la réponse d'axios
    mockedAxios.get.mockResolvedValueOnce({ data: mockPizzas });

    const { getByText } = render(<ProductList navigation={mockNavigation as any} />);

    // Attendre que les pizzas soient chargées
    await waitFor(() => {
      expect(getByText('Margherita')).toBeTruthy();
    });

    // Simuler l'appui sur une pizza
    fireEvent.press(getByText('Margherita'));

    // Vérifier que la navigation a été appelée avec les bons paramètres
    expect(mockNavigation.navigate).toHaveBeenCalledWith('ProductDetail', {
      pizza: mockPizzas[0],
    });
  });

  it('affiche une erreur si l\'appel API échoue', async () => {
    // Simuler une erreur d'axios
    mockedAxios.get.mockRejectedValueOnce(new Error('Erreur de chargement'));

    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const { queryByText } = render(<ProductList navigation={mockNavigation as any} />);

    // Attendre que l'erreur soit enregistrée dans la console
    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith(new Error('Erreur de chargement'));
    });

    // Vérifier que la liste des pizzas n'est pas rendue
    expect(queryByText('Margherita')).toBeNull();
    expect(queryByText('Pepperoni')).toBeNull();

    consoleErrorSpy.mockRestore();
  });
});
