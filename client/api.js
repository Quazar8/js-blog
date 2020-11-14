const registerURL = 'http://localhost:8000/user/register'
const loginUrl = 'http://localhost:8000/user/login'

const userPostQuery = (data) => {
    return {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
}

const registerUserServer = (data) => {
    if(!data && !data.username && !data.password)
        return new Promise((resolve) => {
            resolve({ error: true, errMsg: "Missing username or password"})
        })

    return fetch(registerURL, userPostQuery(data)).
    then(resp => resp.json())
}

const loginUser = (data) => {
    if(!data && !data.username && !data.password)
        return new Promise((resolve) => {
            resolve({ error: true,
            errorMsg: 'Missing username or password'})
        })

    return fetch(loginUrl, userPostQuery(data))
    .then(resp => resp.json())
    
}

export {
    registerUserServer,
    loginUser
}