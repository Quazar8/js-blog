import React from 'react'

import Comment from './Comment'

const CommentsContainer = ({ comments }) => {
    return (
        <div className = "comments-container">
            {
                comments.map((c, i) => (
                    <Comment 
                        comment = { c } 
                        key = { i }
                    />
                ))
            }
        </div>
    )
}

export default CommentsContainer