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

const deleteQueryOptions = () => {
     return {
        method: 'DELETE',
        credentials: 'include',
        withCredentials: true
    }   
}

const putQueryOptions = (data) => {
    return {
        method: 'PUT',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
        withCredentials: true,
        credentials: 'include'
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
    return fetch(baseUrl + '/post/delete/' + postId, deleteQueryOptions())
            .then(resp => resp.json())
}

const editPostServer = (postId, data) => {
    const queryOptions = filePostQueryOptions(data)
    queryOptions.method = 'PUT'
    return fetch(baseUrl + '/post/edit/' + postId, queryOptions)
                .then(resp => resp.json())
}

const getUserPostsServer = (userId, page) => {
    return fetch(baseUrl + `/user/${userId}/posts/${page}`, getQueryOptions())
                .then(resp => resp.json())
}

const postComment = (postId, commentObject) => {
    return fetch(baseUrl + `/post/${postId}/comment`,
        postQueryOptions(commentObject)).then(resp => resp.json())
}

const getPostCommentsServer = (parentId) => {
    return fetch(baseUrl + `/post/${parentId}/comments`,
        getQueryOptions()).then(resp => resp.json())
}

const deleteCommentServer = (commentId) => {
    return fetch(baseUrl + `/comment/${commentId}/delete`,
        deleteQueryOptions()).then(resp => resp.json())
}

const editCommentServer = (commentId, data) => {
    return fetch(baseUrl + `/comment/${commentId}/edit`,
        putQueryOptions(data)).then(resp => resp.json())
}

const changeProfilePicServer = (userId, data) => {
    return fetch(baseUrl + `/user/profile/${userId}/picture/change`,
        filePostQueryOptions(data)).then(resp => resp.json())
}

const changePostStarServer = (postId, data) => {
    return fetch(baseUrl + `/post/${postId}/stars/change`,
        putQueryOptions(data)).then(resp => resp.json())
}

const getPostStarsServer = (postId) => {
    return fetch(baseUrl + `/post/${postId}/stars/get`,
        getQueryOptions()).then(resp => resp.json())
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
    editPostServer,
    getUserPostsServer,
    postComment,
    getPostCommentsServer,
    deleteCommentServer,
    editCommentServer,
    changeProfilePicServer,
    changePostStarServer,
    getPostStarsServer
}