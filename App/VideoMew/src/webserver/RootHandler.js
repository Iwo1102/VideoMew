async function RootHandler() {
    try {
        fetch('http://54.81.45.41:3000/', {
            method: 'POST',
            keepalive: true,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error("Error in SigninHandler:", error.message);
		console.log(error.message);
    }
}

export default RootHandler;