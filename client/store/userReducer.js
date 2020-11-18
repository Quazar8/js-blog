import { actionTypes } from './userActions'

const initialUserState = {
    username: "",
    online: false
}

const loggedInState = (state, username) => {
    return {
        ...state,
        username,
        online: true
    }
}

const logoutUser = (state) => {
    return {
        ...state,
        username: "",
        online: false
    }
}

const userReducer = (state = initialUserState, action) => {
    switch(action.type){
        case actionTypes.REGISTERED_USER:
            return loggedInState(state, action.payload)
        case actionTypes.LOGGEDIN_USER:
            return loggedInState(state, action.payload)
        case actionTypes.LOGOUT_USER:
            return logoutUser(state)
        default: return state
    }
}

export default userReducer