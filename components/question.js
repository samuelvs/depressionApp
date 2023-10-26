import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Question = ({ alternatives, onSelect }) => {
  return (
    <View style={styles.container}>
      {alternatives.map((alt, index) => (
        <TouchableOpacity
          key={index}
          style={styles.button}
          onPress={() => onSelect(index)}
        >
          <Text style={styles.text}>{alt}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    gap: 15
  },
  button: {
    width: 300,
    backgroundColor: '#EFEFEF',
    padding: 20,
    borderRadius: 7,
    marginBottom: 10,
    flex: 1,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    fontSize: 22,
    color: '#2f1886',
    textAlign: 'center',
  }
});

export default Question;
