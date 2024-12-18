// AuthContext.js
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { Alert} from 'react-native';
import {ASTRA_API_URL, ASTRA_API_KEY, NAMESPACE, COLLECTION} from './astra-server'
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setLoading(false);
    }, []);

    //Mao ni sya ang function sa registration para mo store sa xampp sql db ang data
    const register = async (username, password) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${ASTRA_API_URL}/api/rest/v2/namespaces/${NAMESPACE}/collections/${COLLECTION}`, {username,password,}, 
            {
                headers: 
                {
                    'Content-Type': 'application/json',
                    "x-cassandra-token": ASTRA_API_KEY,
                }
            }
            
            );
            const data = response.data;
            console.log(data);
            if (response.data.error){
                setIsLoading(false);
                throw new Error(response.data.error);
            }
          

        } catch (error) {
            console.error('Registration error:', error.message);
            throw error; 
        }
        finally {
            setIsLoading(false);
        };
    };

    //mao ni sya ang function para mo login ug mo check sa xampp database if user exist ayha mo login sa profile screen
    const login = async (username, password, navigation) => {
        setIsLoading(true);
        try {
            // Construct the query and URL for astra na query
            const query = JSON.stringify({ username: { $eq: username } });
            const queryUrl = `${ASTRA_API_URL}/api/rest/v2/namespaces/${NAMESPACE}/collections/${COLLECTION}?where=${encodeURIComponent(query)}`;
    
            // Send the request
            const response = await axios.get(queryUrl, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-cassandra-token': ASTRA_API_KEY,
                },
            });
    
            const userData = response.data.data;
            const userId = Object.keys(userData)[0]; // Get the dynamic key sa object
            const user = userData[userId]; // Access the user object
    
            // Validate password
            if (user.password === password) {
                console.log('Login successful');
                setUser({id:userId, username:user.username, profile:user.profile});
                navigation.replace("Home")
            } else {
                Alert.alert("Login Failed", "Invalid Username or Password")
            }
            
            // Handle the response...
        } catch (error) {
            Alert.alert("Login Failed", "Invalid Username or Password")
            // console.error('Login error:', error.response?.data || error.message || 'Unknown error');
        } finally {
            setIsLoading(false);
        }
    };


    const value = useMemo(() => ({ user, isLoading, setIsLoading, login, register,  }), [user, isLoading, setIsLoading]);

    return (
        //diri dayun ge wrap nato ang mga screens as child sa context para ma global nato ang state and ma render sa bisag asa nga screens ang state to minimize prop drilling
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
