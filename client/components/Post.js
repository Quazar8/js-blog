import React, { useEffect, useState } from 'react'

const Post = ({ postId }) => {
    const {title, authorId, content} = {}
    return (
        <article className = "post-view">
            <h2>{ title }</h2>
            <h3>by { authorId }</h3>
            <p>{ content }</p>
        </article>
    )
}

export default Post