// AuthContext.js
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
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
            const response = await axios.post('http://192.168.1.19/api/register.php', {
                username,
                password,
            });
            if (response.data.error){
                setIsLoading(false);
                throw new Error(response.data.error);
            }
            setUser({ username });

        } catch (error) {
            console.error('Registration error:', error.message);
            throw error; 
        }
        finally {
            setIsLoading(false);
        };
    };

    //mao ni sya ang function para mo login ug mo check sa xampp database if user exist ayha mo login sa profile screen
    const login = async (username, password) => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://192.168.1.19/api/login.php', {
                username,
                password,
            });
            if (response.data.error) {
                setIsLoading(false);
                throw new Error(response.data.error);
            }
            setUser({ username });
            
        } catch (error) {
            console.error('Login error:', error.message);
            throw error; 
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
