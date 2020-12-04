import React from 'react'

const Post = ({ postId }) => {
    console.log('postId', postId)
    return null
    const {title, authorId, content} = post
    return (
        <article className = "post-view">
            <h2>{ title }</h2>
            <h3>by { authorId }</h3>
            <p>{ content }</p>
        </article>
    )
}

export default Post