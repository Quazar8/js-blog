import { createStore, 
         applyMiddleware,
         combineReducers} from 'redux'
import thunk from 'redux-thunk'

import userReducer from './userReducer'
import globalReducer from './globalReducer'
import postsReducer from './postsReducer'
import postReducer from './postsReducer'

const rootReducer = combineReducers({
    user: userReducer,
    global: globalReducer,
    posts: postReducer
})

const store = createStore(rootReducer,
                    applyMiddleware(thunk))

store.subscribe(() => {
    console.log('State', store.getState())
})

export default store