import React from 'react';
import {SafeAreaView, StyleSheet, TextInput,Button,Alert, Text, ScrollView,FlatList,View,ActivityIndicator} from 'react-native';
import {useEffect, useState} from 'react';

const TextInputExample = () => {
  const [text, onChangeText] = React.useState('Text');
  const [data, setData] = useState<Question[]>([]);

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
      onPress={() =>postSurvey()}
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
    // Alert.alert(JSON.stringify(json))
    return json.questions;
  } catch (error) {
    console.error(error);
  }
};

const postSurvey = async () => {
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

// const FlatListBasics = () => {
//   return (
//     <View style={styless.container}>
//       <FlatList
//         data={[
//           {key: 'Devin'},
//           {key: 'Dan'},
//           {key: 'Dominic'},
//           {key: 'Jackson'},
//           {key: 'James'},
//           {key: 'Joel'},
//           {key: 'John'},
//           {key: 'Jillian'},
//           {key: 'Jimmy'},
//           {key: 'Julie'},
//         ]}
//         renderItem={({item}) => <Text style={styless.item}>{item.key}</Text>}
//       />
//     </View>
//   );
// };
// const styless = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingTop: 22,
//   },
//   item: {
//     padding: 10,
//     fontSize: 18,
//     height: 44,
//   },
// });


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

// type Movie = {
//   id: string;
//   title: string;
//   releaseYear: string;
// };

type Question = {
  id: string;
  question: string;
};

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Question[]>([]);
  const [text, onChangeText] = React.useState('Text');
  const getMovies = async () => {
    try {
      const response = await fetch('http://localhost:7240/api/SurveyQuestion');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}) => id}
          renderItem={({item}) => (
           
            <View>
               <Text>
            {item.question}
          </Text>
          <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={text}
      />
          </View>
       
          )}
        />
        
      )}
      <Button
      onPress={() =>postSurvey()}
        title="Submit"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
    </View>
  );
};

export default TextInputExample;
// export default FlatListBasics;
// export default App;