import { registerUserServer,
         loginUserServer,
         logoutUserServer } from '../api'
import { showErrorAction, 
         successAction,
         clearError,
         clearSuccess, 
         clearErrorAction} from './globalActions'

const actionTypes = {
    LOGIN_USER: 'LOGIN_USER',
    LOGGEDIN_USER: 'LOGGEDIN_USER',
    REGISTER_USER: 'REGISTER_USER',
    REGISTERED_USER: 'REGISTERED_USER',
    LOGOUT_USER: 'LOGOUT_USER'
}

const registerUserAction = (data) => {
    return {
        type: actionTypes.REGISTER_USER,
        payload: data
    }
}

const registeredUserAction = (data) => {
    return {
        type: actionTypes.REGISTERED_USER,
        payload: data
    }
}

const loggedInUserAction = (data) => {
    return {
        type: actionTypes.LOGGEDIN_USER,
        payload: data
    }
}

const registerUser = (data) => {
    return dispatch => {
        registerUserServer(data).then(resp => {
            if(resp.error) {
                dispatch(showErrorAction(resp.errorMsg))
                clearError(dispatch)
            }
            else {
                dispatch(registeredUserAction(resp.username))
                dispatch(successAction("You have succesfully registered"))
                clearSuccess(dispatch)
            }
        })
        .catch(err => {
            console.log('Error', err)
            dispatch(showErrorAction("Error has occured"))
        })
    }
}

const loginUser = (data) => {
    return dispatch => {
        loginUserServer(data).then(resp => {
            
            if(resp.error){
                dispatch(showErrorAction(resp.errorMsg))
                clearError(dispatch)
            }
            else {
                dispatch(loggedInUserAction(resp.username))
                dispatch(successAction("You have logged in"))
                clearSuccess(dispatch)
            }
        })
        .catch(err => {
            console.log('Error', err)
            dispatch(showErrorAction("Error has occured"))
        })
    }
}

const logoutUserAction = () => {
    return {
        type: actionTypes.LOGOUT_USER,
        payload: null
    }
}

const logoutUser = () => {
    return dispatch => {
        logoutUserServer().then(resp => {
            if (resp.error) {
                dispatch(showErrorAction(resp.errorMsg))
                clearError(dispatch)
            }
            else {
                dispatch(logoutUserAction())
                dispatch(successAction('You have logged out'))
                clearSuccess(dispatch)
            }
        })
    }
}
export {
    actionTypes,
    registerUserAction,
    registeredUserAction,
    registerUser,
    loginUser,
    logoutUser
}