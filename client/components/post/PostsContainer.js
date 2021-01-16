import React from 'react'
import { getDate } from '../../utils'

import PostRow from './PostRow'

const PostsContainer = ({ posts }) => {
    const sortFunc = (p1, p2) => {
        return getDate(p2.date) - getDate(p1.date)
    }

    return (
        <section className = "posts-container">
            { posts.sort(sortFunc).map((post, i) => {
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