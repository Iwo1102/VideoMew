import * as React from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { requestData } from './AsyncData';
import { storeData } from './AsyncData';


async function reviewAddHandler(gameTitle, gameRating, gameComment) {
    try {
        let dataReq = await requestData("user")
        if (dataReq != null ) {
            const obj = JSON.parse(dataReq)
            let resp =  await fetch('http://54.81.45.41:3000/reviewAdd', {
                method: 'GET',
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
        } else {
            const data = {success: false, message: "Not logged in", error: 1}
            return data;
        }
        
    } catch (error) {
        console.error("Error in ReviewHandler:", error.message);
		console.log(error.message)
        return data
    }
}

export default reviewAddHandler;