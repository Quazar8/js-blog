import React, { useState } from 'react'

import { getPostCommentsServer } from '../../api'
import CommentsContainer from './CommentsContainer'

const RepliesComponent = ({ dispatchError, dispatchSuccess,
        replyIds = [], commentId, username, updateCommentSection }) => {
    const [replies, setReplies] = useState([])
    if (replyIds.length === 0) {
        return null
    }

    const displayReplies = () => {
        getPostCommentsServer(commentId).then(resp => {
            if (resp.error) {
                dispatchError(resp.errorMsg)
                return
            }

            setReplies(resp.comments)
        })
    }

    if (replies.length === 0) { 
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