import { Image, ImageBackground, View, StyleSheet, Text } from 'react-native';
import { useNavigation, } from '@react-navigation/native';
import React, { useState } from 'react';
import Question from '../components/question'
import ProgressBar from '../components/progressBar'
import questions from '../utils/questions';
import getResultMetadata from '../utils/getResultMedatada';
import { getAuth } from "firebase/auth";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import db from '../config/firebase';

export default Questionary =  () => {
  const [questionsList] = useState(questions);
  const [indexQuestion, setIndexQuestion] = useState(0);
  const [result, setResult] = useState(0);
  const auth = getAuth();


  const navigator = useNavigation();

  const saveAnswer = async (metadata) => {
    try {
      const userAnswersCollection = collection(db, 'users', auth.currentUser.uid, 'answers');
      await addDoc(userAnswersCollection, {
        metadata: metadata,
        timestamp: serverTimestamp()
      });
    } catch (error) {
      console.error('Erro ao salvar respostas:', error);
    }
  };

  const onSelectAnswer = async  (answer) => {
    setResult(result+answer);
    
    if (indexQuestion < questionsList.length - 1) {
      setIndexQuestion(indexQuestion + 1);
    } else {
      const metadata = getResultMetadata(result);

      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
      const currentMonth = monthNames[currentDate.getMonth()];
      metadata['day'] = currentDay;
      metadata['month'] = currentMonth;

      saveAnswer(metadata);
      navigator.replace('Result', {
        metadata: metadata
      });
    }
  };

  return (
    <ImageBackground style={ styles.img } source={require('../assets/Home.png')}>
      <View style={ styles.content} >
        <View style={ styles.questionContainer } >
          <Question
            alternatives={questionsList[indexQuestion].alternatives}
            onSelect={onSelectAnswer}
          />
        </View>
        <View style={ styles.progressBarContainer } >
          <ProgressBar
            currentIndex={indexQuestion}
            totalIndices={questionsList.length}
          />
        </View>
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
  content: {
    flex: 1,
    marginTop: 60,
    justifyContent: 'space-between',
  },
  questionContainer: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  progressBarContainer: {
    marginBottom: 50,
  },
});