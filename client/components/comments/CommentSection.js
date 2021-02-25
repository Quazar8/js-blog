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
            <div className = "main-comment-form-container">
                {
                    user.username
                    ? <CommentForm 
                        profilePic = { user.profilePic } 
                        authorId = { user.username }
                        dispatchSuccess = { dispatchSuccess }
                        dispatchError = { dispatchError }
                        parentId = { postId }
                        updateCommentSection = { updateCommentSection }
                    />
                    : null
                }
            </div>
            <CommentsContainer 
                comments = { comments }
                user = { user }
                dispatchSuccess = { dispatchSuccess }
                dispatchError = { dispatchError }
                updateCommentSection = { updateCommentSection }
            />
        </section>
    )
}

export default CommentSection