import { publishPostServer,
         getAllPostsServer } from '../api'
import { clearError, 
         clearSuccess,
         showErrorAction,
         successAction } from './globalActions'

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
            console.log(resp)
        })
    }
}

export {
    publishPostAction,
    getAllPosts
}