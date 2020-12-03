import React from 'react'
import { Link } from 'react-router-dom'

const PostRow = ({ post, id }) => {
    const { title, content, authorId } = post

    const linkQuery =  {
        pathname: '/post/' + (id + 1),
        post 
    }

    return (
        <Link to = { linkQuery }>
            <article className = "post-row">
                <h2>{ title }</h2>
                <h3>by { authorId }</h3>
                <p>{ content }</p>
            </article>
        </Link>
    )
}

export default PostRow