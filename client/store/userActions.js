import { registerUserServer,
         loginUserServer } from '../api'
import { showErrorAction, 
         successAction } from './globalActions'

const actionTypes = {
    LOGIN_USER: 'LOGIN_USER',
    LOGGEDIN_USER: 'LOGGEDIN_USER',
    REGISTER_USER: 'REGISTER_USER',
    REGISTERED_USER: 'REGISTERED_USER'
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
            if(resp.error)
                dispatch(showErrorAction(errorMsg))
            else {
                dispatch(registeredUserAction(resp.username))
                dispatch(successAction("You have succesfully registered"))
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
            
            if(resp.error)
                dispatch(showErrorAction(resp.errorMsg))
            else {
                dispatch(loggedInUserAction(resp.username))
                dispatch(successAction("You are logged in"))
            }
        })
        .catch(err => {
            console.log('Error', err)
            dispatch(showErrorAction("Error has occured"))
        })
    }
}

export {
    actionTypes,
    registerUserAction,
    registeredUserAction,
    registerUser,
    loginUser
}