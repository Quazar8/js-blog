import { types } from './postsActions'

const initial = {
    allPosts: [],
    singlePost: {}
}

const allPostsState = (state, posts) => {
    return {
        ...state,
        allPosts: posts
    }
}

const singlePostState = (state, post) => {
    return {
        ...state,
        singlePost: post
    }
}

const postReducer = (state = initial, action) => {
    switch (action.type) {
        case types.GOT_ALL_POSTS:
            return allPostsState(state, action.payload)
        case types.GOT_POST:
            return singlePostState(state, action.payload)
        default: return state
    }
}

export default postReducer