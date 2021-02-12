import React from 'react'

import { Link } from 'react-router-dom'

const Comment = ({ comment }) => {
    const { content, author: { username, profilePic}} = comment
    return (
        <div className = "comment">
            <div className = "image-container">
                <img src = { profilePic } alt = "profile-pic" />
            </div>
            <div className = "comment-right">
                <Link to = { `/profile/${username}` }>
                    <h3>{ username }</h3>
                </Link>
                <p>{ content }</p>
            </div>
        </div>
    )
}

export default Comment
