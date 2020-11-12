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
        return { err: true, errMsg: "Missing username or password" }

    return fetch(registerURL, userPostQuery(data)).
    then(resp => resp.json())
}

const loginUser = (data) => {
    if(!data && !data.username && !data.password)
        return { error: true,
            errorMsg: 'Missing username or password'}

    fetch(loginUrl, userPostQuery(data))
    .then(resp => resp.json())
    .then(data => {
        console.log(data)
    })
    .catch(err => {
        console.error(err)
    })
}

export {
    registerUserServer,
    loginUser
}