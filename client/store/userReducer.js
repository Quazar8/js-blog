import { actionTypes } from './userActions'

const initialUserState = {
    username: "",
    online: false
}

const registeredState = (state, username) => {
    return {
        ...state,
        username,
        online: true
    }
}

const userReducer = (state = initialUserState, action) => {
    switch(action.type){
        case actionTypes.REGISTERED_USER:
            return registeredState(state, action.payload)
        default: return state
    }
}

export default userReducer