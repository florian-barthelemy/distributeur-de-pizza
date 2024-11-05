import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { useDispatch } from 'react-redux';
import { signupUser } from '@/redux/authActions'; // Import your signup action
import { AppDispatch } from '@/redux/pizzaStore';

const SignupScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false); 

  const dispatch = useDispatch<AppDispatch>();

  const handleSignup = () => {
    const role = isAdmin ? 'admin' : 'client'; 
    dispatch(signupUser(username, password, role)); 
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        style={styles.input}
      />
      
      {/* Checkbox for admin role */}
      <TouchableOpacity onPress={() => setIsAdmin(!isAdmin)} style={styles.checkboxContainer}>
        <View style={[styles.checkbox, isAdmin && styles.checked]} />
        <Text style={styles.checkboxLabel}>Admin</Text>
      </TouchableOpacity>

      <Button title="Sign Up" onPress={handleSignup} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    height: 20,
    width: 20,
    borderColor: 'gray',
    borderWidth: 1,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: 'blue', // Change this to your desired checked color
  },
  checkboxLabel: {
    fontSize: 16,
  },
});

export default SignupScreen;
