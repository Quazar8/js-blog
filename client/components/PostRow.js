import React from 'react'

const PostRow = ({ post }) => {
    const { title, content, authorId } = post
    return (
        <article className = "post-row">
            <h2>{ title }</h2>
            <h3>by { authorId }</h3>
            <p>{ content }</p>
        </article>
    )
}

export default PostRow