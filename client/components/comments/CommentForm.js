import React, { useRef } from 'react'

import { postComment } from '../../api'

const CommentForm = ({ profilePic, authorId,
        dispatchError, dispatchSuccess, postId,
        updateCommentSection }) => {
    const contentRef = useRef()
    const commentSubmit = (e) => {
        e.preventDefault()
        if (!authorId) {
            dispatchError('Author of the comment missing')
            return
        }

        const content = contentRef.current.innerText.trim()
        if (!content) {
            dispatchError('Can not submit an empty comment')
            return
        }

        const comment = {
            content
        }

        postComment(postId, comment).then(resp => {
            if (resp.error) {
                dispatchError(resp.errorMsg)
                return
            }

            dispatchSuccess('Commented')
            contentRef.current.innerText = ""
            updateCommentSection()
        })
    }


    return (
        <form className = "comment-form" onSubmit = { commentSubmit }>
            <div className = "comment-body">
                <div className = "image-container">
                    <img src = { profilePic } alt = "profile-pic" />
                </div>
                <p 
                    ref = { contentRef } 
                    contentEditable
                    placeholder = "Comment here"
                ></p>
            </div>
            <input type = "submit" value = "comment" />
        </form>
    )
}

export default CommentForm