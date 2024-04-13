import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const CustomTextBox = ({ placeholder, onChangeText, value }) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: 60,
    width: '80%', 
    borderColor: 'black',
    backgroundColor: 'lightgrey',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    marginLeft: 5,
  },
});

export default CustomTextBox;