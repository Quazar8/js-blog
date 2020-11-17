import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

const NavbarView = ({ username, online }) => {
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

const mapState = (state) => {
    return {
        username: state.user.username,
        online: state.user.online
    }
}

const Navbar = connect(mapState)(NavbarView)

export default Navbar