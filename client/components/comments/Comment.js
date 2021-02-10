import React from 'react'

const Comment = ({ comment }) => {
    const { content, author: { username, profilePic}} = comment
    return (
        <div className = "comment">
            <div className = "image-container">
                <img src = { profilePic } alt = "profile-pic" />
            </div>
            <div className = "comment-right">
                <h3>{ username }</h3>
                <p>{ content }</p>
            </div>
        </div>
    )
}

export default Comment
