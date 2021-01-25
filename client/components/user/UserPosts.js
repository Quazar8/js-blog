import React, { useEffect, useState } from 'react'
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
                posts.map((post, i) => {
                    return <h3 key = { i }>{ post.title }</h3>
                }).reverse()
            }
        </div>
    )
}

export default UserPosts
