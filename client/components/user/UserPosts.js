import React, { useEffect } from 'react'
import { getUserPostsServer } from '../../api'

const UserPosts = () => {
    useEffect(() => {
        const userId = 'nick2'
        const page = 1
        getUserPostsServer(userId, page).then(resp => {
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
