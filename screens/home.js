import { Image, ImageBackground, View, StyleSheet, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useEffect, useState, useCallback  } from 'react';
import { useNavigation, } from '@react-navigation/native';
import { getAuth, signOut } from "firebase/auth";
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import db from '../config/firebase';
import ResultCard from '../components/resultCard';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default Home = () => {
  const navigator = useNavigation();
  const [resulties, setResulties] = useState([]);
  const auth = getAuth();

  const getData = useCallback(async () => {
    try {
        const answersQuery = query(collection(db, 'users', auth.currentUser.uid, 'answers'), orderBy('timestamp', 'desc'));
        const answersSnapshot = await getDocs(answersQuery);
      
        const results = answersSnapshot.docs.map(doc => doc.data().metadata);
        setResulties(results);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigator.addListener('focus', () => {
      getData();
    });

    return unsubscribe;
  }, [navigator, getData]);

  const logout = async () => {
    signOut(auth);
    await AsyncStorage.removeItem('userData');
  }
  
  const onSelect = (result) => {
    if(!result) {
      navigator.navigate('Questionary');
    } else {
      navigator.navigate('Result', {
        metadata: result
      })
    }
  }

  return (
    <ImageBackground style={styles.img} source={require('../assets/Home.png')}>
      <TouchableOpacity
              style={styles.logout}  onPress={() => logout()}
              >
       <Image style={styles.logoutImg} source={require('../assets/logout.png')}/>
      </TouchableOpacity>
      <View style={styles.container}>
        <Image style={styles.logo} source={require('../assets/logo.png')}/>
        <View style={styles.verticleLine}></View>
      </View>
      <View style={styles.resultContainer}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Resultados</Text>
        </View>

        <ScrollView style={{ height: 450 }}>
          <View style={styles.resultCards}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => onSelect()}
              >
                <ResultCard />
              </TouchableOpacity>
            {resulties.map((result, index) => (
              <TouchableOpacity
                key={index}
                style={styles.button}
                onPress={() => onSelect(result)}
              >
                <ResultCard result={result}/>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  img: {
    flex: 1,
    alignItems: 'center',
    width: null,
    height: null,
  },
  logout: {
    position: 'absolute',
    top: 70,
    right: 20,
  },
  logoutImg: {
    width: 30,
    height: 30,

  },
  container: {
    marginTop: 100,
    position: 'relative',
  },
  logo: {
    left: -20
  },
  verticleLine: {
    height: '100%',
    width: 2,
    backgroundColor: '#fff',
    marginLeft: -19,
    marginTop: -1,
  },
  resultContainer: {
    position: 'absolute',
    top: '37%',
    width: '100%',
    //backgroundColor: '#735DB8',
    zIndex: 1,
  },
  textContainer: {
    width: '40%',
    height: 40,
    marginBottom: 20,
    backgroundColor: '#735DB8',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100,
  },
  text: {
    fontSize: 25,
    color: '#fff',
    fontWeight: 'bold'
  },
  resultCards: {
    width: '60%',
    gap: 50,
    alignSelf: 'center',
  },
});
