const { initialize } = require("passport");

const initial = {
    posts: []
}

const postReducer = (state = initialize, action) => {
    switch (action.payload) {
        default: return state
    }
}

export default postReducer