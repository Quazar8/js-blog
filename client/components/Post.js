import React, { useEffect, useState } from 'react'

const Post = ({ postId }) => {
    const [post, setPost] = useState({}) 

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