import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { deleteCommentServer, getPostCommentsServer } from '../../api'
import EditCommentForm from './EditCommentForm'
import CommentForm from './CommentForm'
import RepliesComponent from './RepliesComponent'

const Comment = ({ comment, currentUser, dispatchError,
    dispatchSuccess, updateCommentSection, commentAppendClass = "" }) => {
    const { commentId, content, author: { username, profilePic }, replies: replyIds} = comment

    const [showMenu, setShowMenu] = useState(false)
    const [showCommentForm, setShowCommentForm] = useState(false)
    const [showReplyForm, setShowReplyForm] = useState(false)
    const [retrievedReplies, setReplies] = useState([])
    const [repliesCount, setRepliesCount] = useState(replyIds?.length)

    if (currentUser === username) {
        commentAppendClass += " comment-author"
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

    const toggleReplyForm = () => {
        setShowReplyForm(!showReplyForm)
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

    const displayReplies = () => {
        getPostCommentsServer(commentId).then(resp => {
            if (resp.error) {
                dispatchError(resp.errorMsg)
                return
            }

            setReplies(resp.comments)
            setShowReplyForm(false)
            setRepliesCount(resp.comments.length)
            console.log('got replies', resp.comments.length)
        })
    }

    const updateReplySection = () => {
        displayReplies()
    }

    const hideReplySection = () => {
        setReplies([])
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
                {      
                    currentUser     
                    ? <div className = "buttons-container">
                        <button 
                            onClick = { toggleReplyForm }
                            className = "reply-button"
                        >
                            Reply
                        </button>
                    </div>
                    : null
                }
                {
                    showReplyForm
                    ? <CommentForm
                        profilePic = { profilePic }
                        authorId = { currentUser }
                        dispatchError = { dispatchError }
                        dispatchSuccess = { dispatchSuccess }
                        updateCommentSection = { updateReplySection }
                        externalClass = { "comment-reply " + commentAppendClass }
                        parentId = { commentId }
                    />
                    : null
                }
                <RepliesComponent 
                    dispatchError = { dispatchError}
                    dispatchSuccess = { dispatchSuccess }
                    repliesCount = { repliesCount }
                    replies = { retrievedReplies }
                    username = { currentUser }
                    displayReplies = { displayReplies }
                    hideReplySection = { hideReplySection }
                />
            </div>
        </div>
    )
}

export default Comment
