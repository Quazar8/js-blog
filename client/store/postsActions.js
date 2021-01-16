import { publishPostServer,
         getAllPostsServer} from '../api'
import { showSuccess, showError } from './globalActions'

const types = {
    GOT_ALL_POSTS: 'GOT_ALL_POSTS',
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
        })
    }
}

export {
    types,
    publishPostAction,
    getAllPosts,
}