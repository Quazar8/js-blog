import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getAllPosts } from '../store/postsActions'

const PostsContainerView = ({ getPosts, posts }) => {
    useEffect(() => {
        getPosts()
    }, [])

    return (
        <section className = "posts-container">
            <h1>Post container</h1>
        </section>
    )
}

const mapState = state => {
    return {
        posts: state.posts.allPosts
    }
}

const mapDispatch = dispatch => {
    return {
        getPosts: () => {
            dispatch(getAllPosts())
        }
    }
}

const PostsContainer = connect(mapState, mapDispatch)(PostsContainerView)

export default PostsContainer