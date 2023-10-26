import { Image, ImageBackground, View, StyleSheet, Text,RefreshControl, TouchableOpacity, ScrollView, ActivityIndicator, } from 'react-native';
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
  const [loading, setLoading] = useState(false);
  const [refresing, setRefresing] = useState(true);
  const auth = getAuth();

  const getData = useCallback(async () => {
    try {
      const answersQuery = query(collection(db, 'users', auth.currentUser.uid, 'answers'), orderBy('timestamp', 'desc'));
      const answersSnapshot = await getDocs(answersQuery);
    
      const results = answersSnapshot.docs.map(doc => doc.data().metadata);
      setResulties(results);
    } catch (e) {
      console.log(e);
    } finally {
      setRefresing(false);
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

  const onRefresh = useCallback(async () => {
    setRefresing(true);
    await getData(); 
    setRefresing(false);
  }, []);

  return (
    <ImageBackground style={styles.img} source={require('../assets/Home.png')}>
      <TouchableOpacity style={styles.logout}  onPress={() => logout()}>
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

        <ScrollView
          style={{ flex: 1 }}
          refreshControl={
            <RefreshControl
              refreshing={refresing}
              onRefresh={onRefresh}
              colors={['#240F74']} // Adicione cores de carregamento (opcional)
            />}>
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
  overlay: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    backgroundColor: 'rgba(255,255,255,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
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
    bottom: 0,
    width: '100%',
    zIndex: 1,
    height: '65%'
  },
  textContainer: {
    width: '40%',
    height: 40,
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
    paddingTop: 20,
    paddingBottom: 100,
  },
});
