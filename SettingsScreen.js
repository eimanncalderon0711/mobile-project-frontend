import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext';

const SettingsScreen = () => {
  const {user} = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Settings Screen</Text>
      <Text style={{fontWeight:'500', fontSize:18}}>Hi, <Text style={{color: "#0064ab", fontWeight:"800"}}>{user.username}</Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcome: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SettingsScreen;
