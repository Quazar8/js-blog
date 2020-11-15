const types = {
    ERROR: "ERROR",
    CLEAR_ERROR: "CLEAR_ERROR"
}

const showError = (msg) => {
    return {
        type: types.ERROR,
        payload: msg
    }
}

export {
    types,
    showError
}