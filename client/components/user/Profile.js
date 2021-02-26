import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserProfileServer } from '../../api'
import { showError } from '../../store/globalActions'

import PostSnippet from './PostSnippet'

const ProfileView = ({ currentUser, match, dispatchToServer }) => {
    const [user, setUser] = useState({
        username: '',
        profilePic: '',
        totalPosts: 0,
        posts: []
    })

    const profilePicRef = useRef()

    const userId = match.params.id
    useEffect(() => {
        getUserProfileServer(userId).then(resp => {
            if (resp.error) {
                dispatchToServer(showError(resp.errorMsg))
                return
            }

            setUser(resp.user)
        })
    }, [userId])

    const handleDragOver = (e) => {
        e.preventDefault()
    }

    const handlePicInput = (e) => {
        const file = e.target.files[0]

        profilePicRef.current.src = URL.createObjectURL(file)
    }

    const clearUrlObject = () => {
        URL.revokeObjectURL(profilePicRef.current.src)
    }

    const { profilePic, username, totalPosts, posts } = user
    return (
        <section className = "profile-page">
            <div className = "left-section">
                <div className = "profile-pic-section">
                    {
                        currentUser === username
                        ? <label
                                onDragOver = { handleDragOver } 
                                className = "image-container"
                        >
                            <img
                                ref = { profilePicRef }
                                onLoad = { clearUrlObject }
                                src = { profilePic } alt = "profile picture" />
                            <input onChange = { handlePicInput } id = "profile-pic-input" type = "file" />
                        </label>
                        : <div className = "image-container">
                            <img src = { profilePic } alt = "profile picture" />
                          </div>
                    }
                </div>
                <h2>{ username }</h2>
                <h3>Author of <span>{ totalPosts }</span> articles.</h3>
            </div>
            <div className = "right-section">
            <div className = "see-all-container">
                <Link className = "see-all-link" to = {`/profile/${userId}/posts/1`}>
                    See all
                </Link>
            </div>
            {
                posts.length
                ? posts.map((p, i) => (
                    <PostSnippet key = { i } post = { p } />
                )).reverse()
                : <h2 className = "no-posts">User hasn't created any articles yet</h2>
            }
            </div>
        </section>
    )
}

const mapState = store => ({
    currentUser: store.user.user.username
})

const mapDispatch = dispatch => {
    return {
        dispatchToServer: action => {
            dispatch(action)
        }
    }
}

const Profile = connect(mapState, mapDispatch)(ProfileView)

export default Profile