import * as React from 'react';
import { storeData } from './AsyncData';

async function SignupHandler(userName, password, email) {
    try {
        console.log("SignupHandler")
        let resp =  await fetch('http://54.81.45.41:3000/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
                email: email,
                pass: password
            })
        });

        let userObj = {
            storedName: userName,
            storedPass: password
        }
        storeData("user", userObj)

        const data = await resp.json()
        return data
    } catch (error) {
        console.error("Error in SignupHandler:", error.message);
		console.log(error.message);
        return error;
    }
}

export default SignupHandler;