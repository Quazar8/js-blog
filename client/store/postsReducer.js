import { types } from './postsActions'

const initial = {
    allPosts: []
}

const allPostsState = (state, posts) => {
    return {
        ...state,
        allPosts: posts
    }
}

const postReducer = (state = initial, action) => {
    switch (action.payload) {
        case types.GOT_ALL_POSTS:
            return allPostsState(state, action.payload)
        default: return state
    }
}

export default postReducer