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
                ? <CommentsContainer />
                : null
            }
        </section>
    )
}

export default CommentSection