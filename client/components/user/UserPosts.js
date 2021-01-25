import React, { useEffect, useState } from 'react'
import UserPostPreview from './UserPostPreview'
import { getUserPostsServer } from '../../api'

const UserPosts = ({ match }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const { userId, pageNum } = match.params
        getUserPostsServer(userId, pageNum).then(resp => {
            console.log(resp)
            if (resp.error) {
                console.error(resp.errorMsg)
                return
            }

            setPosts(resp.userPosts)
        })
    }, [])

    return (
        <div className = "user-posts-container">
            {
                posts.map((post, i) => (
                    <UserPostPreview key = { i } post = { post } />
                )).reverse()
            }
        </div>
    )
}

export default UserPosts
