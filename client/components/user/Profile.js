import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserProfileServer, changeProfilePicServer } from '../../api'
import { showError, showSuccess } from '../../store/globalActions'
import { getLoggedUser } from '../../store/userActions'

import PostSnippet from './PostSnippet'

const ProfileView = ({ currentUser, match, dispatchToStore,
        updateUserInfo }) => {
    const [user, setUser] = useState({
        username: '',
        profilePic: '',
        totalPosts: 0,
        posts: []
    })

    const [showChangeButton, setShowChangeButton] = useState(false)
    const [labelClass, setLabelClass] = useState('')

    const profilePicRef = useRef()
    const profilePicFile = useRef()

    const userId = match.params.id
    useEffect(() => {
        getUserProfileServer(userId).then(resp => {
            if (resp.error) {
                dispatchToStore(showError(resp.errorMsg))
                return
            }

            setUser(resp.user)
        })
    }, [userId])

    const handleDragOver = (e) => {
        e.preventDefault()
        setLabelClass(' dragged-over')
    }

    const revertLabelClass = () => {
        setLabelClass(' ')
    }

    const handlePicInput = (e) => {
        e.preventDefault()

        let file
        if (e.dataTransfer) {
            file = e.dataTransfer.files[0]
        } else {
            file = e.target.files[0]
        }

        if (!file) {
            return
        }

        profilePicRef.current.src = URL.createObjectURL(file)
        profilePicFile.current = file
        setShowChangeButton(true)
        setLabelClass('')
    }

    const sendNewProfilePic = () => {
        if (!profilePicFile.current) {
            return
        }

        const data = {
            profilePic: profilePicFile.current
        }

        changeProfilePicServer(userId, data).then(resp => {
            if (resp.error) {
                dispatchToStore(showError(resp.errorMsg))
                return
            }

            updateUserInfo()
            dispatchToStore(showSuccess('Profile pic changed'))
            setShowChangeButton(false)
        })
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
                                onDragLeave = { revertLabelClass }
                                onDragOver = { handleDragOver }
                                onDrop = { handlePicInput }
                                className = { "image-container" + labelClass }
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
                    {
                        showChangeButton
                        ? <button 
                            onClick = { sendNewProfilePic }
                            className = "change-button"
                        >
                            Change?
                        </button>
                        : null
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
        dispatchToStore: action => {
            dispatch(action)
        },

        updateUserInfo: () => {
            dispatch(getLoggedUser())
        }
    }
}

const Profile = connect(mapState, mapDispatch)(ProfileView)

export default Profile