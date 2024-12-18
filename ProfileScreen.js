import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useAuth } from './AuthContext';
import React, { useEffect, useState } from 'react';
import Entypo from '@expo/vector-icons/Entypo';
import axios from 'axios';
import {ASTRA_API_URL, ASTRA_API_KEY, NAMESPACE, COLLECTION} from './astra-server'

export const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dxmusfei9/image/upload";
export const CLOUDINARY_UPLOAD_PRESET = "profile_uploads";

const ProfileScreen = () => {
  const {user, setIsLoading} = useAuth();
  const[img, setImg] = useState(user.profile);
  useEffect( () => {
    setIsLoading(false);
  },[])

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
      <Text style={styles.welcome}>Welcome {user.username}</Text>
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
  imgContainer:{
    marginVertical:25,
    borderWidth:1,
    backgroundColor:'rgba(0,0,0,0.4)',
    borderRadius: 300
  }
});

export default ProfileScreen;
