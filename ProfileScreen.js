import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from './AuthContext';
import React, { useEffect, useRef, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';
import {ASTRA_API_URL, ASTRA_API_KEY, NAMESPACE, COLLECTION} from './astra-server'

export const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxmusfei9/image/upload";
export const CLOUDINARY_UPLOAD_PRESET = "profile_uploads";

const ProfileScreen = () => {
  const {user, setIsLoading} = useAuth();
  const[edit, setEdit] = useState(false);
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [address, setAddressname] = useState("");
  const[img, setImg] = useState(user.profile);

  const ref = useRef(null)


  useEffect( () => {
    setIsLoading(false);
  },[])

  useEffect( () => {
    axios.get(`${ASTRA_API_URL}/api/rest/v2/namespaces/${NAMESPACE}/collections/${COLLECTION}/${user.id}`,{
      headers: {
        'Content-Type': 'application/json',
        'x-cassandra-token': ASTRA_API_KEY
    }
    })
    .then((response) => {
      const userData = response.data.data;
      setFirstname(userData.firstName)
      setLastname(userData.lastName)
      setAddressname(userData.address)
    })
    .catch(error => console.log(error))
  },[]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImg(result.assets[0].uri);
      uploadPhoto(result.assets[0].uri);
    }

  };

 
  const uploadPhoto = async (img) => {
    const formData = new FormData();
    formData.append('file', {
      uri: img,
      name: 'photo.jpeg',
      type: 'image/jpeg',
    })
    try {
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
      const cloudinaryResponse = await axios.post(CLOUDINARY_URL, formData, {
        headers:{ 'Content-Type': 'multipart/form-data'}
      });
      const img_url = cloudinaryResponse.data.secure_url
      const response = await axios.patch(`${ASTRA_API_URL}/api/rest/v2/namespaces/${NAMESPACE}/collections/${COLLECTION}/${user.id}`, {"profile": img_url}, 
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    "x-cassandra-token": ASTRA_API_KEY,
                }
            })
        console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const saveInfo = async () => {
    const response = await axios.patch(`${ASTRA_API_URL}/api/rest/v2/namespaces/${NAMESPACE}/collections/${COLLECTION}/${user.id}`, 
    {"firstName": firstName, "lastName":lastName, "address": address}, 
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    "x-cassandra-token": ASTRA_API_KEY,
                }
            })
    Alert.alert("Update Successful", "Account updated successfully")
    setEdit(false)
  }
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        {!img ? <TouchableOpacity onPress={pickImage} style={{width: 150, height:150, justifyContent:'center', alignItems: 'center'}}>
          <Entypo name="camera" size={50} color="black" />
        </TouchableOpacity>: <View style={{width: 150, height:150, justifyContent:'center', alignItems: 'center'}}>
          <Image source={{uri:img}} width={150} height={150} resizeMode='cover' style={{borderRadius:300}}/>
          <TouchableOpacity onPress={pickImage} style={{position:'absolute', right:-10, bottom:0, backgroundColor:"white", padding:15, borderRadius:500}}>
            <Entypo name="camera" size={30} color="brown"/>
          </TouchableOpacity>
        </View>}
      </View>
      <Text style={{fontSize:20, fontWeight:'800'}}>{user.username}</Text>
      <View style={{width:'100%', paddingHorizontal:20, display:'flex', alignItems:'center', justifyContent:'center'}}>
        <View style={{width:'100%', marginTop:20, backgroundColor: edit ? 'white': '#c0c0c0' }}>
          <TextInput editable={edit ? true : false} placeholder='First Name' value={firstName} onChangeText={(e) => setFirstname(e)} style={{paddingVertical: 5, paddingHorizontal:10, borderWidth:1, borderRadius:5}}/>
        </View>
        <View style={{width:'100%', marginTop:20, backgroundColor: edit ? 'white': '#c0c0c0' }}>
          <TextInput editable={edit ? true : false} placeholder='Last Name' value={lastName} onChangeText={(e) => setLastname(e)} style={{paddingVertical: 5, paddingHorizontal:10, borderWidth:1, borderRadius:5}}/>
        </View>
        <View style={{width:'100%', marginVertical:20, backgroundColor: edit ? 'white': '#c0c0c0' }}>
          <TextInput editable={edit ? true : false} placeholder='Address' value={address} onChangeText={(e) => setAddressname(e)} style={{paddingVertical: 5, paddingHorizontal:10, borderWidth:1, borderRadius:5}}/>
        </View>
      <View style={{flexDirection:'row', justifyContent:'space-evenly', width:'100%'}}>
        {edit ? <View>
          <TouchableOpacity onPress={saveInfo}>
            <Text style={{paddingHorizontal:50, 
            paddingVertical:10, 
            backgroundColor:'#668f08', 
            color:'white', 
            fontSize:15, 
            fontWeight:'600', 
            borderRadius:8}}>Save</Text>
          </TouchableOpacity>
        </View>:
        <View>
          <TouchableOpacity onPress={() => {
            setEdit(true)
            }}>
            <Text style={{paddingHorizontal:50, 
            paddingVertical:10, 
            backgroundColor:'#0e4772', 
            color:'white', 
            fontSize:15, 
            fontWeight:'600', 
            borderRadius:8}}>Edit</Text>
          </TouchableOpacity>
        </View>}
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
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
  imgContainer:{
    marginVertical:25,
    borderWidth:1,
    backgroundColor:'rgba(0,0,0,0.4)',
    borderRadius: 300
  }
});

export default ProfileScreen;
