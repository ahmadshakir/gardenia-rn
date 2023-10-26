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
  RefreshControl,
} from 'react-native';
import {useEffect, useState} from 'react';

type Question = {id: number; question: string; validationRule:string; };

const survey = () => {
  // const [text, onChangeText] = useState('');
  const [data, setData] = useState<Question[]>([]);
  const [inputData, setInputData] = useState<{answer: string; index: number}[]>(
    [],
  );
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getSurveyQuestion();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  let submittedId = 0;

  const addValues = (text: string, index: number) => {

    const x = inputData.find(element => element.index==index)

    if (x) {
      x.answer=text
    } else {
      inputData.push({answer: text, index: index});
    }

    // let x = [];

    setInputData([...inputData]);
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

    //Alert.alert("postSurvey")
    for (let index = 0; index < inputData.length; index++) {
      const element = inputData[index];
      const question = data.find(d => d.id==element.index)
      // console.log(element);
      // console.log(validation);
      // Alert.alert(JSON.stringify(element)+JSON.stringify(validation))
      // Alert.alert(JSON.stringify(question!.validationRule))
      // return;
      const regex = new RegExp(question!.validationRule)
      
// Alert.alert(String(regex.test(element.answer)))
      if (!regex.test(element.answer)){
        Alert.alert("Validation fail for "+question?.question)
        return;
      }
        // return

    }
  //  return;



    try {
      const response = await fetch('http://localhost:7240/api/Survey', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          submitTime: new Date(),
          surveyAnswers: inputData
        }),
      });
      const json = await response.json();
      submittedId = json.id;
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
    <SafeAreaView style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* <Text>Pull down to see RefreshControl indicator</Text> */}
        <View style={styles.spacer}></View>
        {data.map((input, index) => (
          <View key={input.id}>
            <Text> {input.question}</Text>
            <TextInput
              key={index}
              style={styles.input}
              onChangeText={(text: string) => addValues(text, input.id)}

              // value={text}
            />
          </View>
        ))}
        <Button
          onPress={() => postSurvey()}
          title="Submit"
          color="blue"
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
  spacer: {
    height: 40,
    margin: 12,
    borderWidth: 0,
    padding: 10,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default survey;
