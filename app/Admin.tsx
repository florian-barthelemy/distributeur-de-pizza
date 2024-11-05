import React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const Admin = () => {
    const state = useSelector((state) => state); 
  
    return (
      <View>
        <Text>Section Admin</Text>
        <Text>{JSON.stringify(state)}</Text> 
      </View>
    );
  };
  
  export default Admin;