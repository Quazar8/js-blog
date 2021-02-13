import React from 'react'

import Comment from './Comment'

const CommentsContainer = ({ comments, username }) => {
    return (
        <div className = "comments-container">
            {
                comments.map((c, i) => (
                    <Comment 
                        comment = { c } 
                        key = { i }
                        currentUser = { username }
                    />
                )).reverse()
            }
        </div>
    )
}

export default CommentsContainer