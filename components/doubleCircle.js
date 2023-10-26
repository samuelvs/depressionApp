import { View, StyleSheet, Text } from 'react-native';

const DoubleCircleComponent = ({ result, color }) => {
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const currentMonth = monthNames[currentDate.getMonth()];

  const hasValue = result?.value > -1;
  const fontSize = hasValue ? 25 : 30;
  const fontSizeMonth = hasValue ? 15 : 18;

  return (
    <View style={styles.outerCircle} backgroundColor={color} width={hasValue > -1 ? 70 : 80} height={hasValue > -1 ? 70 : 80}>
      <View style={styles.innerCircle} width={hasValue > -1 ? 55 : 65} height={hasValue > -1 ? 55 : 65}>
        <Text style={[styles.dayText, { fontSize }]}>
          {result?.day || currentDay}
        </Text>
        <Text style={[styles.monthText, { fontSize: fontSizeMonth }]}>
          {result?.month || currentMonth}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerCircle: {
    borderRadius: 50,
    backgroundColor: '#735DB8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayText: {
    fontWeight: 'bold',
    color: 'black',
  },
  monthText: {
    fontWeight: 'bold',
    color: 'black',
  },
});

export default DoubleCircleComponent;
