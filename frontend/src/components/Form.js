import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

const Form = ({ value, setValue, onPressHandle }) => {
  return (
    <View style={styles.form}>
      <TextInput
        placeholder="paste your youtube url here..."
        placeholderTextColor="grey"
        autoCapitalize="none"
        style={styles.inputTextStyle}
        value={value}
        onChangeText={(value) => setValue(value)}
      />

      <TouchableOpacity onPress={onPressHandle} style={styles.btnStyle}>
        <Text style={styles.btnText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {},
  inputTextStyle: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 6,
  },

  btnStyle: {
    backgroundColor: 'pink',
    padding: 10,
    marginTop: 10,
    borderRadius: 5,
  },

  btnText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000',
  },
});

export default Form;
