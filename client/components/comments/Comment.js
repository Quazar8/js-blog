import React from 'react'

import { Link } from 'react-router-dom'

const Comment = ({ comment, currentUser }) => {
    const { content, author: { username, profilePic}} = comment

    let commentAppendClass = ""
    if (currentUser === username) {
        commentAppendClass = " comment-author"
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
                    <div className = "more-menu">
                        &bull; &bull; &bull;
                    </div>
                </div>
                <p>{ content }</p>
            </div>
        </div>
    )
}

export default Comment
