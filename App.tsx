import React from 'react';
import {SafeAreaView, StyleSheet, TextInput,Button,Alert, Text} from 'react-native';

const TextInputExample = () => {
  const [text, onChangeText] = React.useState('Text');
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
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
      onPress={() => Alert.alert('Simple Button pressed')}
        title="Submit"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
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

export default TextInputExample;