import React from 'react'

const UserPostPreview = ({ post }) => {
    const { title, content, thumbnail } = post
    const shortContent = content.substring(0, 250)
    return (
        <div className = "user-post-preview">
            <div className = "image-container">
                <img src = { thumbnail } alt = "post thumbnail" />
            </div>
            <h3>{ title }</h3>
            <p>{ shortContent }</p>
        </div>
    )
}

export default UserPostPreview