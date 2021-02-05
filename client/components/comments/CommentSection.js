import React from 'react'
import { connect } from 'react-redux'

import CommentForm from './CommentForm'

const CommentSectionView = ({ dispatchToStore, user }) => {
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

const mapDispatch = dispatch => ({
    dispatchToStore: (action) => {
        dispatch(action)
    }
})

const CommentSection = connect(null, mapDispatch)(CommentSectionView)

export default CommentSection