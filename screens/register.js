import React from "react";
import {
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
  View,
} from "react-native";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth();

function Register({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });

  async function signUp() {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      const user = userCredential.user;
      await signInWithEmailAndPassword(auth, user.email, user.password);
      
      const dataToSave = `${user.email}:${user.password}`;
      await AsyncStorage.setItem('userData', dataToSave);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    } finally {
      setLoading(false);
    }
  }

  back = () => {
    navigation.goBack();
  }


  return (
    <View style={styles.content}>
      {loading && (
        <View style={styles.overlay}>
          <ActivityIndicator size="large" color="#240F74" />
        </View>
      )}
      <TouchableOpacity style={styles.back}  onPress={() => back()}>
       <Image style={styles.backImg} source={require('../assets/back.png')}/>
      </TouchableOpacity>
      <View style={styles.contentBack}></View>
      <View style={styles.centeredContainer}>
        <View style={styles.card}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.buttonLogin} onPress={signUp}>
            <Text style={styles.text}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default Register;

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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
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