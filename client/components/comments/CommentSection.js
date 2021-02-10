import React from 'react'

import CommentForm from './CommentForm'
import CommentsContainer from './CommentsContainer'

const CommentSection = ({ user, comments, dispatchError, dispatchSuccess }) => {
    return (
        <section className = "comment-section">
            {
                user.username
                ? <CommentForm 
                    profilePic = { user.profilePic } 
                    authorId = { user.username }
                    dispatchSuccess = { dispatchSuccess }
                    dispatchError = { dispatchError }
                />
                : null
            }
            {
                comments?.length > 0
                ? <CommentsContainer 
                    comments = { comments }
                />
                : <h2>No comments yet</h2>
            }
        </section>
    )
}

export default CommentSection