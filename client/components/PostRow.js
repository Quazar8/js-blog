import React from 'react'
import { Link } from 'react-router-dom'

const PostRow = ({ post, index, postsLength }) => {
    const { title, content, 
            authorId, postId,
            thumbnail } = post
    
    const contentPreview = content.substring(0, 163) + '...'
    const urlTitle = title.replace(' ', '-') 
    const linkQuery =  {
        pathname: '/post/' + urlTitle,
    }

    const savePostToLocal = () => {
        sessionStorage.setItem('postId', postId)
    }

    const animationDuration = 0.45
    const animationDelay = animationDuration - 
        (20 * animationDuration) / 100
        
    const animationStyle = {
        animationDelay: `${index * animationDelay}s`,
        animationDuration: `${animationDuration}s`,
        zIndex: postsLength - index
    }

    return (
        <Link onClick = { savePostToLocal } to = { linkQuery }>
            <article className = "post-row" style = { animationStyle }>
                <div className = "thumbnail-container">
                    <img src = { thumbnail } alt = "post's thumbnail" />
                </div>
                <div className = "post-info">
                    <h2>{ title }</h2>
                    <h3>by { authorId }</h3>
                    <p>{ contentPreview }</p>
                </div>
            </article>
        </Link>
    )
}

export default PostRow