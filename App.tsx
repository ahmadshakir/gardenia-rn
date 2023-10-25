import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Text,
  ScrollView,
  View,
  ActivityIndicator,
} from 'react-native';
import {useEffect, useState} from 'react';

type Question = {id: string; question: string};

const survey = () => {
  // const [text, onChangeText] = useState('');
  const [data, setData] = useState<Question[]>([]);
  const [inputData, setInputData] = useState<{text: string; index: number}[]>(
    [],
  );
  let submittedId = 0

  const addValues = (text: string, index: number) => {
    const dataArray = inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach(element => {
        if (element.index === index) {
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      setInputData(dataArray);
    } else {
      dataArray.push({text: text, index: index});
      setInputData(dataArray);
    }
  };

  const getSurveyQuestion = async () => {
    try {
      const response = await fetch('http://localhost:7240/api/SurveyQuestion');
      const json = await response.json();
      setData(json);
      // Alert.alert(JSON.stringify(json))
      return json.questions;
    } catch (error) {
      console.error(error);
    }
  };

  const postSurvey = async () => {
    try {
      const response = await fetch('http://localhost:7240/api/Survey', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submitTime: new Date(),
        }),
      });
      const json = await response.json();
      submittedId=json.id
      inputData.forEach(element => {
        postAnswer(element.text)
      });
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  const postAnswer = async (answer: String) => {
    try {
      const response = await fetch('http://localhost:7240/api/SurveyAnswer', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surveysFk: Number(submittedId),
          answer: answer,
        }),
      });
      const json = await response.json();
      Alert.alert(JSON.stringify(json));
      return json;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSurveyQuestion();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {data.map((input, index) => (
          <View key={input.id}>
            <Text> {input.question}</Text>
            <TextInput
              key={index}
              style={styles.input}
              onChangeText={(text: string) => addValues(text, index)}
              // value={text}
            />
          </View>
        ))}
        <Button
          onPress={() => postSurvey()}
          title="Submit"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default survey;
