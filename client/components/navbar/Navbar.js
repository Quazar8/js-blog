import React from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

import DefaultNavLinks from './DefaultNavLinks'
import LoggedNavLinks from './LoggedNavLinks'
import Logo from '../svgs/Logo'

import { logoutUser } from '../../store/userActions'

const NavbarView = 
        ({ user, online, tryLogoutUser }) => {

    const { username, profilePic } = user

    const history = useHistory()
    const homeRedirect = () => {
        history.push('/')
    }

    return (
        <nav className="main-navbar">
            <div className="logo-container"
            onClick = { homeRedirect }>
                <Logo />
                <h1>{ "<Blog />" }</h1>
            </div>
            {   
                online
                ? <LoggedNavLinks
                    username = { username }
                    profilePic = { profilePic }
                    tryLogoutUser = { tryLogoutUser }
                   />
                : <DefaultNavLinks />
           }
        </nav>
    )
}

const mapState = state => {
    return {
        user: state.user.user,
        online: state.user.online
    }
}

const mapDispatch = dispatch => {
    return {
        tryLogoutUser: () => {
            dispatch(logoutUser())
        }
    }
}

const Navbar = connect(mapState, mapDispatch)(NavbarView)

export default Navbar