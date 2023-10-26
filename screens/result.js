import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useRoute} from '@react-navigation/native';

export default Result = () => {
  const router = useRoute();
  const { metadata } = router.params;

  return (
    <View style={ styles.img } backgroundColor={ metadata.color } source={ require('../assets/Home.png') }>
      <View style={ styles.content }>
        <ScrollView >
          <Text style={ styles.title }>{ metadata.name }</Text>
          <Text style={ styles.date }></Text>
          <Text style={ styles.title }>Resultado: {metadata.value }</Text>
          <Text style={ styles.orientation }>{ metadata.orientation }</Text>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    flex: 1,
    alignItems: 'center',
    width: null,
    height: null,
  },
  content: {
    flex: 1,
    marginTop: 60,
    paddingTop: 20,
    width: '90%',
    borderTopStartRadius: 40,
    borderTopEndRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#240F74'
  },
  date: {

  },
  orientation: {
    margin: 20,
    textAlign: 'justify',
    fontSize: 20,
    color: '#240F74'
  }
});