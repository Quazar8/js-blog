import React from "react"
import { Link } from "react-router-dom";

const UserBlock = 
    ({ username, tryLogoutUser, show, changeBlur }) => {
    if (!show) {
        return null
    }
    
    return (
        <div className="user-block">
            <svg className = "triangle" viewBox = "0 0 50 50">
                <polygon className = "outer-triangle" points = "25,10 0,40 50,40" />
                <polygon className = "inner-triangle" points = "25,13 3,40 48,40" />
            </svg>
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