import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import UserPostPreview from './UserPostPreview'

import { showError } from '../../store/globalActions'
import { getUserPostsServer } from '../../api'

const UserPostsView = ({ match, dispatchToStore }) => {
    const [posts, setPosts] = useState([])

    const { userId, pageNum } = match.params
    useEffect(() => {
        getUserPostsServer(userId, pageNum).then(resp => {
            if (resp.error) {
                dispatchToStore(showError(resp.errorMsg))
                console.error(resp.errorMsg)
                return
            }

            setPosts(resp.userPosts)
        })
    }, [userId, pageNum])

    return (
        <div className = "user-posts-container">
            {
                posts.map((post, i) => (
                    <UserPostPreview key = { i } post = { post } />
                )).reverse()
            }
            <div className = "buttons-container">
                <button>&lt;</button>
                <div>{ pageNum }</div>
                <button>&gt;</button>
            </div>
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
