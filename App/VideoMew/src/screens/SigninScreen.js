import * as React from 'react';
import { useState } from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import CustomTextBox from '../components/textBox';
import SigninHandler from '../webserver/fetchHandlers';

export default function SigninScreen({navigation}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text> SignIn </Text>
            <CustomTextBox placeholder="username" onChangeText={text => setUsername(text)}/>
            <CustomTextBox placeholder="password" onChangeText={text => setPassword(text)}/>
            <Button title="Submit" onPress={SigninHandler(username, password)}/>

            <View style={styles.container}>
                <Text> Not Signed up? </Text>
                <Button title="Sign up"/>
            </View>
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
      padding: 20,
      margin: 10,
    },
});