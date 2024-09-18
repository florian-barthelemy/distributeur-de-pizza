import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { useDispatch } from 'react-redux';
import { addPizza } from '@/redux/pizzaReducer';
import ProductDetail from '@/app/ProductDetail';

// Mock du hook useDispatch de Redux
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

// Mock de l'action addPizza
jest.mock('@/redux/pizzaReducer', () => ({
  addPizza: jest.fn(),
}));

describe('ProductDetail', () => {
  const mockDispatch = jest.fn();
  const mockNavigation = {
    navigate: jest.fn(),
  };

  const mockPizza = {
    id: 1,
    name: 'Margherita',
    description: 'Une délicieuse pizza margherita',
    price: 8,
    image_url: 'https://example.com/margherita.jpg',
  };

  const mockRoute = {
    params: {
      pizza: mockPizza,
    },
  };

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('affiche les détails de la pizza correctement', () => {
    const { getByText, getByLabelText } = render(
      <ProductDetail route={mockRoute as any} navigation={mockNavigation as any} />
    );
  
    expect(getByText('Margherita')).toBeTruthy();
    expect(getByText('Description: Une délicieuse pizza margherita margherita.')).toBeTruthy();
    expect(getByText('Prix: 8€')).toBeTruthy();
  
    const image = getByLabelText('Pizza Image');
    expect(image.props.source.uri).toBe('https://example.com/margherita.jpg');
  });

  it('ajoute la pizza au panier lorsqu\'on appuie sur le bouton', () => {
    const { getByText } = render(
      <ProductDetail route={mockRoute as any} navigation={mockNavigation as any} />
    );

    const button = getByText('Ajouter au panier');
    fireEvent.press(button);

    // Vérifier que l'action addPizza a été dispatchée avec la bonne pizza
    expect(mockDispatch).toHaveBeenCalledWith(addPizza(mockPizza));
  });
});
