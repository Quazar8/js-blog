import { actionTypes } from './userActions'

const initialUserState = {
    username: "",
    online: false
}

const userReducer = (state = initialUserState, action) => {
    switch(action.type){
        case actionTypes.REGISTER_USER:
            return state
        default: return state
    }
}

export default userReducer