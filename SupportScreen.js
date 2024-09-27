import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SupportScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Support Screen</Text>
      <Text style={styles.description}>This is the support screen where you can find help.</Text>
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

export default SupportScreen;
