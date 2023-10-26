import React, { useState, useEffect } from 'react';
import {
    Image,
    TouchableOpacity,
    StyleSheet,
    TextInput,
    Text,
    View,
    ActivityIndicator,
  } from "react-native";
import { useAuth } from '../hooks/useAuth';
import UserStack from './userStack';
import AuthStack from './authStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAuth, onAuthStateChanged, User, signInWithEmailAndPassword } from "firebase/auth";

export default function RootNavigation() {
    const { user } = useAuth();
    const auth = getAuth();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const bootstrapAsync = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (userData && !user) {
                try {
                    const [email, password] = userData.split(":");
                    const userCredential = await signInWithEmailAndPassword(auth, email, password);
                } catch (error) {
                    console.error(error);
                    setLoading(false);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        setLoading(true);
        bootstrapAsync();
    }, [user]);

    return loading ? 
        <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#240F74" />
        </View> :
    user ? <UserStack /> : <AuthStack />;
}

const styles = StyleSheet.create({
    back: {
      position: 'absolute',
      top: 70,
      left: 20,
      zIndex: 1,
    },
    backImg: {
      width: 30,
      height: 30,
    },
    content: {
      backgroundColor: '#DCDCDC',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    contentBack: {
      height: '50%',
      backgroundColor: '#240F74',
      borderBottomEndRadius: 50,
      borderBottomStartRadius: 50,
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    },
    centeredContainer: {
      alignItems: 'center',
      width: '80%',
    },
    card: {
      width: '100%',
      backgroundColor: 'white',
      padding: 20,
      paddingBottom: 30,
      paddingTop: 30,
      borderRadius: 30,
      marginTop: 20,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.8,
      shadowRadius: 5,
    },
    input: {
      height: 50,
      // borderColor: '#240F74',
      // borderWidth: 2,
      justifyContent: 'center',
      textAlign: 'center',
  
      backgroundColor:'#DCDCDC',
      borderRadius: 10,
      marginBottom: 10,
      paddingLeft: 10,
      fontSize: 17,
    },
    buttonLogin: {
      marginTop:20,
      backgroundColor: '#240F74',
      padding: 10,
      marginBottom: 10,
      borderRadius: 10,
      height: 50,
      justifyContent: 'center',
    },
    text: {
      fontSize: 17,
      color: 'white',
      textAlign: 'center',
    },
    textRegister: {
      fontSize: 17,
      color: '#240F74',
      textAlign: 'center',
    },
  });