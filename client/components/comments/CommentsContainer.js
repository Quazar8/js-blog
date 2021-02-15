import React from 'react'

import Comment from './Comment'

const CommentsContainer = ({ comments, username,
        dispatchSuccess, dispatchError }) => {
    return (
        <div className = "comments-container">
            {
                comments.map((c, i) => (
                    <Comment 
                        comment = { c } 
                        key = { i }
                        currentUser = { username }
                        dispatchSuccess = { dispatchSuccess }
                        dispatchError = { dispatchError }
                    />
                )).reverse()
            }
        </div>
    )
}

export default CommentsContainer