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

const NotificationView = ({errorMsg, successMsg}) => {
    return (
        <section className = "notification-container">
            {
                true ? <Success msg = { "hi" } /> : null
            }
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