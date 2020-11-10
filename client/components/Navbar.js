import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <nav className="main-navbar">
            <div className="logo-holder">
                <Link to="/">Logo</Link>
            </div>
            <div className="links-container">
                <Link className="nav-links" to="/login">Login</Link>
                <Link className="nav-links" to="/register">Register</Link>
            </div>
        </nav>
    )
}

export default Navbar