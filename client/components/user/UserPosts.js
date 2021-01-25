import React, { useEffect } from 'react'
import { getUserPostsServer } from '../../api'

const UserPosts = ({ match }) => {
    useEffect(() => {
        const { userId, pageNum } = match.params
        getUserPostsServer(userId, pageNum).then(resp => {
            console.log(resp)
        })
    }, [])

    return (
        <div>
            This is the user post component
        </div>
    )
}

export default UserPosts
