import React from 'react'
import { Link } from 'react-router-dom'

const DefaultNavLinks = () => {
    return (
        <div className="links-container">
            <Link className="nav-links" to="/login">Login</Link>
            <Link className="nav-links" to="/register">Register</Link>
        </div>
    )
}

export default DefaultNavLinks