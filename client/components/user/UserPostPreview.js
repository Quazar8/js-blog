import React from 'react'
import { Link } from 'react-router-dom'
import { getUrlTitle } from '../../utils'

const UserPostPreview = ({ post }) => {
    const { title, content, thumbnail, postId } = post
    const shortContent = content.substring(0, 640)
    
    return (
        <Link to = { `/post/${getUrlTitle(title, postId)}` }>
            <div className = "user-post-preview">
                <div className = "image-container">
                    <img src = { thumbnail } alt = "post thumbnail" />
                </div>
                <div className = "text-section">
                    <h3>{ title }</h3>
                    <p>{ shortContent }</p>
                </div>
            </div>
        </Link>
    )
}

export default UserPostPreview