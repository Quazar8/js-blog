import React from 'react'
import { connect } from "react-redux";

import NotFound from './NotFound'

const PrivateRouteView = ({ online, Child }) => {
    if (!online) {
        return <NotFound />
    }

    return (
        <Child />
    )
}

const mapState = (state, { child }) => {
    return {
        Child: child,
        online: state.user.online
    }
}

const PrivateRoute = connect(mapState)(PrivateRouteView)

export default PrivateRoute