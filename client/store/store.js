import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import userReducer from './userReducer'

const store = createStore(userReducer,
                    applyMiddleware(thunk))

store.subscribe(() => {
    console.log('State', store.getState())
})

export default store