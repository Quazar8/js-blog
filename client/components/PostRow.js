import React from 'react'
import { Link } from 'react-router-dom'

const PostRow = ({ post, i }) => {
    const { title, content, authorId } = post
    return (
        <Link to = {
            {
                pathname: '/post/' + i,
                post 
            }
        }>
            <article className = "post-row">
                <h2>{ title }</h2>
                <h3>by { authorId }</h3>
                <p>{ content }</p>
            </article>
        </Link>
    )
}

export default PostRow