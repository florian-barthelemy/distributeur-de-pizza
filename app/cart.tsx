import React from 'react';
import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addPizza, removePizza } from '@/redux/pizzaReducer';
import { RootState } from '@/redux/pizzaStore';


const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.pizzas.value);

    const totalPrice = cartItems.reduce((total, item) => {
        return total + item.pizza.price * item.quantity;
    }, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Votre Panier</Text>
            {cartItems.length === 0 ? (
                <Text>Votre panier est vide.</Text>
            ) : (
                <>
                    {cartItems.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <Text style={styles.itemText}>{item.pizza.name}</Text>
                            <Text style={styles.itemPrice}>{item.pizza.price} €</Text>
                            <View style={styles.quantityContainer}>
                                <TouchableOpacity onPress={() => dispatch(addPizza(item.pizza))} style={styles.button}>
                                    <Text style={styles.buttonText}>+</Text>
                                </TouchableOpacity>
                                <Text>{item.quantity}</Text>
                                <TouchableOpacity onPress={() => dispatch(removePizza(item.pizza))} style={styles.button}>
                                    <Text style={styles.buttonText}>-</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    <View style={styles.totalContainer}>
                        <Text style={styles.totalText}>Total : {totalPrice.toFixed(2)} €</Text>
                    </View>
                    <Button
                        title="Commander"
                        onPress={() => {
                            alert('Commande passée');
                        }}
                    />
                </>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    itemText: {
        fontSize: 18,
    },
    itemPrice: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    button: {
        padding: 10,
        backgroundColor: '#ddd',
        borderRadius: 5,
        margin: 10,
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
    },

    quantityContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    totalContainer: {
        marginTop: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
    totalText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Cart;
