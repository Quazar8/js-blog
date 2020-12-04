import React from 'react'
import { Link } from 'react-router-dom'

const PostRow = ({ post }) => {
    const { title, content, authorId, postId } = post
    
    const urlTitle = title.replace(' ', '-') 
    const linkQuery =  {
        pathname: '/post/' + urlTitle,
        postId
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