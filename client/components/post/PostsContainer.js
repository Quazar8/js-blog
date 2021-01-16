import React from 'react'

import PostRow from './PostRow'

const PostsContainer = ({ posts }) => {
    return (
        <section className = "posts-container">
            { posts.map((post, i) => {
                return <PostRow key = { i } 
                             post = { post }
                             index = { i }
                             postsLength = { posts.length }
                       />
            })}
        </section>
    )
}

export default PostsContainer