import React from 'react'

import Comment from './Comment'

const CommentsContainer = ({ comments, username,
        dispatchSuccess, dispatchError,
        updateCommentSection }) => {
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
                        currentUser = { username }
                        dispatchSuccess = { dispatchSuccess }
                        dispatchError = { dispatchError }
                        updateCommentSection = { updateCommentSection }
                    />
                )).reverse()
            }
        </div>
    )
}

export default CommentsContainer