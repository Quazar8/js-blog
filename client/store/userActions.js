import { registerUserServer,
         loginUserServer } from '../api'

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

const loginUserAction = (data) => {
    return {
        type: actionTypes.LOGGEDIN_USER,
        payload: data
    }
}

const registerUser = (data) => {
    return dispatch => {
        registerUserServer(data).then(resp => {
            dispatch(registeredUserAction(resp.user))
        })
        .catch(err => {
            console.log('Error', err)
        })
    }
}

export {
    actionTypes,
    registerUserAction,
    registeredUserAction,
    registerUser
}