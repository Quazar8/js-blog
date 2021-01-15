import React from 'react'

const PostAuthorButtons = ({ deletePost }) => {
    return (
        <div className = "button-container">
            <button>Edit</button>
            <button onClick = { deletePost } >Delete</button>
        </div>
    )
}

export default PostAuthorButtons
