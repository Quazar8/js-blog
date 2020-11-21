import { publishPostServer } from '../api'
import { showErrorAction } from './globalActions'

const publishPostAction = data => {
    return dispatch => {
        publishPostServer(data).then(resp => {
            if (resp.error)
                dispatch(showErrorAction(resp.errorMsg))
            else
                console.log('Success posting', resp)
        })
    }
}

export {
    publishPostAction
}