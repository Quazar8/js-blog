import React from 'react'

import { postComment } from '../../api'

const CommentForm = ({ profilePic }) => {
    const commentSubmit = (e) => {
        e.preventDefault()
    }


    return (
        <form className = "comment-form" onSubmit = { commentSubmit }>
            <div className = "comment-body">
                <div className = "image-container">
                    <img src = { profilePic } alt = "profile-pic" />
                </div>
                <p contentEditable placeholder = "Comment here"></p>
            </div>
            <input type = "submit" value = "comment" />
        </form>
    )
}

export default CommentForm