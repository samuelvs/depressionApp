import { View, StyleSheet } from 'react-native';
import ProgressBar from 'react-native-progress/Bar';

const ProgressBarComponent = ({ currentIndex, totalIndices }) => {
  const progress = currentIndex / (totalIndices - 1);

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <ProgressBar progress={progress}  style={styles.progress}  width={290} color={'#2f1886'} />
    </View>
  );
};

const styles = StyleSheet.create({
  progress: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#fff'
  },
});

export default ProgressBarComponent;