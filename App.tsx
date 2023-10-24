import React from 'react';
import {SafeAreaView, StyleSheet, TextInput,Button,Alert, Text, ScrollView} from 'react-native';

const TextInputExample = () => {
  const [text, onChangeText] = React.useState('Text');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
      <ScrollView>
      <Text>Q1</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
     <Text>Q2</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Text>Q3</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
      <Button
      onPress={() =>getSurveyQuestion()}
        title="Submit"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      </ScrollView>
    </SafeAreaView>
  );
};

const getSurveyQuestion = async () => {
  try {
    const response = await fetch(
      'http://localhost:7240/api/SurveyQuestion',
    );
    const json = await response.json();
    Alert.alert(JSON.stringify(json))
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

export default TextInputExample;