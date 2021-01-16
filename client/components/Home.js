import React, { useEffect } from 'react'
import { connect } from 'react-redux'

import { getAllPosts } from '../store/postsActions'
import PostsContainer from './post/PostsContainer'

const HomeView = ({ posts, getPosts }) => {
    useEffect(() => {
        getPosts()
    }, [])


    return (
        <section className = "home-container">
            <PostsContainer posts = { posts } />
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

const Home = connect(mapState, mapDispatch)(HomeView)

export default Home