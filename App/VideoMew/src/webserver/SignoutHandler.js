import * as React from 'react'; 
import { EraseData } from './AsyncData';

async function SignoutHandler(userName, password,) {
    try {
        console.log("user:" + userName + " " + password)
        let resp =  await fetch('http://54.81.45.41:3000/signout', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        EraseData("user")

        const data = await resp.json()
        return data
    } catch (error) {
        console.error("Error in SignoutHandler:", error.message);
		console.log(error.message);
        return data;
    }
}

export default SignoutHandler;