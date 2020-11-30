import React from 'react'

const Post = ({ post }) => {
    const { title, content, authorId } = post
    return (
        <article className = "single-post">
            <h2>{ title }</h2>
            <h3>by { authorId }</h3>
            <p>{ content }</p>
        </article>
    )
}

export default Post