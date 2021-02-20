import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { deleteCommentServer } from '../../api'
import EditCommentForm from './EditCommentForm'
import CommentForm from './CommentForm'

const Comment = ({ comment, currentUser, dispatchError,
    dispatchSuccess, updateCommentSection }) => {
    const { commentId, content, author: { username, profilePic }} = comment

    const [showMenu, setShowMenu] = useState(false)
    const [showCommentForm, setShowCommentForm] = useState(false)
    const [showReplyForm, setShowReplyForm] = useState(false)

    let commentAppendClass = ""
    if (currentUser === username) {
        commentAppendClass = " comment-author"
    }

    const toggleMenu = () => {
        setShowMenu(!showMenu)
    }

    const hideMenu = () => {
        setShowMenu(false)
    }

    const displayEditForm = () => {
        setShowCommentForm(true)
    }

    const hideEditForm = () => {
        setShowCommentForm(false)
        setShowMenu(false)
    }

    const deleteComment = () => {
        deleteCommentServer(commentId).then(resp => {
            if (resp.error) {
                dispatchError(resp.errorMsg)
                return
            }

            dispatchSuccess('Comment deleted')
            updateCommentSection()
        })
    }

    const replyToComment = () => {
        setShowReplyForm(true)
    }

    if (showCommentForm) {
        return <EditCommentForm 
            profilePic = { profilePic }
            username = { username }
            content = { content }
            hideEditForm = { hideEditForm }
            commentId = { commentId }
            dispatchSuccess = { dispatchSuccess }
            dispatchError = { dispatchError }
            updateCommentSection = { updateCommentSection }
        />
    }

    return (
        <div className = { "comment" + commentAppendClass }>
            <div className = "image-container">
                <img src = { profilePic } alt = "profile-pic" />
            </div>
            <div className = "comment-right">
                <div className = "upper-section">
                    <Link to = { `/profile/${username}` }>
                      <h3>{ username }</h3>
                    </Link>
                    {
                        currentUser === username
                        ? <div onBlur = { hideMenu } className = "more-menu-container">
                            <button onClick = { toggleMenu }>&bull; &bull; &bull;</button>
                            {
                                showMenu
                                ?   <ul className = "more-menu">
                                        <li onMouseDown = { displayEditForm }>Edit</li>
                                        <li onMouseDown = { deleteComment }>Delete</li>
                                    </ul>
                                : null
                            }
                        </div>
                        : null
                    }
                </div>
                <p>{ content }</p>            
                <div className = "buttons-container">
                    <button 
                        onClick = { replyToComment }
                        className = "reply-button"
                    >
                        Reply
                    </button>
                </div>
                {
                    showReplyForm
                    ? <CommentForm
                        profilePic = { profilePic }
                        authorId = { currentUser }
                        dispatchError = { dispatchError }
                        dispatchSuccess = { dispatchSuccess }
                        updateCommentSection = { updateCommentSection }
                        externalClass = { "comment-reply" }
                    />
                    : null
                }
            </div>
        </div>
    )
}

export default Comment
