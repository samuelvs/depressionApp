import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { useRoute} from '@react-navigation/native';
import {
  LineChart
} from "react-native-chart-kit";

export default Result = () => {
  const router = useRoute();
  const { metadata, list } = router.params;
  const labels = list.map(el => `${el.day}/${el.month}`)
  const chartData = list.map(el => el.value);
  const data = {
    labels: labels,
    datasets: [ { 
      data: chartData.map(value => Math.round(value)),
    } ]
  }

  return (
    <View style={ styles.img } backgroundColor={ metadata.color } source={ require('../assets/Home.png') }>
      <View style={ styles.content }>
        <ScrollView >
          <Text style={ styles.title }>{ metadata.name }</Text>
          <Text style={ styles.date }>{metadata.day + '/' + metadata.month}</Text>
          <LineChart 
            style={ styles.chart }
            data={data}
            width={330}
            height={256} 
            verticalLabelRotation={30}
            chartConfig={{
              backgroundColor: metadata.color,
              backgroundGradientFrom: metadata.color,
              backgroundGradientTo: metadata.color,
              backgroundGradientFromOpacity:0,
              backgroundGradientToOpacity:0,
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(36, 15, 116, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(36, 15, 116, ${opacity})`,
              style: {
                borderRadius: 16
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                // stroke: metadata.color
              },
            }}
            bezier
          ></LineChart>
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
    textAlign: 'center',
    color: '#240F74',
    marginBottom: 20,
    fontSize: 18,
    fontWeight: 'bold',

  },
  chart: {
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 20,
  },
  orientation: {
    margin: 20,
    textAlign: 'justify',
    fontSize: 20,
    color: '#240F74'
  }
});