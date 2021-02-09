import React from 'react'

const Comment = ({ comment }) => {
    const { content, author: { username, profilePic}} = comment
    return (
        <div className = "comment">
            <div className = "image-container">
                <img src = { profilePic } alt = "profile-pic" />
                <h3>{ username }</h3>
            </div>
            <p>{ content }</p>
        </div>
    )
}

export default Comment
