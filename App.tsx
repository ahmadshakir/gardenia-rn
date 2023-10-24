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
  const [text, onChangeText] = React.useState('Text');
  const [data, setData] = useState<Question[]>([]);

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

  useEffect(() => {
    getSurveyQuestion();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {data.map(input => (
          <View>
            <Text> {input.question}</Text>
            <TextInput
              style={styles.input}
              // onChangeText={onChangeText}
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

const postSurvey = async () => {
  try {
    const response = await fetch('http://localhost:7240/api/SurveyQuestion');
    const json = await response.json();
    Alert.alert(JSON.stringify(json));
    return json.movies;
  } catch (error) {
    console.error(error);
  }
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
