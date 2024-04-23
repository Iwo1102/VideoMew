import * as React from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { requestData } from './AsyncData';
import { storeData } from './AsyncData';


async function SigninHandler(userName, password) {
    try {
        console.log("sign in handler")
        let resp =  await fetch('http://54.81.45.41:3000/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                pass: password
            })
        });
        let userObj = {
            storedName: userName,
            storedPass: password
        }
        let dataResp = await storeData("user", userObj)
        if (dataResp == 500 ) {
            error.meesage = "Cant store data";
            throw error
        }
        let reqData = await requestData("user")
        if (dataResp == 500 ) {
            error.meesage = "Cant request data";
            throw error
        }
        console.log("user:" + reqData)
        const data = await resp.json()
        return data
    } catch (error) {
        console.error("Error in SigninHandler:", error.message);
		console.log(error.message);
        return error
    }
}

export default SigninHandler;