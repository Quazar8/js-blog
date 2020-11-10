const registerURL = 'http://localhost:8000/user/register'

const postOptions = (data) => {
    return {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }
}

const registerUser = (data) => {
    if(!data && !data.username && !data.password)
        return { err: true, errMsg: "Missing data fields" }

    fetch(registerURL, postOptions(data)).
    then(resp => resp.json()).then(data => {
        console.log(data)
    })
    .catch(err => {
        console.error(err)
    })
}

export {
    registerUser
}