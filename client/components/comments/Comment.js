import React, { useState } from 'react'

import { Link } from 'react-router-dom'

const Comment = ({ comment, currentUser }) => {
    const { content, author: { username, profilePic}} = comment

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
        console.log('delete comment')
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
                    <div onBlur = { hideMenu } className = "more-menu-container">
                        <button onClick = { toggleMenu }>&bull; &bull; &bull;</button>
                        {
                            showMenu
                            ?   <ul  className = "more-menu">
                                    <li onMouseDown = { editComment }>Edit</li>
                                    <li onMouseDown = { deleteComment }>Delete</li>
                                </ul>
                            : null
                        }
                    </div>
                </div>
                <p>{ content }</p>
            </div>
        </div>
    )
}

export default Comment
