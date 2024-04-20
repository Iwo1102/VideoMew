import * as React from 'react';

async function SigninHandler(userName, password, email) {
    try {
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
        const data = await resp.json()
        return data
    } catch (error) {
        res.status(500).json({ error: error.message });
		console.log(error.message);
    }
}

export default SigninHandler;