import { types } from './globalActions'

const globalState = {
    notifications: []
}

const setErrorState = (state, errorMsg) => {
    const aux = [...state.notifications]
    aux.push({error: true, msg: errorMsg})
    return {
        ...state,
        notifications: aux
    }
}

const clearErrorState = (state) => {
    const aux = [...state.notifications]
    aux.shift()
    return {
        ...state,
        notifications: aux
    }
}

const setSuccessState = (state, msg) => {
    const aux = [...state.notifications]
    aux.push({error: false, msg})
    return {
        ...state,
        notifications: aux
    }
}

const clearSuccessState = (state) => {
    let aux = [...state.notifications]
    aux.shift()
    return {
        ...state,
        notifications: aux
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
        case types.CLEAR_SUCCESS_NOTIFICATION:
            return clearSuccessState(state)
        default: return state
    }
}

export default globalReducer