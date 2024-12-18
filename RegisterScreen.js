import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useAuth } from './AuthContext';

const RegisterScreen = ({ navigation }) => {
  const {register, isLoading} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [show, setShow] = useState(true);
  const [show1, setShow1] = useState(true);


  const handleLogin = async () => {
    //kani e check niya if na fillup ba tanan fields kung wala mo warning syag error
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }
    //kani check niya if ang password ug confirm password kay match kung dili mo error sya
    if (password !== confirmPassword) {
        Alert.alert('Error', 'Password dont match.');
    }

    
    //if goods na tanan input mo proceed sya sa login screen para mo login naka
    if(email !== "" && password === confirmPassword){
        await register(email, password);
        navigation.navigate('Login');
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(e)=>setEmail(e)}
      />
      <View style={{backgroundColor:'white', marginBottom:15, height:50, borderRadius:5, paddingHorizontal:10, borderColor: '#ccc', borderWidth:1,  flexDirection:'row' , alignItems:"center"}}>
      <TextInput
        style={{flex:1}}
        placeholder="Password"
        value={password}
        onChangeText={(e) => setPassword(e)}
        secureTextEntry={show1}
      />
      <TouchableOpacity onPress={() => setShow1(!show1)}>
        <AntDesign name="eye" size={24} color="black" />
      </TouchableOpacity>
      </View>
      <View style={{backgroundColor:'white', height:50, borderRadius:5, paddingHorizontal:10, borderColor: '#ccc', borderWidth:1,  flexDirection:'row' , alignItems:"center"}}>
      <TextInput
        style={{flex:1}}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(e) => setConfirmPassword(e)}
        secureTextEntry={show}
      />
      <TouchableOpacity onPress={() => setShow(!show)}>
        <AntDesign name="eye" size={24} color="black" />
      </TouchableOpacity>
      </View>
      {isLoading ? <ActivityIndicator size={'large'} color={"black"}/> : (<TouchableOpacity style={[styles.button, {marginTop:10}]} onPress={handleLogin}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>)}
      <View style={{paddingTop:20}}>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{fontSize:15, fontWeight: 400}}>Already have an account? <Text style={{color:'blue', fontWeight:500}}> Login here</Text></Text>
        </TouchableOpacity>
      </View>
    </View>
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
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#bde0e2',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default RegisterScreen;
