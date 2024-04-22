import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import mainContainer from './src/mainContainer';
import LinearGradient from 'react-native-linear-gradient'; 



import SearchScreen from './src/screens/SearchScreen';
import ReviewScreen from './src/screens/ReviewScreen';
import LibraryScreen from './src/screens/LibraryScreen';


const Stack = createNativeStackNavigator();



export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='mainContainer'>
        <Stack.Screen
          name="mainContainer"
          component={mainContainer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LibraryScreen"
          component={LibraryScreen}
          options={{ title: 'Library' }}  
        />
        <Stack.Screen
          name="ReviewScreen"
          component={ReviewScreen}
          options={{ title: 'Review' }}  
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
