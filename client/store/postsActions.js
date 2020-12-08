import { publishPostServer,
         getAllPostsServer,
         getSinglePostServer } from '../api'
import { showSuccess, showError } from './globalActions'

const types = {
    GOT_ALL_POSTS: 'GOT_ALL_POSTS',
    GOT_POST: 'GOT_POST'
}

const gotAllPostsAction = (posts) => {
    return {
        type: types.GOT_ALL_POSTS,
        payload: posts
    }
}

const gotPostAction = data => {
    return {
        type: types.GOT_POST,
        payload: data
    }
}

const publishPostAction = data => {
    return dispatch => {
        publishPostServer(data).then(resp => {
            if (resp.error) {
                dispatch(showError(resp.errorMsg))
            }
            else {
                dispatch(showSuccess('Post published!'))
            }
        })
    }
}

const getAllPosts = () => {
    return dispatch => {
        getAllPostsServer().then(resp => {
           dispatch(gotAllPostsAction(Object.values(resp.posts).reverse()))
        }).catch(err => {
            dispatch(showError("An error has occured"))
            console.error(err)
            clearError(dispatch)
        })
    }
}

const retrievePostAction = postId => {
    return dispatch => {
        getSinglePostServer(postId).then(resp => {
            if(resp.error) {
                dispatch(showError(resp.errorMsg))
            } else {
                dispatch(gotPostAction(resp.post))
            }
        })
        .catch(err => {
            dispatch(showError('An error has occured retrieving the article'))
            console.error(err)
        })
    }
}

export {
    types,
    publishPostAction,
    getAllPosts,
    gotPostAction,
    retrievePostAction
}