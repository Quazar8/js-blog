import React, { useRef } from 'react'

import { Link } from 'react-router-dom'

import { editCommentServer } from '../../api'

const EditCommentForm = ({ profilePic, username, content,
        hideEditForm, commentId, dispatchSuccess, dispatchError }) => {
    
    const contentRef = useRef()
    const tryEditComment = (e) => {
        e.preventDefault()

        const changedContent = contentRef.current.innerText
        if (!changedContent) {
            dispatchError('Comment cannot be empty')
            return
        }

        if (changedContent === content) {
            dispatchError('New omment is the same as the old one')
            return
        }

        editCommentServer(commentId, { content: changedContent }).then(resp => {
            if (resp.error) {
                dispatchError(resp.errorMsg)
                return
            }

            dispatchSuccess('Comment edited')
        })
    }

    return (
        <form className = "edit-comment-form comment">
            <div className = "image-container">
                <img src = { profilePic } alt = "profile-pic" />
            </div>
            <div className = "comment-right">
                <div className = "upper-section">
                    <Link to = { `/profile/${username}` }>
                      <h3>{ username }</h3>
                    </Link>
                </div>
                <p  
                    ref = { contentRef } 
                    contentEditable 
                    suppressContentEditableWarning
                >
                    { content }
                </p>
                <div className = "buttons-container">
                    <button onClick = { tryEditComment }>Edit</button>
                    <button onClick = { hideEditForm }>Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default EditCommentForm