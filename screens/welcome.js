import React from "react";
import {
  Image,
  Pressable,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  View,
} from "react-native";
import { useNavigation, } from '@react-navigation/native';

function Welcome() {
  const navigator = useNavigation();

  return (
    <View style={styles.content}>
      <View style={styles.contentBack}></View>
      <View style={styles.imgContent}>
        <Image style={styles.img} source={require('../assets/logo-complete.png')} resizeMode="cover" />
      </View>
      <View style={styles.centeredContainer}>
        <View style={styles.card}>
          <Text style={styles.title}>
            Não existe saúde sem saúde mental.
          </Text>
          <TouchableOpacity style={styles.buttonLogin} onPress={() => navigator.navigate("SignIn")}>
            <Text style={styles.text} >
              JÁ POSSUO CONTA
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonRegister} onPress={() => navigator.navigate("Register")}>
            <Text style={styles.textRegister}>
              CRIAR UMA CONTA
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Welcome;

const styles = StyleSheet.create({
  content: {
    backgroundColor: '#DCDCDC',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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
    bottom: 0
  },
  centeredContainer: {
    alignItems: 'center',
  },
  img: {
    height: '90%',
    width: '50%',
  },
  imgContent: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: 'white',
    padding: 20 ,
    borderRadius: 30,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
  },
  title: {
    fontSize: 18,
    marginBottom: 30,
    marginTop: 20,
    textAlign: 'center',
    color: '#240F74',
  },
  buttonLogin: {
    backgroundColor: '#240F74',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    height: 50,
    justifyContent: 'center',
  },
  buttonRegister: {
    borderColor: '#240F74',
    padding: 10,
    borderWidth: 2,
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
  }
});