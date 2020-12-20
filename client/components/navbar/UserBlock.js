import React from "react"
import { Link } from "react-router-dom";

const UserBlock = 
    ({ username, tryLogoutUser, show }) => {
    if (!show) {
        return null
    }
    
    return (
        <div className="user-block">
            <h4>{ username }</h4>
            <ul>
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