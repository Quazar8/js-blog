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
        type.actionTypes.REGISTERED_USER,
        payload: data
    }
}

export {
    actionTypes,
    registerUserAction,
    registeredUserAction
}