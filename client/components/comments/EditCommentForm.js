import React from 'react'

import { Link } from 'react-router-dom'

const EditCommentForm = ({ profilePic, username, content }) => {
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
                <p contentEditable suppressContentEditableWarning>{ content }</p>
                <div className = "buttons-container">
                    <button>Edit</button>
                    <button>Cancel</button>
                </div>
            </div>
        </form>
    )
}

export default EditCommentForm