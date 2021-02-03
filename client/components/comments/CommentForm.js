import React from 'react'

const CommentForm = ({ profilePic }) => {
    return (
        <form className = "comment-form">
            <div className = "image-container">
                <img src = { profilePic } alt = "profile-pic" />
            </div>
            <p contentEditable></p>
            <input type = "submit" value = "comment" />
        </form>
    )
}

export default CommentForm