import React from "react"
import { Link } from "react-router-dom";

import Triangle from '../svgs/Triangle'

const UserBlock = 
    ({ username, tryLogoutUser, show, changeBlur }) => {
    if (!show) {
        return null
    }
    
    return (
        <div className="user-block">
            <Triangle />
            <h4>{ username }</h4>
            <ul onMouseDown = {() => { changeBlur(false) }}>
                <Link className = "user-block-create-post" 
                to = "/create/post">
                    <li>
                        Create Post
                    </li>
                </Link>
                <Link to = "/profile">
                    <li>
                        Profile
                    </li>
                </Link>
                <li onClick = { tryLogoutUser }>
                    Log out
                </li>
            </ul>
        </div>
    )
}

export default UserBlock