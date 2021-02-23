import React from 'react'

import CommentsContainer from './CommentsContainer'

const RepliesComponent = ({ dispatchError, dispatchSuccess,
        repliesCount, replies, username, updateCommentSection,
        displayReplies, hideReplySection }) => {

    if (repliesCount === 0) {
        return null
    }

    if (replies.length === 0) { 
          return (
            <button onClick = { displayReplies } className = "show-replies-button">
                <span>
                {
                    repliesCount === 1
                    ? "1 Reply"
                    :  (repliesCount || 0) + " Replies"
                }
                </span>
            </button>
          )
    }

    return (
        <section className = "replies-section">
            <CommentsContainer 
                comments = { replies }
                username = { username }
                updateCommentSection = { updateCommentSection }
                dispatchError = { dispatchError }
                dispatchSuccess = { dispatchSuccess }
                commentAppendClass = " comment-reply"
            />
            <button onClick = { hideReplySection }>Hide Replies</button>
        </section>
    )
}

export default RepliesComponent