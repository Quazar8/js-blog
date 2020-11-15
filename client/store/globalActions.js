const types = {
    ERROR: "ERROR",
    CLEAR_ERROR: "CLEAR_ERROR",
    SUCCESS_NOTIFICATION: "SUCCESS_NOTIFICATION",
    CLEAR_SUCCESS_NOTIFICATION: "CLEAR_SUCCESS_NOTIFICATION"
}

const showError = (msg) => {
    return {
        type: types.ERROR,
        payload: msg
    }
}

const clearError = () => {
    return {
        type: types.CLEAR_ERROR,
        payload: null
    }
}

export {
    types,
    showError,
    clearError
}