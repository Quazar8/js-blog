import React from 'react'
import { Link } from 'react-router-dom'

const PostAuthorButtons = ({ deletePost, postId}) => {
    return (
        <div className = "button-container">
            <Link to = { "/post/edit/" + postId } className = "edit-link">
                Edit
            </Link>
            <button onClick = { deletePost } >Delete</button>
        </div>
    )
}

export default PostAuthorButtons
