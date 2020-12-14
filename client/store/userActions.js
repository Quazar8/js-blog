import {  registerUserServer,
          loginUserServer,
          logoutUserServer,
          getLoggedUserServer } from '../api'
import { showError, showSuccess } from './globalActions'

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

const registeredUserAction = (username) => {
    return {
        type: actionTypes.REGISTERED_USER,
        payload: username
    }
}

const loggedInUserAction = (username) => {
    return {
        type: actionTypes.LOGGEDIN_USER,
        payload: username
    }
}

const registerUser = (data) => {
    return dispatch => {
        registerUserServer(data).then(resp => {
            if(resp.error) {
                dispatch(showError(resp.errorMsg))
            }
            else {
                dispatch(registeredUserAction(resp.user))
                dispatch(showSuccess("You have succesfully registered"))
            }
        })
        .catch(err => {
            console.log('Error', err)
            dispatch(showError("Error has occured"))
        })
    }
}

const loginUser = (data) => {
    return dispatch => {
        loginUserServer(data).then(resp => {
            
            if(resp.error){
                dispatch(showError(resp.errorMsg))
            }
            else {
                dispatch(loggedInUserAction(resp.user))
                dispatch(showSuccess("You have logged in"))
            }
        })
        .catch(err => {
            console.log('Error', err)
            dispatch(showError("Error has occured"))
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
                dispatch(showError(resp.errorMsg))
            }
            else {
                dispatch(logoutUserAction())
                dispatch(showSuccess('You have logged out'))
            }
        })
    }
}

const getLoggedUser = () => {
    return dispatch => {
        getLoggedUserServer().then(resp => {
            if (resp.error) {
                console.error(resp.errorMsg)
                return
            }

            if (resp.isLogged) {
                dispatch(loggedInUserAction(resp.user))
            }
        }).catch(err => {
            console.error(err);
        })
    }
}

export {
    actionTypes,
    registerUserAction,
    registeredUserAction,
    registerUser,
    loginUser,
    logoutUser,
    getLoggedUser
}