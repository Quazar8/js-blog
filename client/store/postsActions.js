import { publishPostServer,
         getAllPostsServer } from '../api'
import { clearError, 
         clearSuccess,
         showErrorAction,
         successAction } from './globalActions'

const types = {
    GOT_ALL_POSTS: 'GOT_ALL_POSTS'
}

const gotAllPostsAction = (posts) => {
    return {
        type: types.GOT_ALL_POSTS,
        payload: posts
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
           dispatch(gotAllPostsAction(Object.values(resp.posts)))
        }).catch(err => {
            dispatch(showErrorAction("An error has occured"))
            console.error(err)
            clearError(dispatch)
        })
    }
}

export {
    types,
    publishPostAction,
    getAllPosts
}