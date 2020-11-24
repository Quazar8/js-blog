import React from 'react'
import { connect } from 'react-redux'

const Success = ( { msg, appendClass }) => {
    return (
        <div className = { "success-notification " + appendClass }>
            <div className = "message">
                { msg }
            </div>
            <div className = "mark">
                &#10004;
            </div>
        </div>
    )
}

const Error = ( { msg, appendClass }) => {
    return (
        <div className = {"error-notification " + appendClass}>
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
                ? successes.map( (msg, i) => (
                    <Success key = { Math.random() } msg = { msg } 
                    appendClass = { i === successes.length - 1
                                    ? "appear"
                                    : "moveDown" }
                    />
                )).reverse()
                : null 
            }
            {
                errors.length > 0
                ? errors.map((err, i) => (
                    <Error key = { Math.random() } msg = { err } 
                    appendClass = { i === errors.length - 1 
                                    ? "appear" 
                                    : "moveDown" }
                    />
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