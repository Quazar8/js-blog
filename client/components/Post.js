import React from 'react'

const Post = (props) => {
    const { title, content, author } = props.post
    return (
        <article className = "single-post">
            <h2>{ title }</h2>
            <h3>by { author }</h3>
            <p>{ content }</p>
        </article>
    )
}

export default Post