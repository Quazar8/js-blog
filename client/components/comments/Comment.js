import React, { useState } from 'react'

import { Link } from 'react-router-dom'

import { deleteCommentServer } from '../../api'

const Comment = ({ comment, currentUser, dispatchError,
    dispatchSuccess }) => {
    const { commentId, content, author: { username, profilePic }} = comment

    const [showMenu, setShowMenu] = useState(false)

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

    const editComment = () => {
        console.log('edit comment')
    }

    const deleteComment = () => {
        deleteCommentServer(commentId).then(resp => {
            if (resp.error) {
                dispatchError(resp.errorMsg)
                return
            }

            dispatchSuccess('Request reached the server')
        })
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
                                        <li onMouseDown = { editComment }>Edit</li>
                                        <li onMouseDown = { deleteComment }>Delete</li>
                                    </ul>
                                : null
                            }
                        </div>
                        : null
                    }
                </div>
                <p>{ content }</p>
            </div>
        </div>
    )
}

export default Comment
