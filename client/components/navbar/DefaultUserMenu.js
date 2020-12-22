import React from 'react'
import { Link } from "react-router-dom";

const DefaultUserMenu = () => {
    return (
        <div className = "default-user-menu-container">
            <div className = "default-user-menu">
                <svg viewBox = "0 0 50 50">
                    <path d = {
                        `M 10 45
                        c0,0 0,-20 15,-20
                        M 40 45
                        c0,0 0,-20 -15,-20` 
                    }/>
                    <polygon points = "11,44 25,26 39,44"/>
                    <circle cx="25" cy="13" r="7"/>
                </svg>
                <ul>
                    <Link to = "/login">
                        <li>Login</li>
                    </Link>
                    <Link to = "/register">
                        <li>Register</li>
                    </Link>
                </ul>
            </div>
        </div>
    )
}

export default DefaultUserMenu
