import React, { useState, useEffect } from 'react'
import { getUserProfileServer } from '../api'


const Profile = ({ match }) => {
    const [user, setUser] = useState({
        username: '',
        profilePic: ''
    })

    useEffect(() => {
        const userId = match.params.id
        getUserProfileServer(userId).then(resp => {
            if (resp.error) {
                console.log(resp.errorMsg)
                return
            }

            setUser(resp.user)
        })
    }, [])

    const { profilePic, username } = user
    return (
        <section className = "profile-page">
            <div className = "image-container">
                <img src = { profilePic } alt = "profile picture" />
            </div>
            <h2>{ username }</h2>
        </section>
    )
}

export default Profile