import { types } from './globalActions'

const globalState = {
    error: "",
    success: ""
}

const setErrorState = (state, errorMsg) => {
    return {
        ...state,
        error: errorMsg
    }
}

const clearErrorState = (state) => {
    return {
        ...state,
        error: ""
    }
}

const setSuccessState = (state, msg) => {
    return {
        ...state,
        success: msg
    }
}

const globalReducer = (state = globalState, action) => {
    switch(action.type){
        case types.ERROR:
            return setErrorState(state, action.payload)
        case types.CLEAR_ERROR:
            return clearErrorState(state)
        case types.SUCCESS_NOTIFICATION:
            return setSuccessState(state, action.payload)
        default: return state
    }
}

export default globalReducer