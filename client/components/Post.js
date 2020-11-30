import React from 'react'

const Post = ({ post }) => {
    const { title, content, author } = post
    return (
        <article className = "single-post">
            <h2>{ title }</h2>
            <h3>by { author }</h3>
            <p>{ content }</p>
        </article>
    )
}

export default Post