import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getAllPosts } from '../store/postsActions'

import Post from './Post'

const PostsContainerView = ({ getPosts, posts }) => {
    useEffect(() => {
        getPosts()
    }, [])

    return (
        <section className = "posts-container">
            { posts.map((post, i) => {
                return <Post key = {i} 
                             post = { post }
                       />
            })}
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