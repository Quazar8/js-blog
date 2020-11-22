import React from 'react'
import { connect } from 'react-redux'

const Success = ( { msg }) => {
    return (
        <div className = "success-notification">
            <div className = "message">
                { msg }
            </div>
            <div className = "mark">
                &#10004;
            </div>
        </div>
    )
}

const Error = ( { msg }) => {
    return (
        <div className = "error-notification">
            <div className = "message">
                { msg }
            </div>
            <div className = "mark">
                X
            </div>
        </div>
    )
}

const NotificationView = ({errorMsg, successMsg}) => {
    return (
        <section className = "notification-container">
            <Success msg = { "Success" } /> 
            <Error msg = { "Error" } /> 
        </section>
    )
}

const mapState = state => {
    return {
        errorMsg: state.global.error,
        successMsg: state.global.success
    }
}

const Notification = connect(mapState)(NotificationView)

export default Notification