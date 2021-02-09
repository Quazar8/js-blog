import React from 'react'

import CommentForm from './CommentForm'
import CommentsContainer from './CommentsContainer'

const CommentSection= ({ user, comments }) => {
    return (
        <section className = "comment-section">
            {
                user.username
                ? <CommentForm profilePic = { user.profilePic } />
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