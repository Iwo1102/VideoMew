import * as React from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import { requestData } from './AsyncData';
import { storeData } from './AsyncData';


async function SearchHandler() {
    try {

        let resp =  await fetch('http://54.81.45.41:3000/GetAllGames', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        const data = await resp.json()
        return data
    } catch (error) {
        console.error("Error in SigninHandler:", error.message);
		console.log(error.message);
        return error
    }
}

export default SearchHandler;