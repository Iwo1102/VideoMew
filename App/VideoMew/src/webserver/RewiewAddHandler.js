import * as React from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { requestData } from './AsyncData';
import { storeData } from './AsyncData';


async function reviewAddHandler(gameTitle, gameRating, gameComment) {
    try {
        console.log("sign in handler")


        let dataReq = await requestData("user")
        if (dataReq == 500 ) {
            error.meesage = "Cant store data";
            throw error
        }
        const obj = JSON.parse(dataReq)
        let resp =  await fetch('http://54.81.45.41:3000/reviewAdd', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: obj.storedName,
                pass: obj.storedPass,
                title: gameTitle,
                rating: gameRating,
                comment: gameComment
            })
        });
        const data = await resp.json()
        return data
    } catch (error) {
        console.error("Error in SigninHandler:", error.message);
		console.log(error.message)
        return data
    }
}

export default reviewAddHandler;