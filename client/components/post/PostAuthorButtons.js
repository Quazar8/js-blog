import React from 'react'
import { Link } from 'react-router-dom'

const PostAuthorButtons = ({ deletePost }) => {
    return (
        <div className = "button-container">
            <Link className = "edit-link">
                Edit
            </Link>
            <button onClick = { deletePost } >Delete</button>
        </div>
    )
}

export default PostAuthorButtons
