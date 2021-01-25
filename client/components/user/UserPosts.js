import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import UserPostPreview from './UserPostPreview'
import { getUserPostsServer } from '../../api'

const UserPostsView = ({ match, dispatchToStore }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const { userId, pageNum } = match.params
        getUserPostsServer(userId, pageNum).then(resp => {
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

const mapDispatch = dispatch => {
    return {
        dispatchToStore: (action) => {
            dispatch(action)
        }
    }
}

const UserPosts = connect(null, mapDispatch)(UserPostsView)

export default UserPosts
