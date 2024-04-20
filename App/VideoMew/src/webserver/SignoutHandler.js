import * as React from 'react';

async function SignoutHandler(userName, password,) {
    try {
        let resp =  await fetch('http://54.81.45.41:3000/signout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: userName,
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

export default SignoutHandler;