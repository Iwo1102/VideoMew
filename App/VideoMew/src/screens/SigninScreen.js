import * as React from 'react';
import { useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {View, Text, Button, StyleSheet} from 'react-native';
import CustomTextBox from '../components/textBox';
import SigninHandler from '../webserver/SigninHandler';
import SignupHandler from '../webserver/SignupHandler'
import SignoutHander from '../webserver/SignoutHandler'
import RootHandler from '../webserver/RootHandler';
import CustomButton from '../components/CustomButton';

export default function SigninScreen({navigation}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [success, setSucess] = useState(true)
    const [message, setMessage] = useState('')
    const [screen, setScreen] = useState('')
    const [email, setEmail] = useState('')
    const [confPassword, setconfPassword] = useState('')

    const signinPressed = async () => {
        try {
            const res = await SigninHandler(username, password);
            console.log("response:", res); // Logging the entire response object for debugging
            if (res.success) {
                setSucess(true);
                setScreen('signout');
            } else {
                setSucess(false);
                setMessage(res.message);
            }
            RootHandler()
        } catch (error) {
            console.error("Error during sign-in:", error.message);
        }
    };

    const signupPressed = async () => {
        console.log("signupPressed")
        if (password != confPassword) {
            setSucess(false)
            setMessage("Passwords don't match")
        }
        try {
            const res = await SignupHandler(username, password, email);
            console.log("response:" + res.success)
            if (res.success) {
                setSucess(true)
                setScreen('signout')
            } else {
                setSucess(false)
                setMessage(res.message)
            }
        } catch (error) {
            console.error("Error during sign-up:", error.message);
        }
    };

    const signoutPressed = async () => {
        try {
            const res = await SignoutHander(username, password);
            console.log("response:" + res.success)
                if (res.success) {
                    setSucess(true)
                    setScreen('signin')
                    setPassword('')
                    setUsername('')
                } else {
                    setSucess(false)
                    setMessage(res.message)
                }
        } catch (error) {
            console.error("Error during sign-out:", error.message);
        }
    };


    return(
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <View style={styles.container}>
                {screen !== 'signout' && (
                    <>
                        <Text style={styles.infoText}>Not Signed up?</Text>
                        <CustomButton title="Sign up" onPress={() => setScreen('signup')} />
                        <Text style={styles.infoText}>Already Signed up?</Text>
                        <CustomButton title="Sign in" onPress={() => setScreen('signin')} />
                    </>
                )}
                {screen === 'signout' && (
                    <>
                        <CustomButton title="Sign out" onPress={signoutPressed} />
                    </>
                )}
            </View>
            {screen === 'signin' && (
                <>
                    <Text style={styles.headerText}>Sign in here</Text>
                    {!success && <Text style={styles.errorText}>{ message }</Text>}
                    <CustomTextBox placeholder="Username" onChangeText={text => setUsername(text)} />
                    <CustomTextBox placeholder="Password" onChangeText={text => setPassword(text)} />
                    <CustomButton title="Submit" onPress={signinPressed} />
                </>
            )}
            {screen === 'signup' && (
                <>
                    <Text style={styles.headerText}>Sign up here</Text>
                    {success === false && <Text style={styles.errorText}>{message}</Text>}
                    <CustomTextBox placeholder="Username" onChangeText={text => setUsername(text)}/>
                    <CustomTextBox placeholder="Email" onChangeText={text => setEmail(text)}/>
                    <CustomTextBox placeholder="Password" onChangeText={text => setPassword(text)}/>
                    <CustomTextBox placeholder="Confirm Password" onChangeText={text => setconfPassword(text)}/>
                    <CustomButton title="Submit" onPress={signupPressed} />
                </>
            )}
        </View>
    );
} 

const styles = StyleSheet.create({
    container: {
        padding: 20,
        margin: 10,
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    infoText: {
        fontSize: 16,
        marginTop: 10,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
    }
});