const clearTime = 3000 //in ms

const types = {
    ERROR: "ERROR",
    CLEAR_ERROR: "CLEAR_ERROR",
    SUCCESS_NOTIFICATION: "SUCCESS_NOTIFICATION",
    CLEAR_SUCCESS_NOTIFICATION: "CLEAR_SUCCESS_NOTIFICATION"
}

const showErrorAction = (msg) => {
    return {
        type: types.ERROR,
        payload: msg
    }
}

const clearErrorAction = () => {
    return {
        type: types.CLEAR_ERROR,
        payload: null
    }
}

const showError = (msg) => {
    return dispatch => {
        dispatch(showErrorAction(msg))
        setTimeout(() => {
            dispatch(clearErrorAction())
        }, clearTime)
    }
}

const showSuccessAction = (msg) => {
    return {
        type: types.SUCCESS_NOTIFICATION,
        payload: msg
    }
}

const clearSuccessAction = () => {
    return {
        type: types.CLEAR_SUCCESS_NOTIFICATION,
        payload: null
    }
}

const showSuccess = (msg) => {
    return dispatch => {
        dispatch(showSuccessAction(msg))
        setTimeout(() => {
            dispatch(clearSuccessAction())
        }, clearTime)
    }
}

export {
    types,
    showError,
    showSuccess,
}