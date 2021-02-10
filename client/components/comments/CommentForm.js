import React, { useRef } from 'react'

import { postComment } from '../../api'

const CommentForm = ({ profilePic, authorId,
        dispatchError, dispatchSuccess }) => {
    const contentRef = useRef()

    const commentSubmit = (e) => {
        e.preventDefault()
        console.log(contentRef.current.innerText)
    }


    return (
        <form className = "comment-form" onSubmit = { commentSubmit }>
            <div className = "comment-body">
                <div className = "image-container">
                    <img src = { profilePic } alt = "profile-pic" />
                </div>
                <p ref = { contentRef } contentEditable placeholder = "Comment here"></p>
            </div>
            <input type = "submit" value = "comment" />
        </form>
    )
}

export default CommentForm