import * as React from 'react';
import { View } from 'react-native';
import CustomSearchButton from '../components/customSearchButton';
import CustomTextBox from '../components/textBox';

export default function SearchScreen({ navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      <CustomTextBox placeholder="Search" />
      <CustomSearchButton onPress={() => console.log('Search pressed')} />
    </View>
  );
}