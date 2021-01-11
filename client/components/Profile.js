import React, { useState, useEffect } from 'react'
import { getUserProfileServer } from '../api'

import PostSnippet from './user/PostSnippet'

const Profile = ({ match }) => {
    const [user, setUser] = useState({
        username: '',
        profilePic: '',
        totalPosts: 0,
        posts: []
    })

    useEffect(() => {
        const userId = match.params.id
        getUserProfileServer(userId).then(resp => {
            if (resp.error) {
                return
            }

            setUser(resp.user)
        })
    }, [])

    const { profilePic, username, totalPosts, posts } = user
    return (
        <section className = "profile-page">
            <div className = "image-container">
                <img src = { profilePic } alt = "profile picture" />
            </div>
            <h2>{ username }</h2>
            <h3>Author of { totalPosts } articles.</h3>
            <div>
            {
                posts.map((p, i) => (
                    <PostSnippet post = { p }/>
                ))
                    .reverse()
            }
            </div>
        </section>
    )
}

export default Profile