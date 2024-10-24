import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAuth } from './AuthContext';

const SettingsScreen = () => {
  const {user} = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Settings Screen this is  me {user.username}</Text>
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
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SettingsScreen;
