import React from 'react'
import { Link } from 'react-router-dom'

const PostRow = ({ post }) => {
    const { title, content, 
            authorId, postId,
            thumbnail } = post
    
    const urlTitle = title.replace(' ', '-') 
    const linkQuery =  {
        pathname: '/post/' + urlTitle,
    }

    const savePostToLocal = () => {
        sessionStorage.setItem('postId', postId)
    }

    return (
        <Link onClick = { savePostToLocal } to = { linkQuery }>
            <article className = "post-row">
                <div className= "thumbnail-container">
                    <img src={ thumbnail } alt="post's thumbnail" />
                </div>
                <h2>{ title }</h2>
                <h3>by { authorId }</h3>
                <p>{ content }</p>
            </article>
        </Link>
    )
}

export default PostRow