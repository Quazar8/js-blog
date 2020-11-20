const baseUrl = 'http://localhost:8000'
const registerURL = baseUrl + '/user/register'
const loginUrl = baseUrl + '/user/login'
const logoutUrl = baseUrl + '/user/logout'
const publishPostUrl = baseUrl + '/publish'

const postQuery = (data) => {
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

    return fetch(registerURL, postQuery(data)).
    then(resp => resp.json())
}

const loginUserServer = (data) => {
    if(!data && !data.username && !data.password)
        return new Promise((resolve) => {
            resolve({ error: true,
            errorMsg: 'Missing username or password'})
        })

    return fetch(loginUrl, postQuery(data))
    .then(resp => resp.json())
    
}

const logoutUserServer = () => {
    return fetch(logoutUrl).then(resp => resp.json())
}

const publishPostServer = (data) => {
    return fetch(publishPostUrl, postQuery(data))
            .then(resp => resp.json())
}

export {
    registerUserServer,
    loginUserServer,
    logoutUserServer,
    publishPostServer
}