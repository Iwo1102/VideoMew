import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons'; 
import { View, Text } from 'react-native';

import SearchScreen from './screens/SearchScreen';
import LibraryScreen from './screens/LibraryScreen';
import SigninScreen from './screens/SigninScreen';

const searchName = 'Search';
const libraryName = 'Library';
const signinName = 'Signin';

const Tab = createBottomTabNavigator();

export default function MainContainer() {
    return(   
        <Tab.Navigator
            initialRouteName={searchName}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    let rn = route.name;

                    if (rn === searchName) {
                        iconName = focused ? 'search' : 'search-outline';
                    } else if (rn === libraryName) {
                        iconName = focused ? 'library' : 'library-outline';
                    } else if (rn === signinName) {
                        iconName = focused ? 'person' : 'person-outline';
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: 'blue',
                inactiveTintColor: 'black',
                labelStyle: { paddingBottom: 5, fontSize: 13 },
                style: { padding: 5, height: 70 }
            }}
        >
            <Tab.Screen name={searchName} component={SearchScreen} />
            <Tab.Screen name={libraryName} component={LibraryScreen} />
            <Tab.Screen name={signinName} component={SigninScreen} />
        </Tab.Navigator>
    );
}