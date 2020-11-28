import React from 'react'
import PostsContainer from './PostsContainer'

const Home = () => {
    return (
        <section className = "home-container">
            <h1>Home component</h1>
            <PostsContainer />
        </section>
    )
}

export default Home