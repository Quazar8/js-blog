import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import UserPostPreview from './UserPostPreview'

import { showError } from '../../store/globalActions'
import { getUserPostsServer } from '../../api'

const UserPostsView = ({ match, dispatchToStore }) => {
    const [posts, setPosts] = useState([])
    const [totalPages, setTotalPage] = useState(0)

    const retrieveNSetPosts = (userId, pageNum) => {
        getUserPostsServer(userId, pageNum).then(resp => {
            if (resp.error) {
                dispatchToStore(showError(resp.errorMsg))
                console.error(resp.errorMsg)
                return
            }

            setPosts(resp.userPosts)
            setTotalPage(resp.totalPages)
        })
    }

    const { userId, pageNum } = match.params
    useEffect(() => {
        retrieveNSetPosts(userId, pageNum)
    }, [userId, pageNum])
    
    const incPage = (by) => {
        return parseInt(pageNum) + by
    }
    
    return (
        <div className = "user-posts-container">
            {
                posts.map((post, i) => (
                    <UserPostPreview key = { i } post = { post } />
                )).reverse()
            }
            <div className = "buttons-container">
                {   incPage(-1) > 0
                    ? <Link to = { `/profile/${userId}/posts/${incPage(-1)}` }
                        className = "page-link">
                            &lt;
                      </Link>
                    : <div className = "page-link"></div>
                }
                <div className = "page-num">{ pageNum }</div>
                {   incPage(1) <= totalPages
                    ? <Link to = { `/profile/${userId}/posts/${incPage(1)}` }
                        className = "page-link">
                            &gt;
                      </Link>
                    : <div className = "page-link"></div>
                }
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
