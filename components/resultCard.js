import { View, StyleSheet, Text, Image } from 'react-native';
import DoubleCircle from '../components/doubleCircle';
import getResultMetadata from '../utils/getResultMedatada'

const ResultCard = ({ result }) => {
  
  let color = '#735DB8';
  let resultText = 'Realize um novo teste';
  {/*let resultText = 'Aguarde a data para um novo teste';*/}
 
  if (result?.value > -1) {
    const metadata = getResultMetadata(result?.value);
    color = metadata?.color;
    resultText = `${result?.value} - ${metadata.name}`;
  }

  return (
    <View>
      <View style={styles.line}></View>
      <View style={styles.content}>
        <DoubleCircle style={styles.card} result={result} color={color} />
        <View style={styles.textContent} backgroundColor={color}>
           {/*{!result?.value && <Image style={styles.img} source={require('../assets/block.png')}/>}*/}
          <Text style={styles.text}>{resultText}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  line: {
    top: '45%',
    height: 2,
    width: '50%',
    backgroundColor: '#fff',
    position: 'absolute',
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    gap: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textContent: {
    padding: 15,
    backgroundColor: '#735DB8',
    height: 'auto',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 30
  },
  img: {
    marginRight: 10
  },
  text: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    flex: 1
  }
});

export default ResultCard;
