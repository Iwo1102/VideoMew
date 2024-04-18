import * as React from 'react';

async function SigninHandler(userName, password) {
    try {
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
        await resp.json()
    } catch (error) {
        res.status(500).json({ error: error.message });
		console.log(error.message);
    }
}

export default SigninHandler;