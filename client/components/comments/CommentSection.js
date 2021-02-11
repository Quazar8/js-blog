import React, { useState, useEffect } from 'react'

import { getPostCommentsServer } from '../../api'

import CommentForm from './CommentForm'
import CommentsContainer from './CommentsContainer'

const CommentSection = ({ user, dispatchError,
        dispatchSuccess, postId }) => {
    
    const [comments, setComments] = useState([])
    
    const getComments = () => {
        getPostCommentsServer(postId).then(resp => {
            if (resp.error) {
                dispatchError(resp.errorMsg)
                return
            }

            setComments(resp.comments)
        })
    }

    useEffect(() => {
        getComments()
    }, [])

    const updateCommentSection = () => {
        getComments()
    }

    return (
        <section className = "comment-section">
            {
                user.username
                ? <CommentForm 
                    profilePic = { user.profilePic } 
                    authorId = { user.username }
                    dispatchSuccess = { dispatchSuccess }
                    dispatchError = { dispatchError }
                    postId = { postId }
                    updateCommentSection = { updateCommentSection }
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