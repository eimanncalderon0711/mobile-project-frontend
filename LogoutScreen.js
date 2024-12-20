import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SupportScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Are Your sure you want to logout?</Text>
      <View>
      <View>
          <TouchableOpacity onPress={() => navigation.replace('Login')}>
            <Text style={{paddingHorizontal:50, 
            paddingVertical:10, 
            backgroundColor:'#f02b1c', 
            color:'white', 
            fontSize:15, 
            fontWeight:'600', 
            borderRadius:8}}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    fontSize:20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default SupportScreen;
