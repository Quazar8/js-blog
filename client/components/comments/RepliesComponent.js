import React, { useState } from 'react'

const RepliesComponent = ({ dispatchError, dispatchSuccess,
        replyIds = [], commentId }) => {
    const [showReplies, setShowReplies] = useState(false)
    const [replies, setReplies] = useState([])
    if (replyIds.length === 0) {
        return null
    }

    if (showReplies) {
        return <h1>ShowReplies component</h1>
    }

    const displayReplies = () => {
        dispatchError('Not implement yet')
    }

    return (
        <button onClick = { displayReplies } className = "show-replies-button">
            <span>
            {
                replyIds.length === 1
                ? "1 Reply"
                :  replyIds.length || 0 + " Replies"
            }
            </span>
        </button>   
    )
}

export default RepliesComponent