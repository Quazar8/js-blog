import { publishPostServer,
         getAllPostsServer,
         getSinglePostServer } from '../api'
import { clearError, 
         clearSuccess,
         showErrorAction,
         successAction } from './globalActions'

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
                dispatch(showErrorAction(resp.errorMsg))
                clearError(dispatch)
            }
            else {
                dispatch(successAction('Post published!'))
                clearSuccess(dispatch)
            }
                
        })
    }
}

const getAllPosts = () => {
    return dispatch => {
        getAllPostsServer().then(resp => {
           dispatch(gotAllPostsAction(Object.values(resp.posts).reverse()))
        }).catch(err => {
            dispatch(showErrorAction("An error has occured"))
            console.error(err)
            clearError(dispatch)
        })
    }
}

const getPost = postId => {
    return dispatch => {
        getSinglePostServer(postId).then(resp => {
            console.log(resp)
        })
    }
}

export {
    types,
    publishPostAction,
    getAllPosts,
    gotPostAction,
    getPost
}