const baseUrl = 'http://localhost:8000'
const registerURL = baseUrl + '/user/register'
const loginUrl = baseUrl + '/user/login'
const logoutUrl = baseUrl + '/user/logout'
const publishPostUrl = baseUrl + '/publish'
const getAllPostsUrl = baseUrl + '/posts'
const getSinglePostUrl = baseUrl + '/post/'
const getLoggedUserUrl = baseUrl + '/user/logged'
const getUserProfileUrl = baseUrl + '/user/profile/'

const postQueryOptions = (data) => {
    return {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        withCredentials: true,
        credentials: 'include'
    }
}

const filePostQueryOptions = (data) => {
    const formData = new FormData();

    for (let name in data) {
        formData.append(name, data[name])
    }

    return {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        withCredentials: true,
        body: formData
    }
}

const getQueryOptions = () => {
    return {
        method: 'GET',
        credentials: 'include',
        withCredentials: true
    }
}

const registerUserServer = (data) => {
    if(!data && !data.username && !data.password)
        return new Promise((resolve) => {
            resolve({ error: true, errMsg: "Missing username or password"})
        })

    return fetch(registerURL, postQueryOptions(data)).
    then(resp => resp.json())
}

const loginUserServer = (data) => {
    if(!data && !data.username && !data.password)
        return new Promise((resolve) => {
            resolve({ error: true,
            errorMsg: 'Missing username or password'})
        })

    return fetch(loginUrl, postQueryOptions(data))
    .then(resp => resp.json())
    
}

const logoutUserServer = () => {
    return fetch(logoutUrl, getQueryOptions())
            .then(resp => resp.json())
}

const getUserProfileServer = userId => {
    return fetch(getUserProfileUrl + userId, getQueryOptions())
                .then(resp => resp.json())
}

const getLoggedUserServer = () => {
    return fetch(getLoggedUserUrl, getQueryOptions())
            .then(resp => resp.json())
}

const publishPostServer = (data) => {
    return fetch(publishPostUrl, filePostQueryOptions(data))
            .then(resp => resp.json())
}

const getAllPostsServer = () => {
    return fetch(getAllPostsUrl, getQueryOptions)
    .then(resp => resp.json())
}

const getSinglePostServer = (postId) => {
    return fetch(getSinglePostUrl + postId, getQueryOptions)
                .then(resp => resp.json())
}

const deletePostServer = postId => {
    const queryOptions = getQueryOptions()
    queryOptions.method = 'DELETE'
    return fetch(baseUrl + '/post/delete/' + postId, queryOptions)
            .then(resp => resp.json())
}

const editPostServer = (postId, data) => {
    const queryOptions = filePostQueryOptions(data)
    queryOptions.method = 'PUT'
    return fetch(baseUrl + '/post/edit/' + postId, queryOptions)
                .then(resp => resp.json())
}
export {
    registerUserServer,
    loginUserServer,
    logoutUserServer,
    publishPostServer,
    getAllPostsServer,
    getSinglePostServer,
    getLoggedUserServer,
    getUserProfileServer,
    deletePostServer,
    editPostServer
}