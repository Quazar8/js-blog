import React, { useState } from 'react'

import UserBlock from './UserBlock'

const UserLink = 
    ({ username, profilePic, tryLogoutUser }) => {

    const [showBlock, setShowBlock] = useState({
        show: false,
        blur: true
    })
    
    const toggleBlock = () => {
        setShowBlock({ show: !showBlock.show, blur: true})
    }

    const hideBlock = () => {
        if (!showBlock.blur) {
            setShowBlock({...showBlock, blur: true})
            return
        }
        
        setShowBlock({ show: false, blur: true})
    }

    const changeBlur = (bin) => {
        setShowBlock({ ...showBlock, blur: bin})
    }

    return (
        <div
        tabIndex = "2"
        onBlur = { hideBlock }
        className = "user-link-container">
            <div onMouseDown = { toggleBlock } className = "user-nav-link">
                <div className = "image-container">
                    <img src= { profilePic } alt="user picture" />
                </div>
            </div>
                <UserBlock
                    changeBlur = { changeBlur }
                    tryLogoutUser = { tryLogoutUser }
                    username = { username }
                    show = { showBlock.show }
                />
        </div>
    )
}

export default UserLink