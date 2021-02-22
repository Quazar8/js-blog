import React from 'react'

import CommentsContainer from './CommentsContainer'

const RepliesComponent = ({ dispatchError, dispatchSuccess,
        replyIds = [], replies, username, updateCommentSection, displayReplies }) => {
    if (replyIds.length === 0 && replies.length === 0) {
        return null
    }

    if (replies.length === 0) { 
          return (
            <button onClick = { displayReplies } className = "show-replies-button">
                <span>
                {
                    replyIds.length === 1
                    ? "1 Reply"
                    :  (replyIds.length || 0) + " Replies"
                }
                </span>
            </button>
          )
    }

    return (
        <CommentsContainer 
            comments = { replies }
            username = { username }
            updateCommentSection = { updateCommentSection }
            dispatchError = { dispatchError }
            dispatchSuccess = { dispatchSuccess }
            commentAppendClass = " comment-reply"
        />
    )
}

export default RepliesComponent