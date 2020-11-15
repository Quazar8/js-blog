import { types } from './globalActions'

const globalState = {
    error: ""
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

const globalReducer = (state = globalState, action) => {
    switch(action.type){
        case types.ERROR:
            return setErrorState(state, action.payload)
        case types.CLEAR_ERROR:
            return clearErrorState(state)
        default: return state
    }
}

export default globalReducer