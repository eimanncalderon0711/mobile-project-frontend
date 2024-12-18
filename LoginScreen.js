import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useAuth } from './AuthContext';
import AntDesign from '@expo/vector-icons/AntDesign';

const LoginScreen = ({ navigation }) => {
  const {login, isLoading} = useAuth();
  const [email, setEmail] = useState('');
  const [show, setShow] = useState(true);
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    await login(email, password, navigation);
    
  };

  return (
    <>
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(e)=>setEmail(e)}
      />
       <View style={{backgroundColor:'white', height:50, borderRadius:5, paddingHorizontal:10, borderColor: '#ccc', borderWidth:1,  flexDirection:'row' , alignItems:"center"}}>
      <TextInput
        style={{flex:1}}
        placeholder="Password"
        value={password}
        onChangeText={(e) => setPassword(e)}
        secureTextEntry={show}
      />
      <TouchableOpacity onPress={() => setShow(!show)}>
        <AntDesign name="eye" size={24} color="black" />
      </TouchableOpacity>
      </View>
      {isLoading ? <ActivityIndicator size={"large"} color={"black"}/> : (<TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>) }
      <View style={{paddingTop:20}}>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{fontSize:15, fontWeight: 400}}>Dont Have An Accout? <Text style={{color:'blue', fontWeight:500}}> Register Here</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    marginTop: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#bde0e2',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LoginScreen;
