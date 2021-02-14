import React from 'react'

import Comment from './Comment'

const CommentsContainer = ({ comments, username,
        dispatchSuccess, disptachError }) => {
    return (
        <div className = "comments-container">
            {
                comments.map((c, i) => (
                    <Comment 
                        comment = { c } 
                        key = { i }
                        currentUser = { username }
                        dispatchSuccess = { dispatchSuccess }
                        disptachError = { disptachError }
                    />
                )).reverse()
            }
        </div>
    )
}

export default CommentsContainer