import React from 'react'
import { connect } from 'react-redux'

import { getAllPosts } from '../store/postsActions'

const PostsContainerView = ( { getPosts }) => {
    getPosts()
    return (
        <section className = "posts-container">
            <h1>Post container</h1>
        </section>
    )
}

const mapDispatch = dispatch => {
    return {
        getPosts: () => {
            dispatch(getAllPosts())
        }
    }
}

const PostsContainer = connect(null, mapDispatch)(PostsContainerView)

export default PostsContainer