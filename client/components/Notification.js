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

const NotificationView = ({errors, successes}) => {
    
    return (
        <section className = "notification-container">
            {   
                successes.length > 0 
                ? successes.map( msg => (
                    <Success msg = { msg } />
                ))
                : null 
            }
            {
                errors.length > 0
                ? errors.map( err => (
                     <Error msg = { err }/>
                )).reverse()
                : null
            }
        </section>
    )
}

const mapState = state => {
    return {
        errors: state.global.errors,
        successes: state.global.successes
    }
}

const Notification = connect(mapState)(NotificationView)

export default Notification