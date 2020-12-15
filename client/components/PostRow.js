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

    const animationDuration = 0.6 //s
    const animationDelay = index * 0.4 //s

    const animationStyle = {
        animationDelay: `${animationDelay}s`,
        animationDuration: `${animationDuration}s`,
        zIndex: postsLength - index
    }

    return (
        <article className = "post-row" style = { animationStyle }>
            <Link onClick = { savePostToLocal } to = { linkQuery }>
                    <div className = "thumbnail-container">
                        <img src = { thumbnail } alt = "post's thumbnail" />
                    </div>
                    <div className = "post-info">
                        <h2>{ title }</h2>
                        <h3>by { authorId }</h3>
                        <p>{ contentPreview }</p>
                    </div>
            </Link>
        </article>
    )
}

export default PostRow