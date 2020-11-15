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

const globalReducer = (state = globalState, action) => {
    switch(action.type){
        case types.ERROR:
            return setErrorState(state, action.payload)
        default: return state
    }
}

export default globalReducer