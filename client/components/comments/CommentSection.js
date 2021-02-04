import React from 'react'

import CommentForm from './CommentForm'

const CommentSection = ({ user }) => {
    return (
        <section className = "comment-section">
            <CommentForm profilePic = { user.profilePic } />
        </section>
    )
}

export default CommentSection