import React from 'react'

const Triangle = () => {
    return (
        <svg className = "triangle" viewBox = "0 0 50 50">
            <polygon className = "outer-triangle" points = "25,10 0,40 50,40" />
            <polygon className = "inner-triangle" points = "25,13 3,40 48,40" />
        </svg>
    )
}

export default Triangle