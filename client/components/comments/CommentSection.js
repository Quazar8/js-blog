import React from 'react'

import CommentForm from './CommentForm'

const CommentSection = ({ user }) => {
    return (
        <section className = "comment-section">
            {
                user.username
                ? <CommentForm profilePic = { user.profilePic } />
                : null
            }
        </section>
    )
}

export default CommentSection