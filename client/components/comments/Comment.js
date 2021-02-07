import React from 'react'

const Comment = ({ comment }) => {
    const { content, authorId: { username, profilePic}} = comment
    return (
        <div className = "comment">
            <div className = "image-container">
                <img src = "" alt = "profile-pic" />
            </div>
            <p>Comment body</p>
        </div>
    )
}

export default Comment
