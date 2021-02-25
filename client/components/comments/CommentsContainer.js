import React from 'react'

import Comment from './Comment'

const CommentsContainer = ({ comments, user,
        dispatchSuccess, dispatchError,
        updateCommentSection, commentAppendClass = "" }) => {

    if (!comments?.length) {
        return <h2>No comments yet.</h2>
    }

    return (
        <div className = "comments-container">
            {
                comments.map((c, i) => (
                    <Comment 
                        comment = { c } 
                        key = { i }
                        user = { user }
                        dispatchSuccess = { dispatchSuccess }
                        dispatchError = { dispatchError }
                        updateCommentSection = { updateCommentSection }
                        commentAppendClass = { commentAppendClass}
                    />
                )).reverse()
            }
        </div>
    )
}

export default CommentsContainer